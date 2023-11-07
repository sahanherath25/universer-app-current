import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommentsSection = () => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentClick = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = () => {
        if (newComment) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleCommentClick}>
                <View style={styles.button}>
                    <Icon name="comment-o" style={styles.icon} />
                    <Text style={styles.buttonText}>View Comments</Text>
                </View>
            </TouchableOpacity>
            {showComments && (
                <View style={styles.commentContainer}>
                    {comments.map((comment, index) => (
                        <Text key={index} style={styles.commentText}>
                            {comment}
                        </Text>
                    ))}
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        value={newComment}
                        onChangeText={(text) => setNewComment(text)}
                        onSubmitEditing={handleAddComment}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3498db',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        color: '#fff',
        fontSize: 20,
        marginRight: 10,
    },
    commentContainer: {
        marginTop: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        padding: 10,
        width: '100%',
    },
    commentText: {
        fontSize: 16,
        marginBottom: 10,
    },
    commentInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 10,
    },
});

export default CommentsSection;
