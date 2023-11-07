import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import {
    child,
    getDatabase,
    onValue,
    ref
} from "firebase/database";
import { getFirebaseApp } from "../utils/firebaseHelper";
import { getAuth } from "firebase/auth";

const UserProfileScreen2 = ({ navigation }) => {

    const [loaded, setLoaded] = useState(false);
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;

        setUserId(userId);

        checkParams();
        fetchUserInfo(userId);
    }, []);

    const checkParams = () => {
        let params = navigation.getParam;
        console.log("PARAMS RECEIVED ", params);
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;

        console.log("LoggedIn UID in State ", name);
        fetchUserInfo(userId);
    };

    const fetchUserInfo = (userId) => {
        let that = this;

        alert("USER ID RECEIVED IS ", userId);

        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));

        const userRef = child(dbRef, `/users/${userId}/firstLast`);

        console.log("USER RESULT", userId);

        console.log("USER ID RECEIVED ", userRef);

        //Fetching user Name From DB
        onValue(
            userRef,
            (snapshot) => {
                console.log("SELECTING USER NAME ", snapshot.val());
                console.log(snapshot.val());
                //TODO Checking User is Exists
                const exists = snapshot.exists();
                if (exists) {
                    let data = snapshot.val();
                    alert("user found");
                    setUserName(data);
                }
            },
            {
                onlyOnce: true,
            }
        );

        //Fetching name From DB
        const userNameRef = child(dbRef, `/users/${userId}/firstName`);
        onValue(
            userNameRef,
            (snapshot) => {
                console.log("SELECTING NAME ");
                console.log(snapshot.val());
                //TODO Checking User is Exists
                const exists = snapshot.exists();
                if (exists) {
                    let data = snapshot.val();
                    alert("user found");
                    setName(data);
                }
            },
            {
                onlyOnce: true,
            }
        );

        //Fetching avatar From DB
        const avatarRef = child(dbRef, `/users/${userId}/profilePicture`);
        onValue(
            avatarRef,
            (snapshot) => {
                console.log("SELECTING USER AVATAR ");
                console.log(snapshot.val());
                //TODO Checking User is Exists
                const exists = snapshot.exists();
                if (exists) {
                    let data = snapshot.val();
                    Alert.alert("USER AVATAR FOUND ");
                    setAvatar(data);
                    setLoaded(true);
                }
            },
            {
                onlyOnce: true,
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.coverContainer}>
                <Image style={styles.coverPicture} source={require("../assets/images/chatWallpaper.jpg")}/>
            </View>
            <View style={styles.profileContainer}>
                <Image style={styles.profilePicture} source={{uri: this.state.avatar}}/>
                <Text style={styles.name}>{this.state.name} </Text>
                <Text style={styles.bio}>{this.state.userName}</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => this.props.navigation.navigate("UploadPost")}>
                        <Text style={styles.buttonText}>Upload Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true}>
                <View style={styles.imagesContainer}>
                    <Image style={styles.profilePicture} source={require("../assets/images/userImage.jpeg")}/>
                    <Image style={styles.profilePicture} source={require("../assets/images/userImage.jpeg")}/>
                    <Image style={styles.profilePicture} source={require("../assets/images/userImage.jpeg")}/>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    coverContainer: {
        height: 150,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        overflow: 'hidden',
    },
    coverPicture: {
        height: '100%',
        width: '100%',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -70,
        paddingBottom: 16,
        paddingHorizontal: 16,
        // borderColor:"red",
        // borderWidth:1,
        // borderStyle:"solid"

    },
    profilePicture: {
        height: 130,
        width: 130,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
    },
    bio: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
        marginHorizontal: 32,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 16,
        flex: 1,
        marginHorizontal: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    imagesContainer: {
        flexDirection:"row",
        width: '100%',
        borderStyle:"solid",
        borderColor:"red",
        borderWidth:1,
        paddingHorizontal: 16,
        marginBottom:3,
    },
    flatListContentContainer: {
        paddingTop: 10,
        paddingBottom: 30,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 5,
        marginRight: 8,
    },
});

export default UserProfileScreen2;