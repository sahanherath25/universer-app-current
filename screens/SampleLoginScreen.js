// import React from "react";
// import {ImageBackground, StyleSheet, Text, View} from "react-native";
import colors from "../constants/colors";

// const SampleLoginScreen = () => {
//
//     return (
//         <ImageBackground source={require("../assets/images/chatWallpaper.jpg")} style={styles.backgroundImage} resizeMode={"cover"}>
//             <View style={styles.container}>
//                 <Text style={styles.heading}>Lets Start</Text>
//                 <Text style={styles.heading}>Coding</Text>
//             </View>
//         </ImageBackground>
//     )
//
// }

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
// import { IconButton } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const SampleLoginScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [firstNameBorderColor, setFirstNameBorderColor] = useState(new Animated.Value(0));
    const [lastNameBorderColor, setLastNameBorderColor] = useState(new Animated.Value(0));
    const [emailBorderColor, setEmailBorderColor] = useState(new Animated.Value(0));

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleInputChange = (value, setter) => {
        setter(value);
    };

    const validateForm = () => {
        let isValid = true;

        if (!firstName) {
            setFirstNameError('Please enter your first name');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (!lastName) {
            setLastNameError('Please enter your last name');
            isValid = false;
        } else {
            setLastNameError('');
        }

        if (!email) {
            setEmailError('Please enter your email');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email');
            isValid = false;
        } else {
            setEmailError('');
        }

        return isValid;
    };

    const handleFormSubmit = () => {
        if (validateForm()) {
            // Proceed with form submission
        }
    };

    const handleInputFocus = (borderColorSetter) => {
        Animated.timing(borderColorSetter, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleInputBlur = (borderColorSetter) => {
        Animated.timing(borderColorSetter, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const firstNameBorderColorStyle = {
        borderColor: firstNameBorderColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['#cccccc', '#00bfa5'],
        }),
    };

    const lastNameBorderColorStyle = {
        borderColor: lastNameBorderColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['#cccccc', '#00bfa5'],
        }),
    };

    const emailBorderColorStyle = {
        borderColor: emailBorderColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['#cccccc', '#00bfa5'],
        }),
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>

            <Animated.View style={[styles.inputContainer, firstNameBorderColorStyle]}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    // onChangeText={(value) => handleInputChange(value, setFirstName)}
                    // onFocus={() => handleInputFocus(setFirstNameBorderColor)}
                    onBlur={() => handleInputBlur(setFirstNameBorderColor)}
                />
                {firstNameError ? <Text style={styles.error}>{firstNameError}</Text> : null}
            </Animated.View>

            <Animated.View style={[styles.inputContainer, lastNameBorderColorStyle]}>
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    // onChangeText={(value) => handleInputChange(value, setLastName)}
                    // onFocus={() => handleInputFocus(setLastNameBorderColor)}
                    onBlur={() => handleInputBlur(setLastNameBorderColor)}
                />
                {lastNameError ? <Text style={styles.error}>{lastNameError}</Text> : null}
            </Animated.View>

            <Animated.View style={[styles.inputContainer, emailBorderColorStyle]}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(value) => handleInputChange(value, setEmail)}
                    // onFocus={() => handleInputFocus(setEmailBorderColor)}
                    onBlur={() => handleInputBlur(setEmailBorderColor)}
                />
                {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            </Animated.View>

            <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    input: {
        height: 40,
    },
    error: {
        color: 'red',
        marginTop: 4,
    },
    button: {
        backgroundColor: '#00bfa5',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

// export default FormScreen;




export default SampleLoginScreen;