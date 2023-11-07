import React from "react";
import {StyleSheet, Text, View} from "react-native";

// Import your AdminHome screen components here

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import AdminHome from "./AdminOverviewScreen";
import RegisteredUsersScreen from "./RegisteredUsersScreen";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AdminHomeScreen = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={AdminHome}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="Users"
                    component={RegisteredUsersScreen}
                    options={
                        {
                            tabBarLabel: "News Feed",
                            headerTitle: "All Users",
                            headerTitleAlign: "center",
                            //Getting icon for bottom tab navigator
                            tabBarIcon: () => {
                                return <Ionicons name="md-newspaper-sharp" size={24} color="black"/>
                            }

                        }
                    }
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create(
    {
        mainWrapper: {}
    }
)

export default AdminHomeScreen;