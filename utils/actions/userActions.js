import {child, getDatabase, ref, get, query, orderByChild, startAt, endAt, remove, push} from "firebase/database";
import {getFirebaseApp} from "../firebaseHelper";

export const getUserData=async (userId)=>{

    try{
        const app=getFirebaseApp();
        const dbRef=ref(getDatabase(app));
        const userRef=child(dbRef,`users/${userId}`);

        const snapshot=await get(userRef)

    //  snapshot we use to fetch data from DB
    //      console.log("Snapshot Data")
    //      console.log("Snapshot Data",snapshot.val())

    //    RETURNING USERDATA
        return snapshot.val();

    }catch (error) {
        console.log("Error ",error.toString())
    }

}

export const getUserChats=async (userId)=>{

    try{
        const app=getFirebaseApp();
        const dbRef=ref(getDatabase(app));
        const userRef=child(dbRef,`userChats/${userId}`);

        const snapshot=await get(userRef)

        //  snapshot we use to fetch data from DB
        // console.log("Snapshot Data")
        // console.log("Snapshot Data",snapshot.val())

        //    RETURNING USERDATA
        return snapshot.val();

    }catch (error) {
        console.log("Error ",error.toString())
    }

}

export const searchUsers=async(queryText)=>{

    const searchTerm=queryText.toLowerCase()

    try {
        const app=getFirebaseApp();
        const dbRef=ref(getDatabase(app));
        const userRef=child(dbRef,"users")

        const queryRef=query(userRef,orderByChild("firstLast"),startAt(searchTerm),endAt(searchTerm+"\uf8ff"))

        const snapshot=await get(queryRef);

        if(snapshot.exists()){
            return snapshot.val();
        }

        return {};

    } catch (error) {

        console.log(error.errorCode)
        throw  error
    }

}

export const deleteUserChats=async (userId,key)=>{

    try{
        const app=getFirebaseApp();
        const dbRef=ref(getDatabase(app));
        const chatRef=child(dbRef,`userChats/${userId}/${key}`);

       await remove(chatRef);

    }catch (error) {
        console.log("Error ",error.toString())
        throw error;
    }

}

export const addUserChats=async (userId,chatId)=>{

    try{
        const app=getFirebaseApp();
        const dbRef=ref(getDatabase(app));
        const chatRef=child(dbRef,`userChats/${userId}`);

        await push(chatRef,userId);

    }catch (error) {
        console.log("Error ",error.toString())
        throw error;
    }

}

