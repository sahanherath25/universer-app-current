import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommentButton = (props) => (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Icon name='comment-o' style={styles.icon} />
        <Text style={styles.label}>{props.content}</Text>
    </TouchableOpacity>
);

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
        color: '#3498db',
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default CommentButton;
