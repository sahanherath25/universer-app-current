import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Animated, Platform} from 'react-native';
import colors from "../constants/colors";

const Input = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState(props.initialValue);
    const labelPosition = new Animated.Value(inputValue ? -18 : 10);
    const labelFontSize = new Animated.Value(inputValue ? 12 : 16);
    const labelColor = new Animated.Value(inputValue ? 1 : 0);
    const [isFocused, setIsFocused] = useState(false);

    const onChangeText = (text) => {
        setValue(text)
        props.onInputChange(props.id, text)
    }

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
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        android: {
            elevation: 4,
        },
    });


    return (

        <View style={{...styles.container}}>

            <View style={[styles.inputContainer, shadowStyle]}>
                {/*<Text style={styles.label}>{props.label}</Text>*/}
                {
                    props.icon && < props.iconPack
                        name={props.icon}
                        style={styles.icon}
                        size={props.iconSize || 15} color="black"/>
                }

                <TextInput
                    {...props}
                    style={styles.inputField}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    // placeholder={props.label}
                />
                <Animated.Text
                    style={[
                        styles.inputLabel,
                        {
                            transform: [{translateY: labelPosition}],
                            fontSize: labelFontSize,
                            color: labelColor.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['#999', '#e74c3c'],
                            }),
                        },
                    ]}
                >

                </Animated.Text>

            </View>

            {
                //If there is error then display content
                props.errorText &&
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText[0]}</Text>
                </View>
            }



        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        width: "100%",
    }
    ,
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: 300,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    icon: {
        marginLeft:5,
        marginRight: 15,
        color: colors.grey,
    }
    ,
    inputField: {
        width: '100%',
        // padding: 10,
        // borderBottomWidth: 2,
        backgroundColor: 'transparent',
        // color: '#333',
        fontSize: 16,
        color: colors.textColor,
        flex: 1,
        fontFamily: "regular",
        padding: 10,
    },
    inputLabel: {
        position:"absolute",
        left: 40,
        top:5,
    },
    errorContainer: {
        marginTop:0,
        marginLeft: 5,
        // backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background color
    },
    errorText: {
        color: "red",
        fontSize: 14,
        fontFamily: "regular",
        letterSpacing: 0.3,
        // borderWidth: 1,
        // borderColor: 'red',
        padding: 5,
    }
});

export default Input;
