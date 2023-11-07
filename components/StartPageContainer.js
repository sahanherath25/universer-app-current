import {View, StyleSheet, ImageBackground, Image, Animated} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useEffect, useRef} from "react";


const StartPageContainer = (props) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animation configuration
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (

        <LinearGradient colors={["#000000", "#7A176A"]}
                        style={styles.background}>
            <ImageBackground style={styles.bgImage} source={require("../assets/images/logo-background.jpg")}
                             resizeMode={"cover"}
                             imageStyle={styles.innerImage}
            >

                <View style={styles.overlay}>
                    <Animated.View style={[styles.imageContainer, {opacity: fadeAnim}]}>
                        <Image style={styles.image} source={require("../assets/images/campusLogo.png")}/>
                    </Animated.View>

                    {/*<View style={styles.imageContainer}>*/}
                    {/*    <Image style={styles.image} source={require("../assets/images/campusLogo.png")}/>*/}
                    {/*</View>*/}

                    <View style={{...styles.container, ...props.style}}>
                        {props.children}
                    </View>
                </View>
            </ImageBackground>
        </LinearGradient>

    )

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        marginTop: 50,
    },
    bgImage: {
        flex: 1
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the opacity and color as desired
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        backgroundColor: "white",
        // borderRadius: 25,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    imageContainer: {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "50%",
        resizeMode: "contain"
    },

    innerImage: {
        opacity: 0.5
    }


})

export default StartPageContainer;