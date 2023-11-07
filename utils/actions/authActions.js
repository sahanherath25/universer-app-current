import {getFirebaseApp} from "../firebaseHelper";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {getDatabase, ref, child, set, update, get} from "firebase/database";
import {getStorage} from "firebase/storage";
import {authenticate, logout} from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserData} from "./userActions";

// import * as Device from "expo-device"
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import {Alert} from "react-native";


//timer variable

let timer;

export const signUp = (firstName, lastName, email, password) => {

    return async dispatch=> {
        console.log(firstName, lastName, email, password)
        const app = getFirebaseApp();
        // Initialize Firebase Authentication and get a reference to the service
        const auth = getAuth(app); // export const auth=firebase.auth();

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            //Getting the user ID that created when user sign in
            const {uid,stsTokenManager} = result.user;

            const {accessToken,expirationTime}=stsTokenManager;

            const expiryDate=new Date(expirationTime)

            const userData = await createUser(firstName, lastName, email, uid)

            dispatch(authenticate({token: accessToken, userData}))

            saveDataToStorage(accessToken,uid,expiryDate);
            await storePushToken(userData);

            console.log("USer Data Stored",userData)

        } catch (error) {
            const errorCode = error.code;
            // console.log(errorCode)
            let message = "Something went wrong";
            if (errorCode === "auth/email-already-in-use") {

                message = "This email is Already in Use"
            }
            throw new Error(message)
        }
    }


//
//
// // Initialize Realtime Database and get a reference to the service
// export const database = getDatabase(app);
//
// // Initialize Firebase Storage and get a reference to the service
// export const storage = getStorage(app);
}

const createUser = async (firstName, lastName, email, userId) => {

    // const firstLast = `${firstName} ${lastName}`.toLowerCase();

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const fName = capitalizeFirstLetter(firstName);
    const lName = capitalizeFirstLetter(lastName);
    const fullName = `${fName} ${lName}`;




    //This object will be saved in the Realtime DB
    const userData = {
        firstName,
        lastName,
        fullName,
        email,
        userId,
        signUpDate: new Date().toISOString()
    };
    //creating a Reference/path to the Firebase Database
    const dbRef = ref(getDatabase());

    //Creating Specific user's path
    const childRef = child(dbRef, `users/${userId}`)

    //Saving User Data in the ChildRef path
    await set(childRef, userData)


    console.log("New Object Created ",userData)

    return userData;

}



export const signIn = (email, password) => {

    return async dispatch=> {
        // console.log(firstName, lastName, email, password)
        const app = getFirebaseApp();
        // Initialize Firebase Authentication and get a reference to the service
        const auth = getAuth(app); // export const auth=firebase.auth();

        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            //Getting the user ID that created when user sign in
            const {uid,stsTokenManager} = result.user;
            const {accessToken,expirationTime}=stsTokenManager;

            const expiryDate=new Date(expirationTime)
            //getting the current time to set timer
            const timeNow=new Date();

            const milisecondsUntilExpiry=expiryDate-timeNow;


            // console.log("User ID Sign In ",uid)
            const userData = await getUserData(uid)

            console.log("NEW USER DATA",userData)

            dispatch(authenticate({token: accessToken, userData}))
            saveDataToStorage(accessToken,uid,expiryDate);

            //Getting the Expo Token
            await storePushToken(userData);


            // TODO LOGIN OUT AUTO TIME
            timer=setTimeout(()=>{
                dispatch(userLogout(userData))
            },milisecondsUntilExpiry)

            console.log(userData)

        } catch (error) {
            const errorCode = error.code;
            console.log(errorCode)
            let message = "Something went wrong";

            // auth/user-not-found
            if (errorCode === "auth/user-not-found") {
                message = "The email address you entered was not found in our system. " +
                    "Please ensure that you have entered the correct email address or sign up to create a new account"
            }
            // auth/wrong-password
            if(errorCode === "auth/wrong-password"){
                message ="The password you entered is incorrect";
            }

            throw new Error(message)
        }
    }

}


export const updateSignedInUserData=async (userId, newData)=>{

    console.log("UID After Uploading IMG ",userId)

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };




    if(newData.firstName && newData.lastName){
        // const firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase();

        const fName = capitalizeFirstLetter(newData.firstName );
        const lName = capitalizeFirstLetter(newData.lastName);
        const fullName = `${fName} ${lName}`;

        newData.firstLast=fullName;
    }



    //creating a Reference/path to the Firebase Database
    const dbRef = ref(getDatabase());

    //Creating Specific user's path
    const childRef = child(dbRef, `users/${userId}`)

    //Updating  User Data in the ChildRef path
    await update(childRef, newData)
}

const saveDataToStorage=(token,userId,expiryDate)=>{

    AsyncStorage.setItem("userData",JSON.stringify({
        token,
        userId,
        expiryDate:expiryDate.toString(),
    }))
}

const storePushToken=async (userData)=>{

    // console.error("CALLING TO GET PUSH TOKEN FUNCTION ")


//    Checking if the User using  Real Device
    if(!Device.isDevice){
        return
    }


    let token = (await Notifications.getExpoPushTokenAsync()).data;
    // let token = (await Notifications.getExpoPushTokenAsync({ projectId: 'horizon-news-feed' })).data;
    // const token = (await Notifications.getExpoPushTokenAsync({projectId: 'horizon-news-feed'}).data());

    const tokenData= {...userData.pushTokens} || {};
    //  Push Token will receive as Key Value Here we Only need the Value
    let tokenArray=Object.values(tokenData);

    if(tokenArray.includes(token)){
        return
    }

    // console.error("TOKEN GOING TO ADD ARRAY ",token)

    tokenArray.push(token);

    // console.log("TOKEN ARRAY",tokenArray)
    for (let i = 0; i < tokenArray.length; i++) {

        const tok=tokenArray[i];

        //Here we're iterating the Token array and re-constructing  a key value pair
        tokenData[i]=tok;

    //    TODO IF we have3 tokens in the array

    //     {
    //         0:" Token 1",
    //         1:" Token 2",
    //         2:" Token 3",
    //     }


    }

    const app=getFirebaseApp();
    const dbRef=ref(getDatabase(app))


    const userRef=child(dbRef,`users/${userData.userId}/pushTokens`)
    // console.error("USER REF" ,userRef)
    await set(userRef,tokenData)











}

const removePushToken=async (userData)=>{

    // console.error("CALLING TO REMOVE PUSH TOKEN FUNCTION ")


//    Checking if the User using  Real Device
    if(!Device.isDevice){
        return
    }


    let token = (await Notifications.getExpoPushTokenAsync()).data;
    // let token = (await Notifications.getExpoPushTokenAsync({ projectId: 'horizon-news-feed' })).data;
    // const token = (await Notifications.getExpoPushTokenAsync({projectId: 'horizon-news-feed'}).data());

    const tokenData=await getUserPushTokens(userData.userId);

    for (const tokenDataKey in tokenData) {
        //Here  checking we find the token that wat to be removed
        if(tokenData[tokenDataKey]===token){
            delete tokenData[tokenDataKey];
            break;
        }

    }

    // after removing the token we need to update in the pushToken array

    const app=getFirebaseApp();
    const dbRef=ref(getDatabase(app))


    const userRef=child(dbRef,`users/${userData.userId}/pushTokens`)
    // console.error("USER REF PATH WHNE REMOVED" ,userRef)
    await set(userRef,tokenData)



}

export const getUserPushTokens=async (userId)=>{

    try {

        const app=getFirebaseApp();
        const dbRef=ref(getDatabase(app))
        const userRef=child(dbRef,`users/${userId}/pushTokens`)

        //get() only get data from the database once without listening for other changes later
        const snapshot=await get(userRef);

        if(!snapshot|| !snapshot.exists()){
            return {}
        }
        return snapshot.val() || {};

    }catch (exception) {
        console.log("ERROR",exception);
    }

}


export const userLogout=(userData)=>{

    return async (dispatch)=>{

        try {
            await removePushToken(userData)

        }catch (exception) {

            console.log("ERROR",exception)

        }


        AsyncStorage.clear();
        clearTimeout(timer)
        dispatch(logout())
    }


}
