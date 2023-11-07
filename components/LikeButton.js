
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../constants/colors";

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <TouchableOpacity onPress={handleLike}>
            <View style={styles.container}>
                <Icon name={liked ? 'heart' : 'heart-o'} style={styles.icon} />
                <Text style={styles.label}>{liked ? 'Liked' : 'Like'}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
    },
    icon: {
        fontSize: 20,
        color: colors.twitterPrimary,
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default LikeButton;
