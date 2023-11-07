import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Platform } from 'react-native';

const BeautifulInput = () => {
    const [inputValue, setInputValue] = useState('');
    const labelPosition = new Animated.Value(inputValue ? -18 : 10);
    const labelFontSize = new Animated.Value(inputValue ? 12 : 16);
    const labelColor = new Animated.Value(inputValue ? 1 : 0);

    const handleFocus = () => {
        Animated.parallel([
            Animated.timing(labelPosition, {
                toValue: -18,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(labelFontSize, {
                toValue: 12,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(labelColor, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const handleBlur = () => {
        if (!inputValue) {
            Animated.parallel([
                Animated.timing(labelPosition, {
                    toValue: 10,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(labelFontSize, {
                    toValue: 16,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(labelColor, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    };

    const shadowStyle = Platform.select({
        ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        android: {
            elevation: 4,
        },
    });

    return (
        <View style={[styles.inputContainer, shadowStyle]}>
            <TextInput
                style={styles.inputField}
                value={inputValue}
                onChangeText={setInputValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <Animated.Text
                style={[
                    styles.inputLabel,
                    {
                        transform: [{ translateY: labelPosition }],
                        fontSize: labelFontSize,
                        color: labelColor.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['#999', '#e74c3c'],
                        }),
                    },
                ]}
            >
                Your Name
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        width: 300,
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    inputField: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#3498db',
        backgroundColor: 'transparent',
        color: '#333',
        fontSize: 16,
    },
    inputLabel: {
        position: 'absolute',
        left: 10,
    },
});

export default BeautifulInput;
