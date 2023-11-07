import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const UserActionButton = ({ initialText, initialBackgroundColor, textColor, onPress }) => {
    const [text, setText] = useState(initialText || 'Click Me');
    const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor || 'blue');

    const handleButtonClick = () => {
        // Toggle button text and background color
        if (text === initialText) {
            setText('Clicked');
            setBackgroundColor('red');
        } else {
            setText(initialText || 'Click Me');
            setBackgroundColor(initialBackgroundColor || 'blue');
        }

        // Invoke the onPress callback function when the button is clicked
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            onPress={handleButtonClick}
        >
            <Text style={[styles.buttonText, { color: textColor || 'white' }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserActionButton;
