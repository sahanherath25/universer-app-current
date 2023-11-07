import {getFirebaseApp} from "../firebaseHelper";
import {child, getDatabase, ref, push, update, get, set, remove} from "firebase/database";
import {Alert} from "react-native";
import {addUserChats, deleteUserChats, getUserChats} from "./userActions";
import {getUserPushTokens} from "./authActions";




export const createChat = async (loggedInUserId, chatData) => {

    const newChatData = {
        ...chatData,
        createdBy: loggedInUserId,
        updatedBy: loggedInUserId,
        createdAt: new Date().toISOString(), // Standard Format for Data String
        updatedDate: new Date().toISOString(),
    }

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app))

    const newChat = await push(child(dbRef, "chats"), newChatData)

    const chatUsers = newChatData.users;

    //  Iterating each Chat user
    for (let i = 0; i < chatUsers.length; i++) {

        const userId = chatUsers[i];
        await push(child(dbRef, `userChats/${userId}`), newChat.key);
    }
    return newChat.key;
}

export const sendTextMessage = async (chatId, senderData, messageText, replyTo,chatUsers) => {
    await sendMessage(chatId, senderData.userId, messageText, null, replyTo, null);

    // Filtering th array to find the users of the chat and exclude the sender
    //We don't need to send notification to ourselves
    const otherUsers=chatUsers.filter(uid=>uid!==senderData.userId)


    await sendPushNotificationForUsers(otherUsers,`${senderData.firstName} ${senderData.lastName} `,messageText)
}

export const sendInfoMessage = async (chatId, senderId, messageText) => {
    await sendMessage(chatId, senderId, messageText, null, null, "info");
}

export const sendImage = async (chatId, senderId, imageUrl, replyTo) => {
    await sendMessage(chatId, senderId, "Image", imageUrl, replyTo, null);
}


export const updateChatData = async (chatId, userId, chatData) => {

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    const chatRef = child(dbRef, `chats/${chatId}`)
    await update(chatRef, {
        ...chatData,
        updatedAt: new Date().toISOString(),
        updatedBy: userId,
    })
}

const sendMessage = async (chatId, senderId, messageText, imageUrl, replyTo, type) => {
// const sendTextMessage=async(chatId,senderId,messageText)=>{
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));

    const messagesRef = child(dbRef, `messages/${chatId}`);

    //TODO Creating message object with required Data
    const messageData = {
        sentBy: senderId,
        sendAt: new Date().toISOString(),
        text: messageText,
    }
    // if replyTo has a value add to attribute
    if (replyTo) {
        messageData.replyTo = replyTo;
    }

    if (imageUrl) {
        messageData.imageUrl = imageUrl;
    }

    if (type) {
        messageData.type = type;
    }
    //TODO 1-->Path to Push 2-->Data Needs to Push
    await push(messagesRef, messageData);

    const chatRef = child(dbRef, `chats/${chatId}`);
    await update(chatRef, {
        updatedBy: senderId,
        updatedtAt: new Date().toISOString(),
        latestMessageText: messageText,
    })

}

export const starMessage = async (messageId, chatId, userId) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));

        const childRef = child(dbRef, `userStarredMessages/${userId}/${chatId}/${messageId}`);

        const snapshot = await get(childRef);

        if (snapshot.exists()) {

            //    TODO Starred Item Exists
            // console.log("Unstarring")
            await remove(childRef)

        } else {
            //   TODO Starred Item Not  Exists
            // console.log("Starring")
            const starredMessageData = {
                messageId,
                chatId,
                starredAt: new Date().toISOString(),
            }

            await set(childRef, starredMessageData)

        }

    } catch (e) {
        console.log(e.toString())
    }


}

export const removeUserFromChat = async (userLoggedInData, userToRemoveData, chatData,) => {
//    userLoggedInData--> To know who removed the user

    const userToRemoveId = userToRemoveData.userId;

//    After removing the user getting current users of the chat
    const newUsers = chatData.users.filter(uid => uid !== userToRemoveId)

    await updateChatData(chatData.key, userLoggedInData.userId, {users: newUsers})

    const userChats = await getUserChats(userToRemoveId);

    for (const key in userChats) {
        const currentChatId = userChats[key];

        if (currentChatId === chatData.key) {
            await deleteUserChats(userToRemoveId, key)
            break;
        }
    }

    const messageText = userLoggedInData.userId === userToRemoveData.userId ?
        `${userLoggedInData.firstName} Left the Chat` :
        `${userLoggedInData.firstName} removed ${userToRemoveData.firstName} from the chat`

    await sendInfoMessage(chatData.key, userLoggedInData.userId, messageText)


}


export const addUsersToChat =async (userLoggedInData, userToAddData, chatData) => {

    const existingUsers = Object.values(chatData.users);
    const newUsers = [];

    let userAddedName = "";

    // userToAddData.forEach(async userToAdd => {
    //
    //     const userToAddId = userToAdd.userId;
    //
    //     if (existingUsers.includes(userToAddId)) {
    //         return
    //     }
    //
    //     newUsers.push(userToAddId)
    //     await addUserChats(userToAddId, chatData.key)
    //
    //     userAddedName = `${userToAdd.firstName} ${userToAdd.lastName}`
    //     // console.log("Usewr tO ADD IS ",userToAddId)
    // });

    for (const userToAdd of userToAddData) {
        const userToAddId = userToAdd.userId;

        if (existingUsers.includes(userToAddId)) {
          return
        }

        newUsers.push(userToAddId);
        await addUserChats(userToAddId, chatData.key);

        userAddedName = `${userToAdd.firstName} ${userToAdd.lastName}`;
    }


    if (newUsers.length === 0) {
        return
    }

    await updateChatData(chatData.key, userLoggedInData.userId, {users: existingUsers.concat(newUsers)})

    const moreUsersMessage=newUsers.length > 1 ? `and ${newUsers.length -1} others ` : "";

    const messageText = `${userLoggedInData.firstName} ${userLoggedInData.lastName} Added ${userAddedName} ${moreUsersMessage}to the chat`

    await sendInfoMessage(chatData.key,userLoggedInData.userId,messageText)


}


const sendPushNotificationForUsers = (chatUsers,title,body) => {

    chatUsers.forEach(async uid=>{
        //Retrieving Each Users Push Token
        const tokens=await getUserPushTokens(uid)

        for (const tokensKey in tokens) {
            const token=tokens[tokensKey];


            //Expo Endpoint to send notifications
            await fetch("https://exp.host/--/api/v2/push/send",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    to:token,
                    title,
                    body
                })

            })
        }

    })
}


