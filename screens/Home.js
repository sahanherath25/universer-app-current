import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";


const Home=()=>{

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Hi There !! </Text>
            <StatusBar style="auto"/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: 'black',
        fontSize: 18,
        fontFamily: "black"
    }
});

export  default Home;