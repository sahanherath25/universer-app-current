import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import {getFirebaseApp} from "../utils/firebaseHelper";
import {child, getDatabase, push, set,get,ref} from "firebase/database";
// import {ref as dbRef} from "firebase/database";

const ReportButton = ({loggedInUser,post,photoId}) => {

    const toggleReport = () => {
        // Alert.alert("LOGGED IN USER ID ",loggedInUser)
        reportPost(photoId,loggedInUser)

    };


    // Function to report a post
    const reportPost = (postId, userId) => {
        const app = getFirebaseApp();
        const database = getDatabase(app);
        // const postRef = ref(database, `photos/${postId}`);
        const postRef = ref(database, `photos/${postId}/reports`);

        // Generate a unique report ID
        const reportId = uniqueID();

        // Create a report object with user ID and any additional properties
        let reportObject = {
            userId: userId,
            // Add more properties if needed
        };

        // Check if the 'reports' field exists
        // Check if the 'reports' field exists
        // get(child(postRef, "reports"))
        //     .then((snapshot) => {
        //         if (!snapshot.exists()) {
        //             // The 'reports' field does not exist, create it along with the first report
        //             const reports = {};
        //             reports[reportId] = reportObject;
        //             set(child(postRef, "reports"), reports);
        //         } else {
        //             // 'reports' field already exists, push the new report
        //             const reportsRef = ref(postRef, "reports");
        //             push(reportsRef, reportObject);
        //         }
        //         Alert.alert("Image is UPLOADED SUCCESSFULLY TO PHOTOS", "REPORTED");
        //     })
        //     .catch((error) => {
        //         console.error("Error checking for 'reports' field:", error);
        //     });

        // Push the report object to the "reports" field
        push(postRef, reportObject)
            .then(() => {
                Alert.alert("Content Reported ", "You have successfully reported this content. Thank you for helping us maintain a safe community");
            })
            .catch((error) => {
                console.error("Error adding report:", error);
            });


    };



    const generateRandomCode = () => {
        return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
    }

    const uniqueID = () => {
        return generateRandomCode() + generateRandomCode() + "-" + generateRandomCode() + "-" + generateRandomCode() + "-" +
            generateRandomCode() + "-" + generateRandomCode() + "-" + generateRandomCode() + "-" + generateRandomCode();
    };

    return (
        <TouchableOpacity onPress={toggleReport}>
            <View style={styles.container}>
                <MaterialIcons name="report" size={24} color={colors.report} />
                <Text style={styles.label}>Report</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default ReportButton;
