import React, {useCallback, useEffect, useReducer, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import PageContainer from "../components/PageContainer";
import ProfileImage from "../components/ProfileImage";
import PageTitle from "../components/PageTitle";
import Input from "../components/Input";
import {reducer} from "../utils/reducers/formReducer";
import {validateInput} from "../utils/actions/FormActions";
import {updateSignedInUserData} from "../utils/actions/authActions";
import {updateLoggedInUserData} from "../store/authSlice";
import {validateLength} from "../utils/validationConstraints";
import {addUsersToChat, removeUserFromChat, updateChatData} from "../utils/actions/chatActions";
import colors from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import DataItem from "../components/DataItem";

const ChatSettingsScreen = (props) => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)


    const chatId=props.route.params.chatId;
    const chatData=useSelector(state=>state.chats.chatsData[chatId]) || {};
    const userData=useSelector(state=>state.auth.userData);

    const storedUsers=useSelector(state=>state.users.storedUsers);
    const starredMessages=useSelector(state=>state.messages.starredMessages[chatId] ?? {});

    console.log("CHATS DATA SETTINGS ",chatData)

    const initialState = {
        inputValues: {chatName:chatData.chatName},
        inputValidates: {chatName: undefined},
        formIsValid: false
    }


    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const selectedUsers=props.route.params &&  props.route.params.selectedUsers;



    useEffect(()=>{

        if(!selectedUsers){
            return
        }

        const selectedUserData=[];

        selectedUsers.forEach(uid=>{
            if(uid === userData.userId){
                return
            }
            if(!storedUsers[uid]){
                console.log("No user Data Found in User Data Store")
                return;
            }

            selectedUserData.push(storedUsers[uid])
        })
        addUsersToChat(userData,selectedUserData,chatData);
        console.log("Selected users Data",selectedUserData)

    },[selectedUsers])


    const inputChangeHandler = useCallback((inputId, inputValue) => {

        const result = validateInput(inputId, inputValue)
        dispatchFormState({inputId, validationResult: result, inputValue})

    }, [dispatchFormState])




    //Getting the user Data From
    const saveHandler = useCallback(async () => {

        const updatedValues = formState.inputValues;
        console.log(updatedValues)

        try {
            setIsLoading(true);
            await updateChatData(chatId,userData.userId,updatedValues)
            //    If user Edit data and Save we need to Update the State and get the latest Data
            // dispatch(updateLoggedInUserData({newData: updatedValues}));

            //    Setting Success Message
            setShowSuccessMessage(true)

            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 1500)


        } catch (e) {

            console.log(e.toString())
        } finally {
            setIsLoading(false)
        }

    }, [formState])


    const hasChanges = () => {
        const currentValues = formState.inputValues;
        return currentValues.chatName !== chatData.chatName;
    }

    const leaveChat= useCallback( async()=>{

        try{
            setIsLoading(true)
            //    Remove User
            await removeUserFromChat(userData,userData,chatData);
            props.navigation.popToTop();
        }catch (e) {
            console.log("ERROR ",e.toString())
        }
        finally {
            setIsLoading(false)
        }
    },[props.navigation,isLoading])

    if( !chatData.users){
        return  null
    }

    return (
        <PageContainer >

            <PageTitle text={"Chat Settings"}/>
            <ScrollView contentContainerStyle={styles.scrollView}>

                <ProfileImage
                    showEditButton={true}
                    size={80}
                    chatId={chatId}
                    userId={userData.userId}
                    uri={chatData.chatImage}
                />

                <Input

                    id={"chatName"}
                    label={"Chat name"}
                    autoCapitalize={"none"}
                    uri={chatData}
                    initialValue={chatData.chatName}
                    allowEmpty={"false"}
                    onInputChange={inputChangeHandler}
                    errorText={formState.inputValidates["chatName"]}

                />

                {/*// TODO Chat Participants Icon Styles*/}
                <View style={styles.sectionContainer}>

                    <Text style={styles.heading}>{chatData.users.length} Participants</Text>

                    {/*TODO Adding More Users to Group Chat*/}
                    <DataItem
                        title={"Add Users"}
                        icon={"plus"}
                        type={"button"}
                        onPress={()=>props.navigation.navigate("NewChat",{isGroupChat:true,existingUsers:chatData.users,chatId})}
                    />

                    {
                        chatData.users.slice(0,4).map(uid=>{
                            const currentUser=storedUsers[uid];
                            return <DataItem
                                        key={uid}
                                        image={currentUser.profilePicture}
                                        title={`${currentUser.firstName} ${currentUser.lastName}`}
                                        type={uid !== userData.userId && "link"}
                                        onPress={()=> uid !== userData.userId  && props.navigation.navigate("Contact",{uid,chatId})}
                            />
                        })
                    }

                    {
                        chatData.users.length > 4  &&
                       <DataItem
                           type={"link"}
                           title={"View All"}
                           icon={"search1"}
                           hideImage={true}
                           onPress={()=>props.navigation.navigate("DataList",{title:"Participants",data:chatData.users,type:"users",chatId})}

                       />
                    }

                </View>

                {
                    showSuccessMessage && <Text>Saved ! </Text>
                }

                {
                    isLoading ?
                    <ActivityIndicator size={"small"} color={colors.primary}/>:
                        hasChanges() &&
                    <SubmitButton
                        title={"Save Changes"}
                        color={colors.primary}
                        onPress={saveHandler}
                        disabled={!formState.formIsValid}

                    />
                }

                <DataItem
                    type={"link"}
                    title={"Starred Messages"}
                    // icon={"search1"}
                    hideImage={true}
                    onPress={()=>props.navigation.navigate("DataList",{title:"Starred Messages",data:Object.values(starredMessages),type:"messages"})}

                />

            </ScrollView>



            {
                <SubmitButton
                    title={"Leave Chat"}
                    color={colors.red}
                    style={{marginBottom:20}}
                    onPress={()=>leaveChat()}

                />
            }



        </PageContainer>


    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        },
        scrollView: {
            justifyContent:"center",
            alignItems:"center"

        }
        ,sectionContainer:{
            width:"100%",
            marginTop:10,
        },
        heading:{
            marginVertical:8,
            color:colors.textColor,
            fontFamily:"bold",
            letterSpacing:0.3,
        }
    }
)

export  default ChatSettingsScreen;

