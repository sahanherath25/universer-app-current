import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView, Platform, FlatList, Image, ActivityIndicator
} from 'react-native';
import {Ionicons} from "@expo/vector-icons"
import SettingsScreen from "./SettingsScreen";
// import SafeAreaView from 'react-native-safe-area-view';
import {Feather} from '@expo/vector-icons';

import colors from "../constants/colors";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useSelector} from "react-redux";
import PageContainer from "../components/PageContainer";
import Bubble from "../components/Bubble";
import {createChat, sendImage, sendTextMessage} from "../utils/actions/chatActions";
import ReplyTo from "../components/ReplyTo";
import {launchImagePicker, openCamera, uploadImageAsync} from "../utils/launchImagePicker";
import AwesomeAlert from "react-native-awesome-alerts";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";


const ChatScreen = (props) => {

    //Contain the LoggedIn userData
    const userData = useSelector(state => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);
    console.log("STORED USERS", storedUsers)
    const storedChats = useSelector(state => state.chats.chatsData);
    console.log("STORED CHATS", storedUsers)
    //TODO STATE VARIABLES

    const [chatUsers, setChatUsers] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [chatId, setChatId] = useState(props.route?.params?.chatId);
    //generating  banner Error
    const [errorBannerText, setErrorBannerText] = useState("")
    const [replyingTo, setReplyingTo] = useState();
    const [tempImageUrl, setTempImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const flatList = useRef();


    // console.log("CHAT USERS ", chatUsers)

    // const storedUsers=useSelector(state=>state.users.storedUsers);
    // console.log("StoredUsers",storedUsers)


    const chatMessages = useSelector(state => {

        if (!chatId) {
            return []
        }


        // console.log("58 CHAT ID CREATED ", chatId)
        const chatMessagesData = state.messages.messagesData[chatId];

        if (!chatMessagesData) {
            //    IF there is chatMessages Data
            return []
        }

        const messagesList = [];
        for (const key in chatMessagesData) {

            const message = chatMessagesData[key];

            // message.key=key;
            messagesList.push({
                key,
                ...message,
            });
        }

        return messagesList;

    });

    // console.log(" MESSAGES  List", chatMessages);


    // const chatData=props.route?.params?.newChatData;
    const chatData = (chatId && storedChats[chatId]) || props.route?.params?.newChatData || {};
    // console.log("Chat Data ", chatData);
    // console.log("Chat ID ", chatId);
    // console.log("Stored Chats ", storedChats[chatId])


    const getChatTitleFromName = () => {

        //  TODO  Here we need to get the Other Users Name from the (User ID) user that we clicked
        const otherUserId = chatUsers.find(uid => uid !== userData.userId)

        // console.log(otherUserId);
        const otherUserData = storedUsers[otherUserId];

        // console.log("Other User ", otherUserData)
        return otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`;
    }


    // console.log(" CHTA DATA HAS A CHAT NAME ", chatData.chatName);

    // console.log(" TITLE VALUE IS ", title);


    useEffect(() => {

        if(!chatData){
            return
        }
        //here setting the Navigation Props
        props.navigation.setOptions(
            {
                headerTitle: chatData.chatName ?? getChatTitleFromName(),
                headerRight: () => {
                    return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        {/* TODO Settings Button Configuration */}
                        {
                            chatId &&
                            <Item
                                title={"Chat Settings"}
                                iconName={"settings-outline"}
                                color={colors.textColor}
                                onPress={() => chatData.isGroupChat ?
                                    //If GroupChat on press settings will redirect to Groupt Settings
                                    props.navigation.navigate("SettingsScreen", {chatId}) :
                                    //If Not  GroupChat on press settings will redirect to User's Contact
                                    props.navigation.navigate("Contact", {uid: chatUsers.find(uid => uid !== userData.userId)})
                                }

                            />
                        }
                    </HeaderButtons>
                }


            }
        )
        setChatUsers(chatData.users)

    }, [chatUsers])

    // console.log(chatData);

    const sendMessage = useCallback(async () => {

        // console.log("1st MESSAGE ")
        // console.log("CALLING SEND MESSAGE ()")
        try {
            // throw  new Error(" ERROR WHEN SENDING")
            //Here id will be the id that passed into the chat
            let id = chatId;
            // If it's 1st time it doesn't have id

            if (!id) {
                //    No chat id Create Id
                console.log("1st Time NO ID")
                console.log("NEW CHAT DATA", props.route.params.newChatData)
                id = await createChat(userData.userId, props.route.params.newChatData)
                console.log("Chat Id Created", id)
                setChatId(id)

            }
            // await sendTextMessage(id, userData.userId, messageText, replyingTo && replyingTo.key);
            await sendTextMessage(id, userData, messageText, replyingTo && replyingTo.key,chatUsers);
            // await sendTextMessage(id, userData.userId, messageText);
            setMessageText("");
            setReplyingTo(null);

        } catch (error) {
            console.log("Error in Sending", error.toString())

            setErrorBannerText("Sending Failed");

            setTimeout(() => {
                setErrorBannerText("")
            }, 5000);

        }
        alert("Message is Being Sent")

    }, [messageText, chatId])

    // console.log(messageText)

    //Sending Images
    const pickImage = useCallback(async () => {

        try {
            const tempUrl = await launchImagePicker();

            if (!tempUrl) {
                return
            } else {
                setTempImageUrl(tempUrl);
            }

        } catch (error) {
            console.log(error.toString())

        }
    }, [tempImageUrl])

    const takePhoto = useCallback(async () => {

        try {
            const tempUrl = await openCamera();

            if (!tempUrl) {
                return
            } else {
                setTempImageUrl(tempUrl);
            }

        } catch (error) {
            console.log(error.toString())

        }
    }, [tempImageUrl])

    const uploadImage = useCallback(async () => {

        setIsLoading(true);

        try {
            //Here id will be the id that passed into the chat
            let id = chatId;
            // If it's 1st time it doesn't have id
            if (!id) {
                //    No chat id Create Id
                id = await createChat(userData.userId, props.route.params.newChatData)

                setChatId(id)

            }


            //    Uploading Image
            const uploadUrl = await uploadImageAsync(tempImageUrl, true);
            setIsLoading(false);

            // send Image
            await sendImage(id, userData.userId, uploadUrl, replyingTo && replyingTo.key);
            setReplyingTo(null)

            setTimeout(() => {
                setTempImageUrl("")
            }, 500)


        } catch (error) {
            console.log(error.toString())
            setIsLoading(false);
        }

    }, [isLoading, tempImageUrl, chatId])


    return (
        <SafeAreaView edges={["right", "left", "bottom"]} style={styles.container}>

            <KeyboardAvoidingView
                style={styles.screen}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={100}
            >


                <ImageBackground source={require("../assets/images/chatWallpaper.jpg")} style={styles.backgroundImage}
                                 resizeMode={"cover"}>

                    <PageContainer style={{backgroundColor: "transparent"}}>

                        {
                            !chatId && <Bubble text={"This is a New Chat Say Hi"} type={"system"}/>
                        }

                        {
                            errorBannerText !== "" && <Bubble text={errorBannerText} type={'error'}/>
                        }

                        {
                            chatId &&

                            <FlatList
                                ref={(ref) => flatList.current = ref}
                                /*TODO ERROR CAUSING*/
                                // onContentSizeChange={()=>flatList.current.scrollToEnd({animated:false})}
                                // onLayout={()=>flatList.current.scrollToEnd({animated:false})}
                                data={chatMessages}
                                renderItem={(itemData) => {

                                    const message = itemData.item

                                    //IF this is our message
                                    const isOwnMessage = message.sentBy === userData.userId;


                                    // const messageType = isOwnMessage ? "myMessage" : "userMessage";
                                    // {console.log("IMAGE URL SENDING",message.imageUrl)}

                                    let messageType;

                                    if (message.type && message.type === "info") {
                                        messageType = "info";
                                    } else if (isOwnMessage) {
                                        messageType = "myMessage";
                                    } else {
                                        messageType = "userMessage";
                                    }

                                    const sender = message.sentBy && storedUsers[message.sentBy];

                                    const name = sender && `${sender.firstName} ${sender.lastName}`
                                    return (


                                        <Bubble type={messageType}
                                                text={message.text}
                                                messageId={message.key}
                                                chatId={chatId}
                                                date={message.sendAt}
                                                name={!chatData.isGroupChat || isOwnMessage ? undefined : name}
                                                userId={userData.userId}
                                                setReply={() => setReplyingTo(message)}
                                                replyingTo={message.replyTo && chatMessages.find(i => i.key === message.replyTo)}
                                                imageUrl={message.imageUrl}
                                        />

                                    )

                                }}
                            />
                        }

                    </PageContainer>

                    {
                        replyingTo &&
                        <ReplyTo
                            text={replyingTo.text}
                            user={storedUsers[replyingTo.sentBy]}
                            onCancel={() => setReplyingTo(null)}

                        />
                    }

                </ImageBackground>

                <View style={styles.inputContainer}>

                    <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
                        <Feather name="plus" size={24} color={colors.blue}/>
                    </TouchableOpacity>

                    <TextInput style={styles.textBox}
                               onChangeText={(currentText) => setMessageText(currentText)}
                               value={messageText}

                    />

                    {/*TODO Checking if the meassage is empty or not*/}
                    {
                        messageText === "" &&
                        <TouchableOpacity style={styles.mediaButton} onPress={takePhoto}>
                            <Feather name="camera" size={24} color={colors.blue}/>
                        </TouchableOpacity>

                    }

                    {
                        messageText !== "" &&
                        <TouchableOpacity style={{...styles.mediaButton, ...styles.sendButton}}
                                          onPress={sendMessage}>
                            <Feather name="send" size={20} color={colors.white}/>
                        </TouchableOpacity>

                    }

                    <AwesomeAlert
                        show={tempImageUrl !== ""}
                        title={"Send Image"}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText={"Cancel"}
                        confirmText={"Send Image"}
                        confirmButtonColor={colors.primary}
                        cancelButtonColor={colors.red}
                        titleStyle={styles.popupTitleStyle}
                        onCancelPressed={() => setTempImageUrl("")}
                        onConfirmPressed={uploadImage}
                        onDismiss={() => setTempImageUrl("")}
                        customView={(
                            <View>
                                {
                                    isLoading && <ActivityIndicator size={"small"} color={colors.primary}/>
                                }
                                {!isLoading && tempImageUrl !== "" &&
                                    <Image source={{uri: tempImageUrl}} style={{width: 200, height: 200}}/>}
                            </View>
                        )}
                    />

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    screen: {
        flex: 1,

    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: "regular",
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "red"
    },
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "space-around",
        height: 50,
        backgroundColor: "#FFFFFF",
    },
    textBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: colors.lightGrey,
        marginHorizontal: 15,
        paddingHorizontal: 12,
    },
    mediaButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        // backgroundColor:"red",
        // borderColor:"black",
        // borderWidth:2,
        // borderStyle:"solid",
    },
    sendButton: {
        backgroundColor: colors.blue,
        borderRadius: 50,
        padding: 8,
        width: 35,
    },
    popupTitleStyle: {

        fontFamily: "medium",
        letterSpacing: 0.3,
        color: colors.textColor,
    }

})

export default ChatScreen;