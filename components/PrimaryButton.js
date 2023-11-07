import React, { useState } from 'react';
import { TouchableOpacity, Animated, Text } from 'react-native';

const PrimaryButton = ({ text, textColor, onPress }) => {
    const [animation] = useState(new Animated.Value(1));

    const handlePress = () => {
        Animated.spring(animation, {
            toValue: 0.8, // Scale down to 80%
            useNativeDriver: true,
        }).start();
    };

    const handleRelease = () => {
        Animated.spring(animation, {
            toValue: 1, // Scale back to 100%
            friction: 3, // Adjust the friction to control the spring effect
            tension: 40, // Adjust the tension to control the spring effect
            useNativeDriver: true,
        }).start();
        onPress(); // Call the onPress function passed as prop
    };

    const animatedStyle = {
        transform: [{ scale: animation }],
    };

    return (
        <TouchableOpacity
            onPressIn={handlePress}
            onPressOut={handleRelease}
            activeOpacity={0.8}
            style={{
                backgroundColor: '#0C134F',
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 35,
                marginHorizontal: 20,
                marginVertical: 10,
                borderWidth: 1,
                borderColor: 'white',
            }}
        >
            <Animated.Text style={[{ color: textColor }, animatedStyle]}>{text}</Animated.Text>
        </TouchableOpacity>
    );
};

export default PrimaryButton;
