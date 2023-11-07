import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PostCommentButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Post Comment</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50', // Green background
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    buttonText: {
        color: 'white', // White text color
        fontSize: 16,
    },
});

export default PostCommentButton;
