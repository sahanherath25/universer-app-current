import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Animated, Easing } from "react-native";
import colors from "../constants/colors";

const SubmitButton = (props) => {
    const [scaleValue] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            friction: 3,
            tension: 80,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 80,
            useNativeDriver: true,
        }).start();
        props.onPress(); // Call the original onPress function
    };

    const enabledBgColor = props.color || colors.loginButton;
    const disabledBgColor = colors.lightGrey;
    const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...props.style,
                backgroundColor: bgColor,
            }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={props.disabled}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Text
                    style={{
                        ...styles.buttonText,
                        color: props.disabled ? colors.textColor : "white",
                    }}
                >
                    {props.title}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 30,
        paddingVertical: 15, // Increased padding for better touch area
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default SubmitButton;
