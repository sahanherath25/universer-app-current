import React, {useRef, useState} from "react";
import {useEffect} from "react"
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import PageContainer from "../components/PageContainer";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import {searchUsers} from "../utils/actions/userActions";
import DataItem from "../components/DataItem";
import {useDispatch, useSelector} from "react-redux";
import {setStoredUsers} from "../store/userSlice";
import ProfileImage from "../components/ProfileImage";
import {ref} from "firebase/storage";


const NewChatScreen = (props) => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [noResultsFound, setNoResultsFound] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [chatName, setChatName] = useState("");

    const [selectedUsers, setSelectedUsers] = useState([]);


    //Accessioning th state
    const userData = useSelector((state) => state.auth.userData);
    const storedUsers = useSelector(state => state.users.storedUsers);

    const selectedUsersFlatList = useRef([]);


    const chatId = props.route.params && props.route.params.chatId;

    const existingUsers = props.route.params && props.route.params.existingUsers;
    //route params is set? and then also look for the isGroupChat Prop
    const isGroupChat = props.route.params && props.route.params.isGroupChat;
    const isGroupChatDisabled = selectedUsers.length === 0 || (isNewChat && chatName === "")

    const isNewChat = !chatId;


    useEffect(() => {

        props.navigation.setOptions({
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Close"} onPress={() => props.navigation.goBack()}/>
                    </HeaderButtons>
                )
            },
            headerTitle: isGroupChat ? "Add Participants " : "New Chat",
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        {
                            isGroupChat &&
                            <Item

                                title={isNewChat ? "Create" : "Add"}
                                disabled={isGroupChatDisabled}
                                color={isGroupChatDisabled ? colors.lightGrey : undefined}
                                onPress={() => {

                                    const screenName = isNewChat ? "ChatList" : "SettingsScreen"

                                    props.navigation.navigate(screenName, {
                                        selectedUsers,
                                        chatName,
                                        chatId,
                                    })
                                }}
                            />
                        }
                    </HeaderButtons>
                )
            },


        })
    }, [chatName, selectedUsers])

    useEffect(() => {

        const delaySearch = setTimeout(async () => {
            if (!searchTerm || searchTerm === "") {
                setUsers();
                setNoResultsFound(false);
                return
            }

            setIsLoading(true)

            //Query Results From DB

            const usersResults = await searchUsers(searchTerm);
            // console.log("USER RESULT ", usersResults)

            delete usersResults[userData.userId]

            setUsers(usersResults)

            // setUsers({})
            // setNoResultsFound(true)

            if (Object.keys(usersResults).length === 0) {
                setNoResultsFound(true);

            } else {
                setNoResultsFound(false)

                dispatch(setStoredUsers({newUsers: usersResults}))
            }

            setIsLoading(false)

            // console.log("search term : ", searchTerm)
        }, 500)

        return () => clearTimeout(delaySearch)

    }, [searchTerm])

    const userPressed = (userId) => {

        if (isGroupChat) {
            const newSelectedUsers = selectedUsers.includes(userId) ?
                selectedUsers.filter((id) => id !== userId) :
                selectedUsers.concat(userId);

            setSelectedUsers(newSelectedUsers);

        } else {

            console.log("SINGLE USER CHANT ")
            props.navigation.navigate("ChatList", {selectedUserId: userId})
        }


    }


    return (
        <PageContainer>


            {
                isNewChat && isGroupChat &&
                <View style={styles.chatNameContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textBox}
                            placeholder={"Enter a Name For Your Group Chat"}
                            autoCorrect={false}
                            autoComplete={"off"}
                            value={chatName}
                            onChangeText={(text) => setChatName(text)}

                        />
                    </View>
                </View>
            }

            {isGroupChat &&

                <View style={styles.selectedUsersContainer}>
                    <FlatList data={selectedUsers}
                              style={styles.selectedUsersList}
                              horizontal={true}
                              keyExtractor={item => item}
                              contentContainerStyle={{alignItems: "center"}}
                        // ref={ref=>selectedUsersFlatList.current = ref}
                        // onContentSizeChange={()=>selectedUsersFlatList.current.scrollToEnd()}
                              renderItem={(itemData) => {

                                  const userId = itemData.item;
                                  const userData = storedUsers[userId];
                                  console.log("PROFILE PIC", userData.profilePicture)

                                  return <ProfileImage
                                      size={45}
                                      uri={userData.profilePicture}
                                      onPress={() => userPressed(userId)}
                                      showRemovedButton={true}
                                      style={styles.selectedUserStyle}

                                  />

                              }}
                    />
                </View>

            }
            {/*View For Selected Users*/}

            <View style={styles.searchContainer}>
                <FontAwesome name={"search"} size={24} color={"black"}/>
                <TextInput
                    placeholder={"Search"}
                    style={styles.searchBox}
                    onChangeText={(text) => {
                        setSearchTerm(text)
                    }}
                />
            </View>

            {
                !isLoading && !noResultsFound && users &&
                <FlatList
                    data={Object.keys(users)}
                    renderItem={(itemData) => {
                        const userId = itemData.item;
                        const userData = users[userId]

                        if (existingUsers && existingUsers.includes(userId)) {
                            return
                        }

                        return (
                            <DataItem
                                title={`${userData.firstName}  ${userData.lastName}`}
                                subTitle={`${userData.about}`}
                                image={userData.profilePicture}
                                onPress={() => userPressed(userId)}
                                type={isGroupChat ? "checkbox" : ""}
                                isChecked={selectedUsers.includes(userId)}
                            />
                        )
                    }
                    }/>
            }

            {
                isLoading &&
                <View style={commonStyles.center}>
                    <ActivityIndicator size={"large"} color={colors.primary}/>

                </View>
            }

            {/*/ TODO If there is no user and  No results Found */}
            {
                !isLoading && noResultsFound && (
                    <View style={commonStyles.center}>
                        <FontAwesome name="question" size={100} color={colors.lightGrey} style={styles.noResultsIcon}/>
                        <Text style={styles.noResultsText}>No User Found</Text>
                    </View>
                )
            }

            {/*/ TODO If there is no user and not Loading*/}
            {
                !isLoading && !users && (
                    <View style={commonStyles.center}>
                        <FontAwesome name="users" size={100} color={colors.lightGrey} style={styles.noResultsIcon}/>
                        <Text style={styles.noResultsText}>Enter a Name to Search For a User</Text>
                    </View>
                )
            }
        </PageContainer>
    )

}

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
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.extraLightGray,
        height: 40,
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5,
    },
    searchBox: {

        marginLeft: 8,
        fontSize: 15,
        width: "100%"
    },
    noResultsIcon: {
        marginBottom: 20,
    },
    noResultsText: {
        color: colors.textColor,
        fontFamily: "regular",
        letterSpacing: 0.3,
    },
    chatNameContainer: {
        paddingVertical: 10,
    },
    inputContainer: {

        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: colors.closeWhite,
        flexDirection: "row",
        borderRadius: 2,
    },
    textBox: {
        color: colors.textColor,
        width: "100%",
        fontFamily: "regular",
        letterSpacing: 0.3,
    },
    selectedUsersContainer: {
        height: 60,
        justifyContent: "center",

    },
    selectedUsersList: {
        height: "100%",
        paddingTop: 5,
    },
    selectedUserStyle: {
        marginRight: 5,
        marginBottom: 5,


    }

})

export default NewChatScreen;