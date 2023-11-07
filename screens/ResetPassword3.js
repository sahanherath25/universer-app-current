import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);

    const handleResetPassword = () => {
        firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                setResetSent(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            {!resetSent ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={text => setEmail(text)}
                        value={email}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.successText}>Password reset email sent!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#f4511e',
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default ResetPassword;
