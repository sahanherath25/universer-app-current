import {View, Dimensions, StyleSheet, Text, TextInput, KeyboardAvoidingView, Alert} from "react-native";
import Svg, {Image} from "react-native-svg";
import React, {useState} from "react";
import PrimaryButton from "../components/PrimaryButton";
import FormInput from "../components/FormInput";
import {Feather} from "@expo/vector-icons";
import {useCallback, useReducer} from "react";
import {validateInput} from "../utils/actions/FormActions";
import {reducer} from "../utils/reducers/formReducer";
// import Animated from "react-native-reanimated";


import FormButton from "../components/FormButton";

const {height, width} = Dimensions.get("window");

const AnimatedLoginScreen = () => {

    const [inputFocused, setInputFocused] = useState(false);


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.container}>

                <View style={StyleSheet.absoluteFillObject}>

                    <Svg width={width} height={height}>
                        <Image
                            width={width}
                            height={height}
                            href={require("../assets/images/logo-background.jpg")}
                            preserveAspectRatio={"xMidYMid slice"}
                        />
                    </Svg>
                    <View style={styles.closeButtonContainer}>
                        <Text>X</Text>
                    </View>

                </View>


                <View style={styles.buttonContainer}>

                    <PrimaryButton text={"Login"} textColor={"white"}/>
                    <PrimaryButton text={"SignUp"} textColor={"white"}/>


                    {/*<View style={styles.formInputContainer}>*/}
                    {/*    <TextInput*/}
                    {/*        placeholderTextColor={"black"}*/}
                    {/*        placeholder={"Email"}*/}
                    {/*        style={styles.textInput}*/}
                    {/*        onFocus={() => setInputFocused(true)}*/}
                    {/*        onBlur={() => setInputFocused(false)}*/}

                    {/*    />*/}


                    {/*    <TextInput placeholderTextColor={"black"} placeholder={"Name"} style={styles.textInput}/>*/}
                    {/*    <TextInput placeholderTextColor={"black"} placeholder={"Password"} style={styles.textInput}/>*/}
                    {/*    <FormButton text={"Register"} textColor={"white"}*/}
                    {/*                onPress={() => Alert.alert("Person Register")}/>*/}
                    {/*</View>*/}


                </View>


                {/* Add other components or overlays as needed */}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    button: {
        backgroundColor: "#0C134F",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "white",

    },
    buttonContainer: {
        justifyContent: "center",
        height: height / 3,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.2)",
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 25,
        paddingLeft: 10,
    },
    formInputContainer: {
        marginBottom: 10,
    },
    closeButtonContainer: {

        width: 40,
        height: 40,
        justifyContent: "center",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: "White",
        alignItems: "center",
        borderRadius: 20,

    }
});

export default AnimatedLoginScreen;
