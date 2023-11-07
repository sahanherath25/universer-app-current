import React, {useRef, useState,useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    ImageBackground,
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import colors from "../constants/colors";
import {Dimensions} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {LinearGradient} from "expo-linear-gradient";
import StartPageContainer from "../components/StartPageContainer";


const AuthScreen = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Animation configuration
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const formScale = useRef(new Animated.Value(1)).current;
    const [isSignUp, setSignUp] = useState(false);

    console.log("PROPS ", props.navigation)

    // const handleFormClick = () => {
    //     Animated.timing(formScale, {
    //         toValue: 0.9,
    //         duration: 200,
    //         useNativeDriver: true,
    //     }).start(() => {
    //         // Reset the form scale after animation completion
    //         Animated.timing(formScale, {
    //             toValue: 1,
    //             duration: 200,
    //             useNativeDriver: true,
    //         }).start();
    //     });
    // };


    return (

            <PageContainer>
                    <ScrollView>
                        <KeyboardAvoidingView
                            style={styles.keyboardAvoidingView}
                            behavior={Platform.OS === "ios" ? "height" : undefined}
                            keyboardVerticalOffset={100}
                        >

                            <Animated.View style={[styles.imageContainer, {opacity: fadeAnim}]}>
                            {/*<View style={styles.imageContainer}>*/}
                            {/*    <Image style={styles.image} source={require("../assets/images/campusLogo.png")}/>*/}
                                <Image style={styles.image} source={require("../assets/images/app_logos/logo1.png")}/>
                            {/*</View>*/}
                            </Animated.View>

                            {
                                isSignUp ?
                                    <SignUpForm/> :
                                    <SignInForm/>
                            }
                            <TouchableOpacity
                                onPress={() => setSignUp(prevState => !prevState)}
                                style={styles.linkContainer}>

                                <Text style={styles.link}>{`Switch to ${isSignUp ? "Login" : "Sign Up"}`}</Text>

                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("ResetPasswordScreen")}
                                style={styles.linkContainer}>
                                <Text style={styles.link}>{`Reset Password`}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("AdminPanel")}
                                style={styles.linkContainer}>
                                <Text style={styles.link}>{`Log As Admin`}</Text>
                            </TouchableOpacity>

                            {/*<TouchableOpacity*/}
                            {/*    onPress={() => props.navigation.navigate("AnimatedLoginScreen")}*/}
                            {/*    style={styles.linkContainer}>*/}
                            {/*    <Text style={styles.link}>{`Animated Login`}</Text>*/}
                            {/*</TouchableOpacity>*/}

                        </KeyboardAvoidingView>

                    </ScrollView>

            </PageContainer>

    )

};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    linkContainer: {

        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15
    },
    link: {
        color: colors.darKTextColor,
        fontFamily: "montserratMedium",
        letterSpacing: 0.3
    },
    // imageContainer: {
    //     // borderColor:"black",
    //     // borderStyle:"solid",
    //     // borderWidth:2,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    imageContainer: {
        // borderColor: "black",
        // borderStyle: "solid",
        // borderWidth: 1,
        marginTop: 30,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",

    },
    image: {
        width: "50%",
        resizeMode: "contain"
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: "center",
    }
})

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 40,
//     },
//     keyboardAvoidingView: {
//         flex: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//         width: '100%',
//     },
//     imageContainer: {
//         alignItems: 'center',
//         marginBottom: 30,
//     },
//     image: {
//         width: Dimensions.get('window').width * 0.5,
//         height: Dimensions.get('window').width * 0.5,
//         resizeMode: 'contain',
//     },
//     linkContainer: {
//         marginVertical: 15,
//         alignItems: 'center',
//     },
//     link: {
//         color: colors.blue,
//         fontFamily: 'montserratMedium',
//         letterSpacing: 0.3,
//         fontSize: 16,
//     },
// });

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 40,
//     },
//     keyboardAvoidingView: {
//         flex: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//         width: '100%',
//     },
//     formContainer: {
//         alignItems: 'center',
//     },
//     imageContainer: {
//         alignItems: 'center',
//         marginBottom: 30,
//     },
//     image: {
//         width: Dimensions.get('window').width * 0.5,
//         height: Dimensions.get('window').width * 0.5,
//         resizeMode: 'contain',
//     },
//     linkContainer: {
//         marginVertical: 15,
//         alignItems: 'center',
//     },
//     link: {
//         color: colors.blue,
//         fontFamily: 'montserratMedium',
//         letterSpacing: 0.3,
//         fontSize: 16,
//     },
// });
//


export default AuthScreen;
// export default AuthStackNavigator;