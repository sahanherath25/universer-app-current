import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from "../constants/colors"; // Replace Feather with the desired icon set





const DeleteButton = ({ onPress,currentPost }) => {

    // console.log(currentPost)

    return (
        <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
            <Feather name="trash-2" size={24} color="#fff" />
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: colors.deleteButton, // Red color for Delete button
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default DeleteButton;
