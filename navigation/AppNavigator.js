import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import SettingsScreen from "../screens/SettingsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import ChatListScreen from "../screens/ChatListScreen";
import {Ionicons} from "@expo/vector-icons";
import MainNavigator from "./MainNavigator";
import AuthScreen from "../screens/AuthScreen";
import {useSelector} from "react-redux";
import StartUpScreen from "../screens/StartUpScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import {SafeAreaView, StyleSheet} from "react-native";
import AnimatedLoginScreen from "../screens/AnimatedLoginScreen";
import SampleLoginScreen from "../screens/SampleLoginScreen";
import FormScreen from "../screens/SampleLoginScreen";
import ResetPasswordScreenTest from "../screens/PasswordRestScreenTest";
import AdminScreen from "../screens/AdminScreen";
import AdminHomeScreen from "../screens/AdminHomeScreen";


const Stack = createStackNavigator();

const AppNavigator = (props) => {


    //getting the user status,
    const isAuth = useSelector(state => state.auth.token !== null && state.auth.token !== "");

    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    const stackScreenOptions = {
        headerStyle: {
            backgroundColor: 'transparent', // Set the header background color to transparent
        },
        headerTintColor: 'black', // Set the header text color
    };


    return (

            <NavigationContainer>
                {isAuth && <MainNavigator />}

                {!isAuth && didTryAutoLogin && (
                    <Stack.Navigator  screenOptions={stackScreenOptions}>
                        <Stack.Screen name="AuthScreen" component={AuthScreen} options={
                            { headerShown: false,
                                headerTransparent: true, // Make the header transparent
                                headerStyle: {
                                    backgroundColor: 'red', // Set the header background color to transparent
                                },
                                title: 'Welcome', // Set an empty title

                            }

                        } />
                        <Stack.Screen
                            name="ResetPasswordScreen"
                            component={ResetPasswordScreenTest}
                            options={
                            {

                                title:"",
                                headerStyle:{
                                    backgroundColor:"transparent",

                                },
                                contentStyle: { flex: 1 },
                            }
                        }

                        />

                        <Stack.Screen
                            name="AdminPanel"
                            component={AdminScreen}
                            options={
                                {

                                    title:"",
                                    headerStyle:{
                                        backgroundColor:"transparent",

                                    },
                                    contentStyle: { flex: 1 },
                                }
                            }

                        />

                        <Stack.Screen
                            name="AdminHomeScreen"
                            component={AdminHomeScreen}
                            options={
                                {

                                    title:"",
                                    headerStyle:{
                                        backgroundColor:"transparent",

                                    },
                                    contentStyle: { flex: 1 },
                                }
                            }

                        />



                    </Stack.Navigator>
                )}

                {!isAuth && !didTryAutoLogin && <StartUpScreen />}
            </NavigationContainer>

    );
};




export default AppNavigator;