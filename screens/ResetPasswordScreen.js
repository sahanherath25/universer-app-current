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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            {success && <Text style={styles.success}>{success}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Reset Password</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

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
        marginBottom: 20,
        color: '#333',
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
        backgroundColor: colors.resetButton,
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
        marginBottom: 20,
        fontSize: 14,
    },
    success: {
        color: 'green',
        marginBottom: 20,
        fontSize: 14,
    },
});

export default ResetPasswordScreen;
