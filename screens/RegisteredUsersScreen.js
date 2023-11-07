import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, FlatList, StyleSheet, View, TextInput } from 'react-native';
import UserDetailCard from "../components/UserDetailCard";

const RegisteredUsersScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, []);

    // Dummy data for testing
    const userData = [
        {
            user: {
                email: 'sahan234@example.com',
                firstName: 'Sahan',
                lastName: 'Herath',
                faculty: 'IT',
                index: 'IT2019178',
            },
        },
        {
            user: {
                email: 'user2@example.com',
                firstName: 'Manoj',
                lastName: 'Thushara',
                faculty: 'Science',
                index: 'IT2019240',
            },
        },
        {
            user: {
                email: 'user2@example.com',
                firstName: 'Kelly',
                lastName: 'Vitz',
                faculty: 'Science',
                index: '********',
            },
        },
        {
            user: {
                email: 'user2@example.com',
                firstName: 'Lahiru',
                lastName: 'Kumara',
                faculty: 'Science',
                index: '********',
            },
        },
        {
            user: {
                email: 'user2@example.com',
                firstName: 'Jane',
                lastName: 'Smith',
                faculty: 'Science',
                index: '********',
            },
        },
        {
            user: {
                email: 'user1@example.com',
                firstName: 'John',
                lastName: 'Doe',
                faculty: 'Engineering',
                index: 'password1',
            },
        },
        {
            user: {
                email: 'user2@example.com',
                firstName: 'Jane',
                lastName: 'Smith',
                faculty: 'Science',
                index: 'password2',
            },
        },
        {
            user: {
                email: 'user3@example.com',
                firstName: 'Michael',
                lastName: 'Johnson',
                faculty: 'Arts',
                index: 'password3',
            },
        },
        {
            user: {
                email: 'user50@example.com',
                firstName: 'Emily',
                lastName: 'Williams',
                faculty: 'Business',
                index: 'password50',
            },
        },
        {
            user: {
                email: 'user1@example.com',
                firstName: 'John',
                lastName: 'Doe',
                faculty: 'Engineering',
                index: 'password1',
            },
        },
        {
            user: {
                email: 'user2@example.com',
                firstName: 'Jane',
                lastName: 'Smith',
                faculty: 'Science',
                index: 'password2',
            },
        },
        {
            user: {
                email: 'user3@example.com',
                firstName: 'Michael',
                lastName: 'Johnson',
                faculty: 'Arts',
                index: 'password3',
            },
        },
        {
            user: {
                email: 'user50@example.com',
                firstName: 'Emily',
                lastName: 'Williams',
                faculty: 'Business',
                index: 'password50',
            },
        },
        {
            user: {
                email: 'user51@example.com',
                firstName: 'Aiden',
                lastName: 'Brown',
                faculty: 'Engineering',
                index: 'password51',
            },
        },
        {
            user: {
                email: 'user52@example.com',
                firstName: 'Olivia',
                lastName: 'Davis',
                faculty: 'Science',
                index: 'password52',
            },
        },
        {
            user: {
                email: 'user53@example.com',
                firstName: 'Ethan',
                lastName: 'Miller',
                faculty: 'Arts',
                index: 'password53',
            },
        },
        {
            user: {
                email: 'user70@example.com',
                firstName: 'Sophia',
                lastName: 'Anderson',
                faculty: 'Business',
                index: 'password70',
            },
        },

    ];

    useEffect(() => {
        // Filter the data based on the search query
        const filteredUsers = userData.filter(user => {
            const fullName = `${user.user.firstName} ${user.user.lastName}`.toLowerCase();
            return fullName.includes(searchQuery.toLowerCase());
        });

        setFilteredData(filteredUsers);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search by user name"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                            }}
                        >
                            <UserDetailCard user={item.user} />
                        </Animated.View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 20,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,            // Add a border
        borderColor: '#ccc',      // Border color
        fontSize: 16,             // Text size
        height: 40,               // Input height
    },
});

export default RegisteredUsersScreen;
