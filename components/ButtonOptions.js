import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const ButtonOption = () => {
    const [showOptions, setShowOptions] = useState(false);

    const handlePress = () => {
        setShowOptions(!showOptions);
    };

    const handleOptionPress = (option) => {
        console.log(`Selected option: ${option}`);
        setShowOptions(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <AntDesign name="like1" size={24} color="black" />
            </TouchableOpacity>
            {showOptions && (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleOptionPress('Like')}
                    >
                        <AntDesign name="like1" size={20} color="#555" />
                        <Text style={styles.optionLabel}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleOptionPress('Heart')}
                    >
                        <FontAwesome name="heart" size={20} color="#555" />
                        <Text style={styles.optionLabel}>Heart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleOptionPress('Wow')}
                    >
                        <FontAwesome name="star" size={20} color="#555" />
                        <Text style={styles.optionLabel}>Wow</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    optionLabel: {
        fontSize: 16,
        color: '#555',
    },
});

export default ButtonOption;
