//TODO Expo notifications
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


import React, {useEffect, useRef, useState} from "react";
import SettingsScreen from "../screens/SettingsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
// import {createStackNavigator} from "@react-navigation/stack";
import ChatListScreen from "../screens/ChatListScreen";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import NewChatScreen from "../screens/NewChatScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useDispatch, useSelector} from "react-redux";
import {getFirebaseApp} from "../utils/firebaseHelper";
import {child, getDatabase, onValue, ref, off, get} from "firebase/database";
import {setChatsData} from "../store/chatSlice";
import {ActivityIndicator, Platform, View} from "react-native";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import {setStoredUsers} from "../store/userSlice";
import {setChatMessages, setStarredMessages} from "../store/messagesSlice";
import ContactScreen from "../screens/ContactScreen";
import ChatSettingsScreen from "../screens/ChatSettingsScreen";
import DataListScreen from "../screens/DataListScreen";
import Feed from "../screens/Feed";
import Profile from "../screens/Profile";
import StudentProfile from "../components/StudentProfile";
import CommentSection from "../components/CommentsSection";
import UploadScreen from "../screens/UploadScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import CommentsScreen from "../screens/CommentsScreen";
import ChatBox from "../screens/ChatBox";
import CommentScreenF from "../screens/CommentScreenF";
import ChatGPTScreen from "../screens/ChatGPTScreen";
import UserAllPosts from "../screens/UserAllPosts";
import ChatGPTChatBotScreen from "../screens/ChatGPTChatBotScreen";
import UserProfileDetailScreen from "../screens/UserProfileDetailScreen";


const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();


const TabNavigator = () => {

    const userData=useSelector(state=>state.auth.userData);

    const screenOptions = {
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle:{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 60,
            background: "red"
        }
    }


    return (
        <Tab.Navigator
            // TODO Screen that shows when the App Loads

            initialRouteName={"Feed"}
            // screenOptions={screenOptions}
            // screenOptions={
            //     {
            //         headerTitle: "",
            //         headerShadowVisible: false,
            //     }
            // }
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',


            })}


        >
            {/*<Tab.Screen name={"UserProfileScreen2"} initialParams={{ userId:userData.userId }} component={UserProfileScreen}*/}
            <Tab.Screen name={"UserProfileScreen2"}  component={UserProfileScreen}
                        options={
                {

                    headerTitle: "My Profile",
                    headerTitleAlign: "center",
                    tabBarLabel: "My Profile",
                    tabBarIcon: () => {
                        return <FontAwesome5 name="user-circle" size={24} color="black"/>
                    }

                }
            }
            />
            <Tab.Screen name={"ChatList"} component={ChatListScreen} options={
                {
                    headerTitle: "My Chats",
                    headerTitleAlign: "center",
                    tabBarLabel: "Chats",
                    tabBarIcon: () => {
                        return <Ionicons name="chatbubble-outline" size={24} color="black"/>
                    }

                }
            }
            />
            <Tab.Screen name={"Feed"}
                        component={Feed}
                        options={
                {
                    tabBarLabel: "News Feed",
                    headerTitle: "News Feed",
                    headerTitleAlign: "center",
                    //Getting icon for bottom tab navigator
                    tabBarIcon: () => {
                        return <Ionicons name="md-newspaper-sharp" size={24} color="black"/>
                    }

                }
            }/>
            <Tab.Screen name={"Settings"} component={SettingsScreen} options={
                {
                    tabBarLabel: "Settings",
                    //Getting icon for bottom tab navigator
                    tabBarIcon: () => {
                        return <Ionicons name="settings-outline" size={24} color="black"/>
                    }
                }
            }/>

            <Tab.Screen name={"ChatGPT"} component={ChatGPTChatBotScreen} options={
                {
                    tabBarLabel: "StudyHelp",
                    headerBackTitle: "Back",
                    headerTitle: "Ask Your Question",
                    headerTitleAlign: "center",
                    //Getting icon for bottom tab navigator
                    tabBarIcon: () => {
                        return <FontAwesome5 name="robot" size={24} color="black" />
                    }
                }
            }/>

        </Tab.Navigator>
    )
}


const StackNavigator = () => {

    const userData=useSelector(state=>state.auth.userData);



    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name={"Home"} component={TabNavigator} options={
                    {
                        headerShown: false
                    }
                }/>
                <Stack.Screen name={"ChatScreen"} component={ChatScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"ChatSettings"} component={SettingsScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"SettingsScreen"} component={ChatSettingsScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerShadowVisible: false,
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"Contact"} component={ContactScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "Contact Info",
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"DataList"} component={DataListScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"CommentsSection"} component={CommentsScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerTitleAlign: "center",
                    }
                }/>
                <Stack.Screen name={"UploadPost"} component={UploadScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"StudentProfile"} component={StudentProfile} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerTitleAlign: "center",
                    }
                }/>
                <Stack.Screen name={"UserInfoDetailScreen"} component={UserProfileDetailScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"ResetPasswordScreen"} component={ResetPasswordScreen} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"Chatbox"} component={ChatBox} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerTitleAlign: "center",
                    }
                }/>

                <Stack.Screen name={"UserAllPosts"} initialParams={{ userId:userData.userId }} component={UserAllPosts} options={
                    {
                        gestureEnabled: true,
                        headerBackTitle: "Back",
                        headerTitle: "",
                        headerTitleAlign: "center",
                    }
                }/>

            </Stack.Group>


            <Stack.Group screenOptions={{presentation: "fullScreenModal"}}>
                <Stack.Screen name={"NewChat"} component={NewChatScreen} options={
                    {
                        headerBackTitle: "Back",
                        headerTitleAlign: "center",
                    }
                }/>

            </Stack.Group>


        </Stack.Navigator>
    )
}


const MainNavigator = () => {


    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const userData = useSelector(state => state.auth.userData);

    const storedUsers = useSelector(state => state.users.storedUsers);

    //TODO Expo Notifications
    const [expoPushToken, setExpoPushToken] = useState('');

    console.log("EXPO TOKEN ",expoPushToken)
    const notificationListener = useRef();
    const responseListener = useRef();


    //TODO Expo Notifications state
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));


        //TODO Listning For Incoming Notifications
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            // TODO When a notification receive Handling It
            // setNotification(notification);
        });

        //TODO When User Clicks the Notification
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Notification Set!!");
            console.log(response);
        });

        //TODO Cleanup executing Runs
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {

        // console.log("Subscribing to Firebase Listeners")

        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));

        const userChatRef = child(dbRef, `userChats/${userData.userId}`)

        const refs = [userChatRef];

        onValue(userChatRef, (querySnapshot) => {
            // console.log("CURRENT CHAT DATA ",querySnapshot.val())
            const chatIdsData = querySnapshot.val() || {};

            const chatIds = Object.values(chatIdsData);

            // console.log("125  CHAT IDS ",chatIds)

            const chatsData = {};
            let chatsFoundCount = 0;

            for (let i = 0; i < chatIds.length; i++) {
                const chatId = chatIds[i];

                const chatRef = child(dbRef, `chats/${chatId}`)
                refs.push(chatRef)

                onValue(chatRef, (chatSnapshot) => {
                    chatsFoundCount++;

                    // console.log("ChatSnapshot ", chatSnapshot.val())
                    const data = chatSnapshot.val();

                    if (!data.users.includes(userData.userId)) {
                        return
                    }

                    if (data) {
                        data.key = chatSnapshot.key;

                        data.users.forEach((userId) => {

                            //Checking if userId is found
                            if (storedUsers[userId]) return;
                            // If not found
                            // We need to add to the state from the Firebase DB

                            const userRef = child(dbRef, `users/${userId}`)
                            get(userRef).then((userSnapshot) => {
                                const userSnapshotData = userSnapshot.val();
                                //    dispatching the action
                                dispatch(setStoredUsers({newUsers: {userSnapshotData}}))
                            })
                            refs.push(userRef);
                        })

                        chatsData[chatSnapshot.key] = data;
                    }


                    if (chatsFoundCount >= chatIds.length) {
                        dispatch(setChatsData({chatsData}))
                        setIsLoading(false)
                    }
                })

                //Getting each user's chat
                const messagesRef = child(dbRef, `messages/${chatId}`);
                refs.push(messagesRef);

                onValue(messagesRef, (messagesSnapshot) => {
                    const messagesData = messagesSnapshot.val();

                    dispatch(setChatMessages({chatId, messagesData}));
                })

                if (chatsFoundCount === 0) {
                    setIsLoading(false);
                }
            }
            // console.log("chatIds ",chatIds)
        })

        //When loading the app getting the StarredMessages From the  Firebase DB
        const userStarredMessagesRef = child(dbRef, `userStarredMessages/${userData.userId}`);
        // console.log("USED",userStarredMessagesRef)
        refs.push(userStarredMessagesRef);

        onValue(userStarredMessagesRef, (querySnapshot) => {
            //If there is value get that else assign empty object
            // console.log("START QUERY ",querySnapshot.val());
            const starredMessages = querySnapshot.val() ?? {};
            dispatch(setStarredMessages({starredMessages}));

        })

        return () => {
            //Unsubscribe the App when App is terminated.
            refs.forEach(ref => off(ref))
        }
    }, [])

    if (isLoading) {
        <View style={commonStyles.center}>
            <ActivityIndicator size={"large"} color={colors.primary}/>
        </View>

    }

    return (
        <StackNavigator/>
    )
}

export default MainNavigator;

async function registerForPushNotificationsAsync() {
    let token;


    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    //TODO Checking if the Device is a Real Device
    //ASKING  PERMISSION FOR NOTIFICATIONS

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
         // token = (await Notifications.getExpoPushTokenAsync({ projectId: 'horizon-news-feed' })).data;
        // console.log(token);
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    return token;
}

