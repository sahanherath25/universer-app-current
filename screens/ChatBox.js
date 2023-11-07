import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Chatbox = () => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        // Handle sending the message
        console.log('Sending message:', message);
        setMessage('');
    };

    return (
        <View style={styles.container}>
            {/* Chatbox messages */}
            {/* ... */}

            {/* Text input */}
            <TextInput
                style={styles.textInput}
                placeholder="Type your message"
                value={message}
                onChangeText={setMessage}
            />

            {/* Send button */}
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                {/* Custom send button styles */}
                {/* ... */}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F5F5F5',
    },
    textInput: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    sendButton: {
        height: 40,
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Chatbox;
