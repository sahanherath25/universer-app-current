import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import {Platform} from "react-native";
import {getFirebaseApp} from "./firebaseHelper";
import uuid from 'react-native-uuid';

import {getStorage,uploadBytesResumable,getDownloadURL,ref} from "firebase/storage";

export const launchImagePicker = async () => {
    //    TODO Step 1.Checking the Permission
    await checkingMediaPermission()

    //    TODO Step 2.

    const result = await ImagePicker.launchImageLibraryAsync(
        {
            //Only Shows the Images
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //Allow to crop Image
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

    //If user cancelled the return value if result is cancelled
    if(!result.canceled){
        //Here we are getting the image that we selected in assists
        console.log(result.assets[0].uri);

        // TODO  returning the selected Image
        return result.assets[0].uri;
    }
}

export const openCamera = async () => {

    //requesting Camera Permission
    const permissionResult=await  ImagePicker.requestCameraPermissionsAsync();


    if(!permissionResult.granted){
        console.log("No Permission for Camera Given")
        return ;
    }

    const result = await ImagePicker.launchImageLibraryAsync(
        {
            //Only Shows the Images
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //Allow to crop Image
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

    //If user cancelled the return value if result is cancelled
    if(!result.canceled){
        //Here we are getting the image that we selected in assists
        console.log(result.assets[0].uri);

        // TODO  returning the selected Image
        return result.assets[0].uri;
    }
}


export  const  uploadImageAsync=async (uri,isChatImage=false)=>{

    const app=getFirebaseApp();

    const blog=await new Promise((resolve, reject)=>{
        //Step 1 Created a request Object
        const xhr=new XMLHttpRequest();

        // Step 2 Once it is loaded mark promise as resolved
        xhr.onload=()=>{
            resolve(xhr.response)
        };
        // Step 3 Or if there is error mark promise as reject
        xhr.onerror=(error)=>{
            console.log(error);

            reject(new TypeError(" Network Request Failed"))
        }

        xhr.responseType="blob";
        xhr.open("GET",uri,true);
        //Sending the request
        xhr.send();

    })

    const pathFolder=isChatImage ? "chatImages" :"profilePics"

//    creating the path for storage

    const storage = getStorage(app);

    // console.log(storage)

    const storageRef=ref(storage,`${pathFolder}/${uuid.v4()}`);

    console.log("STORAGE REF",storageRef)

    await uploadBytesResumable(storageRef,blog)

    blog.close();

    return await getDownloadURL(storageRef);

}

const checkingMediaPermission = async () => {
    if (Platform.OS !== "web") {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        //If user Not  gives Permission
        if (permissionResult.granted === false) {
            return Promise.reject("We Need Permission to access your Photos")
        }
    }
    return Promise.resolve()
}

