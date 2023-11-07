import React, { useState } from 'react';
import { TouchableOpacity, Text, Animated, Easing } from 'react-native';

const BeautifulSubmitButton = (props) => {
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

    const enabledBgColor = props.color || '#3498db';
    const disabledBgColor = '#ccc';
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
            disabled={props.disabled}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Text
                    style={{
                        color: props.disabled ? '#888' : 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                    {props.title}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = {
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
};

export default BeautifulSubmitButton;
