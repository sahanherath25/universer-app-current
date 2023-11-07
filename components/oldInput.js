import {View, StyleSheet, Text, TextInput} from "react-native";
import colors from "../constants/colors";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {useState} from "react";

const Input = (props) => {

    const [value, setValue] = useState(props.initialValue);
    console.log(value);

    const onChangeText = (text) => {
        setValue(text)
        props.onInputChange(props.id, text)
    }

    return (

        <View style={{...styles.container}}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputContainer}>
                {
                    props.icon && < props.iconPack
                        name={props.icon}
                        style={styles.icon}
                        size={props.iconSize || 15} color="black"/>
                }

                <TextInput
                    {...props}
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>

            {
                //If there is error then display content
                props.errorText &&
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText[0]}</Text>
                </View>
            }

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        // marginVertical:10,
        marginVertical: 5,
        fontFamily: "bold",
        letterSpacing: 0.3,
        color: colors.textColor,
    },
    inputContainer: {
        width: "100%",
        // backgroundColor: colors.closeWhite,
        backgroundColor: "white",
        // paddingHorizontal:10,
        paddingHorizontal: 5,
        paddingVertical: 8,
        // paddingVertical:15,
        borderRadius: 2,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        // marginBottom: 16,
        borderWidth: 1,
        // paddingHorizontal: 16,
    },
    icon: {
        marginRight: 10,
        color: colors.grey,
    },
    input: {
        color: colors.textColor,
        flex: 1,
        fontFamily: "regular",
        padding: 0,

    },
    errorContainer: {
        marginVertical: 5,
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background color
    },
    errorText: {
        color: "red",
        fontSize: 14,
        fontFamily: "regular",
        letterSpacing: 0.3,
        borderWidth: 1,
        borderColor: 'red',
        padding: 5,
    }

})

export default Input;