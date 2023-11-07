// UserAllPosts.js

// Import statements and other code ...

import {Alert, Animated, FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {Component} from "react";
import PostCard from "../components/PostCard";
import {getFirebaseApp} from "../utils/firebaseHelper";
import {child, getDatabase, onValue, ref} from "firebase/database";
import {useRoute} from "@react-navigation/native";
import {getAuth} from "firebase/auth";


class UserAllPosts extends Component {
    // ... (Your existing code)

    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            userId:"",
            fadeIn: new Animated.Value(0)
        }
    }

    componentDidMount =async () => {
        // this.prepare();
        const auth = await getAuth();
        const user = auth.currentUser;
        // const userId=user.uid
        const userId=this.props.route.params.userId;



        Alert.alert("uSeR Logged In is ",userId)
        this.setState({
            userId:userId,
        })
        this.loadFeed()


        // After loading the data and setting the state, trigger the fade-in animation
        Animated.timing(this.state.fadeIn, {
            toValue: 1, // Fade in to full opacity (1)
            duration: 1000, // Animation duration in milliseconds
            useNativeDriver: true, // For better performance, use the native driver
        }).start();

    }
    pluralCheck = (s) => {
        if (s === 1) {
            return " ago"
        } else {
            return "s ago"
        }

    }

    timeConverter2 = (timeStamp) => {
        if (!timeStamp || isNaN(timeStamp)) {
            return "Invalid timestamp";
        }

        const date = new Date(timeStamp * 1000);
        const seconds = Math.floor((new Date() - date) / 1000);
        const timeUnits = [
            {unit: "year", seconds: 31536000},
            {unit: "month", seconds: 2592000},
            {unit: "day", seconds: 86400},
            {unit: "hour", seconds: 3600},
            {unit: "minute", seconds: 60},
            {unit: "second", seconds: 1},
        ];

        for (let i = 0; i < timeUnits.length; i++) {
            const timeUnit = timeUnits[i];
            const timeInSeconds = timeUnit.seconds;
            const timeInUnits = Math.floor(seconds / timeInSeconds);

            if (timeInUnits > 1) {
                return timeInUnits + " " + timeUnit.unit + (timeInUnits === 1 ? "" : "s") + " ago";
            }
        }

        return "Just now";
    };

    loadFeed = () => {
        //    Loading Feed

        this.setState({
            refresh: true,
            photo_feed: [],
        })

        let that = this;

        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const currentUserId=this.state.userId;

        const photosRef = child(dbRef, `/users/${currentUserId}/photos`)

        // const photosQuery = query(photosRef, orderByChild('timeStamp'));
        //
        // get(photosQuery).then((querySnapshot) => {

        onValue(photosRef, (querySnapshot) => {

            const exists = querySnapshot.exists();

            if (exists) {

                const photosData = querySnapshot.val();
                let photo_feed = that.state.photo_feed;

                for (let photo in photosData) {

                    let photoObject = photosData[photo];

                    console.log("PHOTO OBJ", photoObject)

                    const usersRef = child(dbRef, `/users/${photoObject.author}/userName`)
                    const nameRef = child(dbRef, `/users/${photoObject.author}/profilePicture`)

                    onValue(usersRef, (querySnapshot) => {
                        const exists = querySnapshot.exists()
                        let data;
                        if (exists) {
                            data = querySnapshot.val();
                        }

                        let profilePicture;
                        onValue(nameRef, (querySnapshot) => {
                            const exists = querySnapshot.exists()
                            if (exists) {
                                profilePicture = querySnapshot.val();
                                console.log("PROFILE PIC ", profilePicture)
                            }

                        })

                        console.log("UISER NAME ", data)

                        photo_feed.push({
                            id: photo,
                            url: photoObject.imageURL,
                            caption: photoObject.caption,
                            posted: that.timeConverter2(photoObject.timeStamp),
                            author: data,
                            authorId: photoObject.author,
                            profilePicture: profilePicture,


                        })
                        console.log("aothorId ", photoObject.authorId)
                        console.log("USER NAME  ", profilePicture)

                        that.setState({
                            refresh: false,
                            loading: false,
                        })

                        // console.log("PHOTO ARRAY", that.state.photo_feed)

                    })

                }

            }


        }, {
            onlyOnce: true,
        })


    }

    loadNew = () => {
        this.loadFeed();
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading === true ? (
                    <View>
                        <Text>Loading........</Text>
                    </View>
                ) : (

                    <Animated.View style={{ opacity: this.state.fadeIn }}>
                        <View >
                            <Text style={styles.heading}>You have Uploaded :{this.state.photo_feed.length} Posts Uploaded</Text>
                            <FlatList
                                data={this.state.photo_feed}
                                onRefresh={this.loadNew}
                                refreshing={this.state.refresh}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <PostCard post={item} />}
                            />
                        </View>
                    </Animated.View>

                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#eee",
    },
    postContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "gray",
    },
    authorContainer: {
        marginLeft: 10,
        flex: 1,
    },
    authorName: {
        fontFamily: "regular",
        padding: 10,
        borderRadius: 5,
    },
    postedTime: {
        fontFamily: "regular",
        color: "#888",
    },
    image: {
        width: "100%",
        height: 275,
        backgroundColor: "#e78",
        resizeMode: "cover",
    },
    postContent: {
        padding: 5,
    },
    caption: {
        fontFamily: "regular",
        fontSize: 16,
        marginBottom: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 5,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default UserAllPosts;
