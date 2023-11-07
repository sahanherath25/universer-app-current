import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Ionicons} from "@expo/vector-icons"
import SettingsScreen from "./SettingsScreen";
import {NavigationContainer} from "@react-navigation/native";
import * as Font from "expo-font";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import {useSelector} from "react-redux";
import DataItem from "../components/DataItem";
import PageContainer from "../components/PageContainer";
import PageTitle from "../components/PageTitle";
import colors from "../constants/colors";


const ChatListScreen = (props) => {

    //Here ? means if there is only value we access it otherwise we don't access if it doesn't have a value
    const selectedUser = props.route?.params?.selectedUserId;
    const selectedUsersList = props.route?.params?.selectedUsers;

    const chatName = props.route?.params?.chatName;


    //Accessioning the state of loggedIn user Data
    const userData = useSelector((state) => state.auth.userData);

    // Alert.alert("USER ID Is ",userData.userId)

    const storedUsers = useSelector(state => state.users.storedUsers);
    // console.log("Stored Users -->", storedUsers)




    const userChats = useSelector((state) => {
        const chatsData = state.chats.chatsData;

        //Sorting th Chat Data Order
        return Object.values(chatsData).sort((a,b)=>{
            return new Date(b.updatedAt)-new Date(a.updatedAt)
        });
    })

    // console.log("USER CHATS =>", userChats)
    const [appIsLoaded, setAppIsLoaded] = useState(false);

    useEffect(() => {

        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title={"New Chat"}
                            iconName={"create-outline"}
                            onPress={() => {
                                return props.navigation.navigate("NewChat")
                            }}/>

                    </HeaderButtons>
                )
            }
        })
    }, [])

    useEffect(() => {

        if (!selectedUser && !selectedUsersList) {
            return
        }

        let chatData;

        let navigationProps;

        if(selectedUser){
            chatData=userChats.find(cid=> !cid.isGroupChat && cid.users.includes(selectedUser))
        }

        if(chatData){
            navigationProps = {
                chatId:chatData.key,
            }

        }else {

            const chatUsers =  selectedUsersList || [selectedUser]

            if(!chatUsers.includes(userData.userId)){
                chatUsers.push(userData.userId);
            }

            if(chatName){
                navigationProps = {

                    newChatData: {
                        users: chatUsers,
                        isGroupChat:selectedUsersList !== undefined,
                        chatName,
                    }
                }
            }else {
                navigationProps = {
                    newChatData: {
                        users: chatUsers,
                    }
                }
            }

        }



        console.log("NAVIGATION PROPS OBJ ",navigationProps)

        props.navigation.navigate("ChatScreen", navigationProps)

    }, [props.route?.params])


    useEffect(() => {

        const prepare = async () => {

            try {
                await Font.loadAsync({

                    "montg": require("../assets/fonts/Montserrat-Regular.ttf"),
                    "boldItalic": require("../assets/fonts/Roboto-BoldItalic.ttf"),
                    "monserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
                });
            } catch (error) {
                console.log.error();
            } finally {
                setAppIsLoaded(true);
            }
        };

        prepare();

    }, []);



    return (

        <PageContainer>

            <PageTitle text={"Chats"}/>

            <View>
                <TouchableOpacity  onPress={() => props.navigation.navigate("NewChat",{isGroupChat:true})} >
                    <Text style={styles.newGroupText} >
                        New Group
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={userChats} renderItem={(itemData) => {
                const chatData = itemData.item;
                const chatId=chatData.key;
                const isGroupChat=chatData.isGroupChat;


                let title = "";
                let image="";
                const subTitle = chatData.latestMessageText || "New Chat";

                // const otherUserId = chatData.users.find((uid) => uid !== userData.userId);
                // const otherUser = storedUsers[otherUserId];
                //
                //
                // if (!otherUser) {
                //     return
                // }
                //
                // let title = `${otherUser.firstName} ${otherUser.lastName} `;
                // let  image=otherUser.profilePicture;
                // const subTitle = chatData.latestMessageText || " New Chat";

                // console.log("IS GROUP CHAT ",isGroupChat)

                if(isGroupChat) {
                     title=chatData.chatName;
                     image=chatData.chatImage;
                    console.log("GRIUOP CHAT NAME ",title)
                }else {

                    const otherUserId = chatData.users.find((uid) => uid !== userData.userId);
                    const otherUser = storedUsers[otherUserId];

                    if (!otherUser) {
                        return
                    }
                     title = `${otherUser.firstName} ${otherUser.lastName} `;
                    console.log(" CHAT TITLE  NAME ",title)
                     image=otherUser.profilePicture;

                }

                // console.log(chatData);

                return(
                    <DataItem title={title}
                              subTitle={subTitle}
                              image={image}
                              onPress={()=>props.navigation.navigate("ChatScreen",{chatId})}

                    />

                )

            }
            }/>
        </PageContainer>

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: "montserratRegular"
    },
    newGroupText: {
        color:colors.blue,
        fontSize:17,
        marginBottom:5,
    }
})

export default ChatListScreen;