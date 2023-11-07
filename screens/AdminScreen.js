import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Image, Text, Animated} from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import colors from "../constants/colors";


const AdminScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [error, setError] = useState('');
    const [animationPlayed, setAnimationPlayed] = useState(false); // Track if animation has been played




    // Create animated values
    const imageOpacity = new Animated.Value(0);
    const buttonOpacity = new Animated.Value(0);
    const imageTranslateY = new Animated.Value(100);


    const handleLogin = () => {
        // Replace these credentials with your actual admin login information
        const adminEmail = 'sahan123@gmail.com';
        const adminPassword = 'admin123';

        if (email === adminEmail && password === adminPassword) {
            // Successful login
            setError('');
            // navigation.navigate('AdminHomeScreen');
            navigation.replace('AdminHomeScreen');
        } else {
            // Incorrect login
            setError('Incorrect email or password. Please try again.');
        }
    };


    useEffect(() => {
        // Update the disabled state based on the input values
        setIsButtonDisabled(!(email.trim() && password.trim()));

    }, [email, password]);


    useEffect(() => {
        if (!animationPlayed) {
            // Add entrance animation only if it hasn't been played yet
            Animated.parallel([
                Animated.timing(imageOpacity, {
                    toValue: 1,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: true,
                }),
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: true,
                }),
                Animated.timing(imageTranslateY, {
                    toValue: 0,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: true,
                }),
            ]).start(() => setAnimationPlayed(true)); // Mark animation as played
        }
    }, [animationPlayed]);

    return (
        <View style={styles.container}>
            <Animated.Image source={require("../assets/images/userImage.jpeg")}

                            style={[
                                styles.adminImage,
                                {
                                    opacity: imageOpacity,
                                    transform: [{ translateY: imageTranslateY }],
                                },
                            ]}

            />
            <Title style={styles.title}>Admin Login</Title>
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                mode="outlined"
                style={styles.input}
            />
            <Text style={styles.errorText}>{error}</Text>
            <Animated.View   style={{
                opacity: buttonOpacity,
                transform: [{ translateY: buttonOpacity }],
                // borderColor:"red",
                // borderStyle:"solid",
                // borderWidth:1,
                width: '100%',
                alignItems: 'center',  // Center horizontally
                justifyContent: 'center',  // Center vertically
            }}>
            <Button
                mode="contained"
                onPress={handleLogin}
                style={[styles.loginButton, isButtonDisabled && styles.disabledButton,]}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                disabled={isButtonDisabled}
            >
                Login
            </Button>
            </Animated.View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adminImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    loginButton: {
        width: '80%',
        backgroundColor: colors.loginButton,
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    buttonContent: {
        padding: 10,
    },
    buttonLabel: {
        fontSize: 16,
    },
});





export default AdminScreen;
