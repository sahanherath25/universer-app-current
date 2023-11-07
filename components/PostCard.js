import React, { useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import CommentButton from "./CommentButton";
import CustomButton from "../screens/CustomButton";
import DeleteButton from "./DeleteButton";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import {getFirebaseApp} from "../utils/firebaseHelper";
import {child, getDatabase, onValue, ref, remove} from "firebase/database";
import {useSelector} from "react-redux";

const PostCard = ({ post }) => {
    const [caption, setCaption] = useState(post.caption);
    const [isEditing, setIsEditing] = useState(false);
    //Accessioning th state
    const userData = useSelector((state) => state.auth.userData);

    console.log("Post Object ",post)

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Save the edited caption here (you can implement the logic to update the caption in your data source)
        setIsEditing(false);
        console.log("Current Post InFO ",post )
    };

    const handleDelete = () => {
        // Save the edited caption here (you can implement the logic to update the caption in your data source)
        setIsEditing(false);
        // console.log("Current Post InFO ",post )
        // console.error("Current Post InFO ",post )

    //    TODO Inorder to delete the post phot should be removed from photos and specific user photos objects

    //    Accessing to the users object to find weather user has the photo to delete


        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        // const currentUserId=userData.userId
        const currentUserId=post.authorId

        // Alert.alert("POSET OWNER",currentUserId)

        const postUserId=post.authorId;

        const postIdToDelete=post.id;
        const photosRef = child(dbRef, `/users/${currentUserId}/photos`)
        const photoRefToDeleteInUsers = child(dbRef, `/users/${currentUserId}/photos/${postIdToDelete}`)
        const photoRefToDeleteInPhotos = child(dbRef, `/photos/${postIdToDelete}`)


        // onValue(photosRef, (snapshot) => {
        //     console.log("Photo From User To Delete")
        //
        //     //TODO Checking User is Exists
        //     const exists = snapshot.exists();
        //     if(exists){
        //         const  allPosts=snapshot.val();
        //         console.log("SALL POST DATA ",allPosts)
        //
        //         for (const postId in allPosts) {
        //             // console.log(postId)
        //             if(postId===postIdToDelete){
        //                 console.error("POST FOUND TO DELETE IN PHOTOS  ",)
        //                 return;
        //
        //             }
        //         }
        //
        //         console.log("REF USER",photoRefToDeleteInUsers)
        //         console.log("REF PHOTOS",photoRefToDeleteInPhotos)
        //         // remove(photoRefToDeleteInUsers)
        //
        //     }
        //
        //
        //
        //
        //
        // }, {
        //     onlyOnce: true,
        // });

        onValue(photoRefToDeleteInUsers, (snapshot) => {

            //TODO Checking User is Exists
            const exists = snapshot.exists();
            if(exists){
                const  postToDelete=snapshot.val();
                console.error("Post USER ARRAY",postToDelete)

                //TODO Checking If the Post is available in POSTS Object in Firebase
                onValue(photoRefToDeleteInPhotos, (snapshot) => {

                    //TODO Checking User is Exists
                    const exists = snapshot.exists();
                    if(exists){
                        const  postToDelete=snapshot.val();
                        console.log("Post To Delete PHOTOS ARRAY",postToDelete)


                        //TODO Call the remove method to delete the Post From Users .
                        remove(photoRefToDeleteInUsers)
                            .then(() => {
                                console.log('Data deleted successfully.');
                            })
                            .catch((error) => {
                                console.error('Error deleting data:', error);
                            });

                        //TODO  Call the remove method to delete the Post From All Posts .
                        remove(photoRefToDeleteInPhotos)
                            .then(() => {
                                console.log('Data deleted successfully.');
                            })
                            .catch((error) => {
                                console.error('Error deleting data:', error);
                            });

                    }

                }, {
                    onlyOnce: true,
                });


            }

        }, {
            onlyOnce: true,
        });



    };

    const handleCaptionChange = (text) => {
        setCaption(text);
    };


    return (
        <View style={styles.container}>
            <Image source={{ uri: post.url }} style={styles.postImage} />
            <View style={styles.postInfo}>
                {isEditing ? (
                    <TextInput
                        value={caption}
                        onChangeText={handleCaptionChange}
                        style={styles.captionInput}
                        multiline
                    />
                ) : (
                    <Text style={styles.postCaption}>{post.caption}</Text>
                )}

                <Text style={styles.uploadedDate}>Uploaded  {post.posted}</Text>
                <View style={styles.buttonsContainer}>
                    {isEditing ? (
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveClick}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.editButton} onPress={handleEditClick}>
                            <Text style={styles.buttonText}>Edit Caption</Text>
                        </TouchableOpacity>
                    )}

                    <DeleteButton  currentPost={post} onPress={handleDelete} />

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderColor:colors.blackBorder,
        borderWidth:1,
        borderStyle:"solid"

    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 12,
    },
    postInfo: {
        marginBottom: 8,
    },
    postCaption: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily:fonts.textFont,
    },
    captionInput: {
        fontSize: 16,
        marginBottom: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
    },
    uploadedDate: {
        fontSize: 12,
        color: colors.blackBorder,
        fontFamily:fonts.medium,
    },
    buttonsContainer: {
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: colors.editButtonColor,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    saveButton: {
        backgroundColor: colors.saveButtonColor,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    deleteButton: {
        backgroundColor: '#DC3545',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    viewCommentsButton: {
        backgroundColor: '#FFC107',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default PostCard;
