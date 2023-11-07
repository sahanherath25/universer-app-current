import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import PageContainer from "../components/PageContainer";
import ProfileImage from "../components/ProfileImage";
import PageTitle from "../components/PageTitle";
import colors from "../constants/colors";
// import {getUserChats} from "../utils/actions/userActions";
import DataItem from "../components/DataItem";
import {getUserChats} from "../utils/actions/userActions";
import SubmitButton from "../components/SubmitButton";
import {removeUserFromChat} from "../utils/actions/chatActions";

const ContactScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    //Getting all the users
    const storedUsers = useSelector(state => state.users.storedUsers);
    const userData = useSelector(state => state.auth.userData);
    // console.log("STORED USERS IN CONTACT ",storedUsers)

    const currentUser = storedUsers[props.route.params.uid];
    // console.log("Current user  ",currentUser.firstName)

    const storedChats = useSelector(state => state.chats.chatsData);
    const [commonChats, setCommonChats] = useState([]);

    const chatId = props.route.params.chatId;
    const chatData = chatId && storedChats[chatId];


    console.log("COMMON CHATS", commonChats)
    useEffect(() => {

        const getCommonUserChats = async () => {

            const currentUserChats = await getUserChats(currentUser.userId);

            console.log("CURRENT UER CHATS", currentUserChats)

            setCommonChats(
                Object.values(currentUserChats).filter(cid => storedChats[cid] && storedChats[cid].isGroupChat)
            )
        }

        getCommonUserChats();

        console.log("COMMON CHATS", commonChats)
    }, [])

    const removeFromChat = useCallback(async () => {

        try {
            setIsLoading(true)
            //    Remove User
            await removeUserFromChat(userData, currentUser, chatData);
            props.navigation.goBack();
        } catch (e) {
            console.log("ERROR ", e.toString())
        } finally {
            setIsLoading(false)
        }
    }, [props.navigation, isLoading])


    return (
        <PageContainer>


            <View style={styles.topContainer}>
                <ProfileImage uri={currentUser.profilePicture} size={100} style={{marginBottom: 0}}/>

                <PageTitle text={`${currentUser.firstName}  ${currentUser.lastName}`}/>

                {
                    currentUser.about &&
                    <Text style={styles.about} numberOfLines={2}>
                        {currentUser.about}
                    </Text>
                }

            </View>

            {
                commonChats.length > 0 &&
                <>
                    <Text>{commonChats.length} {commonChats.length === 1 ? "Group" : "Groups"} in Common</Text>

                    {
                        commonChats.map(cid => {

                            const chatData = storedChats[cid];
                            return <DataItem

                                key={cid}
                                title={chatData.chatName}
                                subTitle={chatData.latestMessageText}
                                type={"link"}
                                onPress={() => props.navigation.push("ChatScreen", {chatId: cid})}
                                image={chatData.chatImage}


                            />
                        })
                    }
                </>
            }

            {
                //Here we're checking if There is ChatData and Chat is Group Chat
                chatData && chatData.isGroupChat &&
                (
                    isLoading ?
                    <ActivityIndicator size={"small"} color={colors.primary}/> :
                    <SubmitButton
                        title={"Remove From Chat"}
                        color={colors.red}
                        onPress={removeFromChat}
                    />
                )
            }

        </PageContainer>
    )
}

const styles = StyleSheet.create(
    {
        topContainer: {
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
        },
        about: {
            fontFamily: "montserratRegular",
            fontSize: 16,
            letterSpacing: 0.3,
            color: colors.grey,
        },
        heading: {
            fontFamily: "montserratRegular",
            letterSpacing: 0.3,
            color: colors.textColor,
            marginVertical: 8,
        }
    }
)

export default ContactScreen;