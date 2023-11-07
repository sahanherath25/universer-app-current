import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserActionButton from "./UserActionButton";
import {LinearGradient} from "expo-linear-gradient";


const UserDetailCard = ({ user }) => {
    const navigation = useNavigation();

    const handleViewPosts = () => {
        // Navigate to the user's posts screen and pass the user's ID as a parameter
        // navigation.navigate('UserPosts', { userId: user.id });
    };

    return (
        <LinearGradient // Wrap your content with LinearGradient
            colors={['#393646', '#393646']} // Specify your gradient colors
            style={styles.card}
        >
            <Text style={styles.name}>Name: {user.firstName} {user.lastName}</Text>
            <Text style={styles.email}>Email: {user.email}</Text>
            <Text style={styles.faculty}>Faculty: {user.faculty}</Text>
            <Text style={styles.password}>Password: {user.index}</Text>
            <UserActionButton initialBackgroundColor={"#393646"} initialText={"View User Posts"} />
            <UserActionButton initialBackgroundColor={"#900C3F"} initialText={"Reported Posts"} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },
    email: {
        fontSize: 16,
        marginBottom: 5,
        color:"#fff"
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color:"#fff"
    },
    faculty: {
        fontSize: 16,
        marginBottom: 5,
        color:"#fff"
    },
    password: {
        fontSize: 16,
        color:"#fff"
    },
});

export default UserDetailCard;
