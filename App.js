import {StatusBar} from 'expo-status-bar';
import 'react-native-gesture-handler';
import {SafeAreaView, SafeAreaViewComponent, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';
import SettingsScreen from "./screens/SettingsScreen";
import ChatListScreen from "./screens/ChatListScreen";
import {Ionicons} from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import AppNavigator from "./navigation/AppNavigator";
import {Provider} from "react-redux";

import {store} from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MenuProvider} from "react-native-popup-menu";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

const Stack = createStackNavigator();

// AsyncStorage.clear()

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [appIsLoaded, setAppIsLoaded] = useState(false);


    useEffect(() => {

        const prepare = async () => {

            try {
                await Font.loadAsync({

                    "bold": require("./assets/fonts/Roboto-Bold.ttf"),
                    "medium": require("./assets/fonts/Roboto-Medium.ttf"),
                    "regular": require("./assets/fonts/RobotoSlab-Regular.ttf"),
                    "boldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
                    "montserrat": require("./assets/fonts/Montserrat-Black.ttf"),
                    "montserratRegular": require("./assets/fonts/Montserrat-Regular.ttf"),
                    "montserratBold": require("./assets/fonts/Montserrat-Bold.ttf"),
                    "montserratMedium": require("./assets/fonts/Montserrat-Medium.ttf"),
                    "montserratThin": require("./assets/fonts/Montserrat-Thin.ttf"),
                    "oswaldRegular": require("./assets/fonts/Oswald-Regular.ttf"),
                    "oswaldMedium": require("./assets/fonts/Oswald-Medium.ttf"),
                    "oswaldBold": require("./assets/fonts/Oswald-Bold.ttf"),
                    "oswaldLight": require("./assets/fonts/Oswald-Light.ttf"),
                });
            } catch (error) {
                console.log.error();
            } finally {
                setAppIsLoaded(true);
            }
        };

        prepare();

    }, []);


    const onLayout = useCallback(async () => {
        if (appIsLoaded) {
            // console.log("Await for Async () ")
            await SplashScreen.hideAsync();
        }
    }, [appIsLoaded]);

    if (!appIsLoaded) {
        // console.log("App is Not Loaded ")
        return null;
    }


    return (

        <Provider store={store}>
            <SafeAreaProvider style={styles.container} onLayout={onLayout}>
                <MenuProvider>
                    <AppNavigator/>
                </MenuProvider>
            </SafeAreaProvider>
        </Provider>

    );
}

const styles = StyleSheet.create({});
