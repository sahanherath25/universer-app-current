import React, {useEffect} from "react";
import {ActivityIndicator, View} from "react-native";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {authenticate, setDidTryAutoLogin} from "../store/authSlice";
import {getUserData} from "../utils/actions/userActions";

const StartUpScreen=()=>{

    const dispatch=useDispatch();

    useEffect( ()=>{
        const tryLogin=async ()=>{
            const storageAuthInfo=await AsyncStorage.getItem("userData")

            if(!storageAuthInfo){
                console.log("No Storage Found")
                dispatch(setDidTryAutoLogin())
                return
            }

            //Converting storage Object back to JS object
            const parsedData=JSON.parse(storageAuthInfo);
            console.log(storageAuthInfo)

            // console.log("Parsed Data",parsedData)
        //    here we extract the values form this object

            const{token,userId,expiryDate:expiryDateString}=parsedData;
            console.log(token)
            console.log(userId)

            const expiryDate=new Date(expiryDateString);
            console.log(expiryDate)


            if(expiryDate <= new Date() || !token || !userId){
                dispatch(setDidTryAutoLogin())
                return
            }

            // console.log("CALLING GET USER DATA ()",userId)
            const userData=await getUserData(userId)

            // console.log("DB DATA" ,userData)
            dispatch(authenticate({token: token, userData}))

        }

        tryLogin();

    },[dispatch])

    return(
        <View style={commonStyles.center}>
            <ActivityIndicator size={"large"} color={colors.primary}/>
        </View>
    )
}
export default StartUpScreen;