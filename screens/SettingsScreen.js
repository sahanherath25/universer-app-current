import React, {useCallback, useMemo, useReducer, useState} from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator, ScrollView} from 'react-native';
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import Input from "../components/Input";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {validateInput} from "../utils/actions/FormActions";
import {reducer} from "../utils/reducers/formReducer";
import {useDispatch, useSelector} from "react-redux";
import colors from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import {updateSignedInUserData, userLogout} from "../utils/actions/authActions";
import {updateLoggedInUserData} from "../store/authSlice";
import ProfileImage from "../components/ProfileImage";
import DataItem from "../components/DataItem";


const SettingsScreen = props => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    //Accessioning th state
    const userData = useSelector((state) => state.auth.userData);
    const starredMessages=useSelector(state=>state.messages.starredMessages ?? {});

    const sortedStarredMessages=useMemo(()=>{

        let result=[];

        const chats=Object.values(starredMessages);

        chats.forEach((chat)=>{
           const chatMessages= Object.values(chat);
           // console.log("CHAT MESSAGES ",chatMessages);
           result=result.concat(chatMessages)
        })

        return result

    },[starredMessages])
    // console.log("STARRED MESSAGES",starredMessages)

    // console.log("Updated State Data", userData);


    const firstName = userData.firstName || ""
    const lastName = userData.lastName || ""
    const email = userData.email || ""
    const about = userData.about || ""

    const initialState = {
        inputValues: {
            firstName,
            lastName,
            email,
            about,
        },
        inputValidates: {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            about: undefined,
        },
        formIsValid: false
    }


    const [formState, dispatchFormState] = useReducer(reducer, initialState)

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
            await updateSignedInUserData(userData.userId, updatedValues)
            //    If user Edit data and Save we need to Update the State and get the latest Data
            dispatch(updateLoggedInUserData({newData: updatedValues}));

            //    Setting Success Message
            setShowSuccessMessage(true)

            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)


        } catch (e) {

            console.log(e.toString())
        } finally {
            setIsLoading(false)
        }

    }, [formState, dispatch])

    const hasChanges = () => {
        const currentValues = formState.inputValues;

        return currentValues.firstName !== firstName ||
            currentValues.lastName !== lastName ||
            currentValues.email !== email ||
            currentValues.about !== about;


    }

    return <PageContainer style={styles.container}>

        <PageTitle text={"Chat Settings Of App"}/>
        {/*<Text>Chat Settings Of App</Text>*/}

        <ScrollView contentContainerStyle={styles.formContainer}>


            <ProfileImage size={100} userId={userData.userId} uri={userData.profilePicture} showEditButton={true}/>

            <Input
                id={"firstName"}
                label={"First Name"}
                icon={"user-o"}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                iconPack={FontAwesome}
                onInputChange={inputChangeHandler}
                errorText={formState.inputValidates["firstName"]}
                initialValue={userData.firstName}
            />

            <Input
                id={"lastName"}
                label={"Last Name"}
                icon={"user-o"}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                iconPack={FontAwesome}
                onInputChange={inputChangeHandler}
                errorText={formState.inputValidates["lastName"]}
                initialValue={userData.lastName}
            />

            <Input
                id={"email"}
                label={"Email"}
                icon={"mail"}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                iconPack={Feather}
                onInputChange={inputChangeHandler}
                errorText={formState.inputValidates["email"]}
                initialValue={userData.email}
            />

            <Input
                id={"about"}
                label={"About"}
                icon={"user-o"}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                iconPack={FontAwesome}
                onInputChange={inputChangeHandler}
                errorText={formState.inputValidates["about"]}
                initialValue={userData.about}
            />

            <View style={{marginTop: 20}}>
                {
                    showSuccessMessage && <Text style={{textAlign: "center"}}>Information Updated</Text>
                }
                {
                    isLoading ?
                        <ActivityIndicator size={"small"} color={colors.primary}
                                           style={{marginTop: 10}}
                        />
                        : hasChanges() && <SubmitButton
                            title={"Save"}
                            onPress={saveHandler}
                            style={{marginTop: 20}}
                            disabled={!formState.formIsValid}
                        />
                }

            </View>

            <DataItem
                type={"link"}
                title={"Starred Messages"}
                // icon={"search1"}
                hideImage={true}
                onPress={()=>props.navigation.navigate("DataList",{title:"Starred Messages",data:Object.values(sortedStarredMessages),type:"messages"})}
            />

            <SubmitButton
                title={"Logout"}
                onPress={() => dispatch(userLogout(userData))}
                color={colors.red}
                style={{marginTop: 20}}
            />

        </ScrollView>
    </PageContainer>
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {

        alignItems:"center"
    }
})

export default SettingsScreen;