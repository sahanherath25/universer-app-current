import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, KeyboardAvoidingView } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [logoOpacity] = useState(new Animated.Value(0));
    const [formOpacity] = useState(new Animated.Value(0));

    const handleLogin = () => {
        // handle login logic here
    };

    const fadeIn = (value) => {
        Animated.timing(value, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const fadeInLogo = () => {
        fadeIn(logoOpacity);
    };

    const fadeInForm = () => {
        fadeIn(formOpacity);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
                <Text style={styles.logoText}>My App</Text>
            </Animated.View>
            <Animated.View style={[styles.formContainer, { opacity: formOpacity }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'steelblue',
    },
    formContainer: {
        padding: 20,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
    },
    input: {
        height: 50,
        backgroundColor: '#F5FCFF',
        marginBottom: 20,
        padding: 10,
        color: 'black',
        borderRadius: 5,
        borderColor: 'steelblue',
        borderWidth: 1,
    },
    buttonContainer: {
        backgroundColor: 'steelblue',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default LoginScreen;
