import React, {useState} from "react";
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../constants/colors";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {launchImagePicker, uploadImageAsync} from "../utils/launchImagePicker";
import userImage from "../assets/images/userImage.jpeg"
import {updateSignedInUserData} from "../utils/actions/authActions";
import {updateLoggedInUserData} from "../store/authSlice";
import {useDispatch} from "react-redux";
import {updateChatData, updateChatDate} from "../utils/actions/chatActions";


const ProfileImage = (props) => {

    const dispatch = useDispatch();

    // console.log("CURRENT UID ", props.userId)

    const source = props.uri ? {uri: props.uri} : require("../assets/images/userImage.jpeg");

    const [image, setImage] = useState(source);

    const [isLoading, setIsLoading] = useState(false);

    const showEditButton = props.showEditButton && props.showEditButton === true;

    const showRemovedButton = props.showRemovedButton && props.showRemovedButton === true;

    const userId = props.userId;

    const chatId = props.chatId;

    const pickImage = async () => {


        try {
            const tempUri = await launchImagePicker();
            console.log("TEMP URL ", tempUri)
            if (!tempUri) {
                //IF there is no images don't do anything
                return
            }

            setIsLoading(true)

            //  TODO Upload the Image
            const uploadUrl = await uploadImageAsync(tempUri,chatId !== undefined);
            console.log("UPLOAD IMAGE URL ", uploadUrl)

            setIsLoading(false)

            if (!uploadUrl) {
                throw  new Error("Could not Upload the Image")
            }

            if(chatId){

            //    TODO IF  this is chaImag  need to update ChatData in DB

                await updateChatData(chatId,userId,{chatImage:uploadUrl})

            }else {

                const newData = {profilePicture: uploadUrl}
                dispatch(updateLoggedInUserData({newData: newData}));

                console.log("CUssrent UUD", userId)
                //After editing the Image we need to get that updated Image
                await updateSignedInUserData(userId, {profilePicture: uploadUrl})
            }




            //  TODO Set The Image
            setImage({uri: tempUri})

        } catch (error) {
            console.log("ERROR ", error.errorCode)
            setIsLoading(false)
        }

    }

    const Container=props.onPress || showEditButton ? TouchableOpacity : View

    return (
        <Container onPress={props.onPress|| pickImage} style={props.style}>

            {isLoading ?
                <View style={styles.loadingContainer} height={props.size} width={props.size}>
                    <ActivityIndicator size={"small"} color={colors.primary}/>
                </View> :
                <Image style={{...styles.image, ...{width: props.size, height: props.size}}} source={image}/>
            }

            {
                showEditButton && !isLoading &&
                <View style={styles.editIconContainer}>
                    <FontAwesome5 name="user-edit" size={24} color="black"/>
                </View>
            }

            {
                showRemovedButton && !isLoading &&
                <View style={styles.removeIconContainer}>
                    <FontAwesome name="close" size={15} color="black"/>
                </View>
            }

        </Container>
    )
}

const styles = StyleSheet.create(
    {
        image: {
            borderRadius: 50,
            borderColor: colors.grey,
            borderWidth: 1,
        },
        editIconContainer: {
            position: "absolute",
            bottom: -10,
            right: 0,
            backgroundColor: colors.lightGrey,
            borderRadius: 20,
            padding: 8,
        },
        loadingContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        removeIconContainer: {
            position: "absolute",
            bottom: -3,
            right: -3,
            backgroundColor: colors.lightGrey,
            borderRadius: 20,
            padding: 3,
        }
    }
)

export default ProfileImage