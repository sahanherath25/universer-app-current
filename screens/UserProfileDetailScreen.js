import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const UserProfileDetailScreen = ( ) => {

    const route = useRoute();
    const currentUserId = route.params.userId;

    return (
        <View style={styles.container}>
            {/*<Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />*/}
            <View style={styles.profileInfo}>
                <Text style={styles.userName}>{currentUserId}</Text>
                {/*<Text style={styles.faculty}>Faculty: {user.faculty}</Text>*/}
                {/*<Text style={styles.followers}>Followers: {user.followers}</Text>*/}
            </View>
            <Text style={styles.photoHeader}>Uploaded Photos</Text>
            {/*<FlatList*/}
            {/*    data={user.photos}*/}
            {/*    keyExtractor={(item) => item.id.toString()}*/}
            {/*    numColumns={3} // Adjust the number of columns as needed*/}
            {/*    renderItem={({ item }) => (*/}
            {/*        <Image source={{ uri: item.photoUrl }} style={styles.photo} />*/}
            {/*    )}*/}
            {/*/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    profileInfo: {
        padding: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    faculty: {
        fontSize: 16,
    },
    followers: {
        fontSize: 16,
    },
    photoHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16,
    },
    photo: {
        width: 120,
        height: 120,
        margin: 4,
    },
});

export default UserProfileDetailScreen;
