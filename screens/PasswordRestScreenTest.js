import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {getFirebaseApp} from "../utils/firebaseHelper";
import colors from "../constants/colors";


const ResetPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        const app=getFirebaseApp()
        const auth = getAuth(app);

        setIsLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                setSuccess('A password reset link has been sent to your email.');
                setError(null);
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.log(" ERROR ",error)
                setError(error.message);
                setSuccess(null);
                // ..
            });

        try {
            await auth.sendPasswordResetEmail(auth,email)


        } catch (error) {
            // console.log(" ERROR ",error)
            // setError(error.message);
            // setSuccess(null);
        }
        setIsLoading(false);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        setError(null); // Hide the error message when the user starts typing
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset </Text>
            <Text style={styles.title}>Password</Text>
            <Text style={styles.description}>Please enter your horizon campus email address to request a password reset</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => handleEmailChange()}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Send Reset Password</Text>
                )}
            </TouchableOpacity>
            <View style={styles.message}>
                {error && <Text style={styles.error}>{error}</Text>}
                {success && <Text style={styles.success}>{success}</Text>}
            </View>
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//         backgroundColor: '#f9f9f9',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#333',
//     },
//     input: {
//         height: 40,
//         width: '100%',
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 4,
//         paddingHorizontal: 10,
//         marginBottom: 20,
//         backgroundColor: '#fff',
//         fontSize: 16,
//     },
//     button: {
//         backgroundColor: colors.resetButton,
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         borderRadius: 4,
//         width: '100%',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     error: {
//         color: 'red',
//         marginBottom: 20,
//         fontSize: 14,
//     },
//     success: {
//         color: 'green',
//         marginBottom: 20,
//         fontSize: 14,
//     },
// });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign:"left",
        alignSelf:"flex-start"

    },

    input: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2c3e50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginTop:10,
        marginBottom: 20,
        fontSize: 14,
    },
    success: {
        color: 'green',
        marginBottom: 20,
        fontSize: 14,
    },
    message:{

    },
    description: {
        fontSize: 14,
        textAlign: 'left',
        marginTop: 20,
        marginBottom:20,
        color: colors.resetPasswordDescription,
        fontFamily: "montserratMedium",
    },
});

export default ResetPasswordScreen;
