import React, {Component, useState} from 'react';
import {View, Image, ActivityIndicator, TextInput, TouchableOpacity, StyleSheet, Text, Button} from 'react-native';
// import {app, auth, database, storage} from "../config/config";
import * as ImagePicker from 'expo-image-picker';
import {onValue, set, getDatabase, child} from "firebase/database";
import {ref as dbRef} from "firebase/database";

import {getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {getFirebaseApp} from "../utils/firebaseHelper";
import {getAuth} from "firebase/auth";
import colors from "../constants/colors";


// import ImagePicker from 'react-native-image-picker';

class UploadPostTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            photoUri: null,
            imageId: this.uniqueID(),
            image: "",
            galleryPermission: null,
            imageSelected: false,
            uploading: false,
            caption: "",
            progress: 0,
        }
    }

    componentDidMount = () => {

        const app = getFirebaseApp();
        const auth = getAuth(app)

        let that = this;
        auth.onAuthStateChanged((user) => {
            console.log("USER LOGGED IN IS ",user.uid)
            if (user) {
                //   User LoggedIn
                that.setState({
                    loggedIn: true,
                })
            } else {
                //   User Not LoggedIn
                that.setState({
                    loggedIn: false,
                })
            }

        })
        const galleryStatus = ImagePicker.requestMediaLibraryPermissionsAsync();
        this.setState({galleryPermissions: "granted"})

    }

    generateRandomCode = () => {
        return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
    }

    uniqueID = () => {
        return this.generateRandomCode() + this.generateRandomCode() + "-" + this.generateRandomCode() + "-" + this.generateRandomCode() + "-" +
            this.generateRandomCode() + "-" + this.generateRandomCode() + "-" + this.generateRandomCode() + "-" + this.generateRandomCode()
    }

    findNewImage = async () => {

        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access camera roll is required!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // image URI is available in the result object
            const imageUri = result.assets[0].uri;

            this.setState({
                image: result.assets[0].uri,
            });

            // continue with uploading the image to storage

            this.setState(
                {
                    imageSelected: true,
                    imageId: this.uniqueID(),
                    uri: result.assets[0].uri,
                }
            )
            // await this.uploadImage(result.assets[0].uri);


        } else {
            console.log("Cancelled")
            this.setState({
                imageSelected: false
            })
        }

    }


    uploadImage = async (uri) => {
        //  TODO    Accessing to FireStorage
        let that = this;
        const app = getFirebaseApp();
        const auth = getAuth(app)
        let userId = auth.currentUser.uid;
        let imageId = this.state.imageId;

        //    Setting extension for image
        let re = /(?:\.([^.]+))?$/;
        let extension = re.exec(uri)[1];
        this.setState(
            {
                currentFileType: extension,
                uploading: true,
            }
        )

        const response = await fetch(uri);

        const blob = await response.blob();

        //Setting File Path
        let filePath = imageId + "." + that.state.currentFileType;

        // //TODO Making a Reference

        const dbRef = ref(getDatabase(app));
        const storage = getStorage(app);

        // const dbRef = ref(getDatabase(app));
        //
        // const photosRef = child(dbRef, `/photos/`)

        // onValue(photosRef, (querySnapshot) => {
        const storageRef = ref(storage, "user/" + userId + "/img/" + filePath);

        //TODO Uploading Image to the Fire Storage
        const uploadTask = uploadBytesResumable(storageRef, blob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                console.log('Upload is ' + progress + '% done');
                that.setState({
                    progress: progress,
                })
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log("Error While Uploading" + error.name)
            },
            () => {

                that.setState({
                    progress: 100,
                })

                // Handle successful uploads on complete
                //TODO Here we getting the Actual URL of the Uploaded Image
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // alert(downloadURL)
                    that.processUpload(downloadURL)
                });
            }
        );

    }

    processUpload=(imageURL)=>{

        console.log(imageURL)

        //    Build Photo Object
        //    Here Each photo has authorId,caption,date & time,

        const app = getFirebaseApp();
        const auth = getAuth(app)
        const database = getDatabase(app);

        //Needed Info
        let imageId=this.state.imageId;
        let userId=auth.currentUser.uid;
        let dataTime=Date.now();
        let caption=this.state.caption;
        let timeStamp=Math.floor(dataTime/1000);

        let photoObject={

            author:userId,
            caption:caption,
            timeStamp:timeStamp,
            imageURL:imageURL,
            postId:imageId,
            reports:null,
        }
        console.log("LOGIN USER ID ")
        console.log(auth.currentUser.uid)

        console.log("CURRENT USER ID ")
        console.log(photoObject.author)

        console.log("GENERATED IMAGE ID ")
        console.log(imageId)

        //    Adding Created Object to the Database

        // database.ref("photos/"+imageId).set(photoObject);
        // database.ref("users/userId/photos").set(photoObject);

        //TODO Adding to the user's  Feed in DB
        try{

            set(dbRef(database, 'users/'+userId+'/photos/'+imageId),photoObject);
            alert("Image is UPLOADED SUCCESSFULLY TO USERS ")
        }
        catch (e) {
            console.log(e.toString())
            alert(e.toString())
        }

        console.log("PHOTO OBject Created")
        console.log(photoObject)

        //TODO Adding to the Photos Feed in DB
        try{

            set(dbRef(database, 'photos/'+imageId),photoObject);
            alert("Image is UPLOADED SUCCESSFULLY TO PHOTOS")
            this.props.navigation.navigate("Feed")

        }catch (e) {
            console.log(e.toString())
            alert(e.toString())

        }


    }

    uploadAndPublish = () => {

        //Here Checking If the Upload Button is Clicked more than Once

        if (this.state.uploading === false) {
            if (this.state.caption !== "") {
                this.uploadImage(this.state.uri)
            } else {
                alert("Please Enter a caption")

            }
        } else {
            console.log("IGNORE BUTTON TAO AS IMAGE IS ALREADY UPLOADED")
        }


    }


    render() {

        return (


            <View style={styles.mainContainer}>

                {this.state.loggedIn === true ?

                    <View style={styles.container}>

                        {this.state.imageSelected ?

                            <View style={{width: "100%", height: 70}}>

                                <Text style={{marginTop: 5}}>
                                    Caption
                                </Text>
                                <TextInput editable={true}
                                           placeholder={"Enter Your Caption"}
                                           maxLength={150}
                                           multiline={true}
                                           numberOfLines={5}
                                           onChangeText={(text) => this.setState({caption: text})}
                                           style={{
                                               marginVertical: 10,
                                               height: 100,
                                               padding: 5,
                                               borderColor: "grey",
                                               borderWidth: 1,
                                               borderRadius: 10,
                                               backgroundColor: "#FFFFFF",
                                               color: "black"
                                           }}
                                />

                                <View>
                                    {this.state.image && (
                                        <Image source={{uri: this.state.image}} style={{
                                            width: "95%",
                                            height: 300,
                                            marginVertical: 10,
                                            marginHorizontal: 10,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}/>
                                    )}


                                    <TouchableOpacity style={styles.button} onPress={this.uploadAndPublish}>
                                        <Text style={styles.title}>Upload And Publish</Text>
                                    </TouchableOpacity>


                                </View>

                                {this.state.uploading ?

                                    <View>
                                        <Text>{this.state.progress} %</Text>
                                        {this.state.progress !== 100 ?
                                            <ActivityIndicator size={"large"} color={"red"}/>
                                            :
                                            <Text>Processing </Text>
                                        }
                                    </View>

                                    :
                                    <View></View>
                                }

                            </View>

                            :

                            <View style={styles.photoContainer}>
                                <TouchableOpacity style={styles.photoContainer} onPress={this.findNewImage}>
                                    {this.state.photoUri ? (
                                        <Image source={{uri: this.state.photoUri}} style={styles.photo}/>
                                    ) : (
                                        <Text style={styles.photoText}>Choose a Photo</Text>
                                    )}
                                </TouchableOpacity>
                                {/*<TextInput*/}
                                {/*    placeholder="Write a caption..."*/}
                                {/*    value={this.state.caption}*/}
                                {/*    // onChangeText={setCaption}*/}
                                {/*    style={styles.captionInput}*/}
                                {/*/>*/}

                            </View>
                        }

                    </View>
                    :
                    <View>
                        <Text>User Not LoggedIn</Text>
                        <Text>Please Login to Upload Post</Text>
                    </View>

                }
            </View>
        );

    }


}

const
    styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
        },
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#EEEEEE',
            padding: 20,
            // borderColor: "red",
            borderWidth: 2
        },
        photoContainer: {
            width: '100%',
            height: 200,
            backgroundColor: '#d3d3d3',
            marginTop: 40,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        photo: {
            width: '100%',
            height: '100%',
        },
        photoText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        captionInput: {
            width: '100%',
            height: 50,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
        },
        button: {
            backgroundColor: colors.darKTextColor,
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginVertical: 10,
        },
        title: {
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold',
            alignSelf: 'center',
            textTransform: 'uppercase',
        },

    });

export default UploadPostTest;