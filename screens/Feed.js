import React, {Component} from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CommentButton from "../components/CommentButton";
import LikeButton from "../components/LikeButton";
import {getFirebaseApp} from "../utils/firebaseHelper";
import {child, getDatabase, onValue, ref} from "firebase/database";
import ReportButton from "../components/ReportButton";
import ProfileImage from "../components/ProfileImage";
import {getAuth} from "firebase/auth";

class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loggedUserId:"",
        }
    }

    componentDidMount = () => {

        // this.prepare();
        this.loadFeed()
        const app = getFirebaseApp();
        const auth = getAuth(app)
        this.state.loggedUserId=auth.currentUser.uid;
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

        const photosRef = child(dbRef, `/photos/`)

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
                    const userNameRef = child(dbRef, `/users/${photoObject.author}/firstLast`)

                    onValue(usersRef, (querySnapshot) => {
                        const exists = querySnapshot.exists()
                        let data;
                        if (exists) {
                            data = querySnapshot.val();
                            console.log("SUER DATA ",data)
                        }

                        let profilePicture;
                        onValue(nameRef, (querySnapshot) => {
                            const exists = querySnapshot.exists()
                            if (exists) {
                                profilePicture = querySnapshot.val();
                                console.log("PROFILE PIC ", profilePicture)
                            }

                        })

                        let fullName;
                        onValue(userNameRef, (querySnapshot) => {
                            const exists = querySnapshot.exists()
                            if (exists) {
                                fullName = querySnapshot.val();
                                console.log("USER FULL NAME", fullName)
                            }

                        })


                        console.log("UISER NAME ", data)

                        photo_feed.push({
                            id: photo,
                            url: photoObject.imageURL,
                            caption: photoObject.caption,
                            posted: that.timeConverter2(photoObject.timeStamp),
                            author: data,
                            userFullName:fullName,
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
        // console.log("PHOTOS  MY ARRAY", this.state.photo_feed)
        // console.log("REFRESHING ", Math.random())
        return (
            <View style={{flex: 1}}>

                {this.state.loading === true ? <View> <Text>Loading........</Text></View> :

                    <FlatList
                        data={this.state.photo_feed}
                        onRefresh={this.loadNew}
                        refreshing={this.state.refresh}
                        keyExtractor={(item, index) => {
                            return index.toString();
                        }}
                        renderItem={({item, index}) => {

                            {console.log("AUTHOR ITEM OBJECT ",item)}
                            // console.log("PHOTO OBJ SRUCTURE ", item)

                            return (


                                <View style={styles.postContainer}>
                                    <View style={styles.post}>
                                        <View style={styles.commentContainer}>
                                            <ProfileImage size={50} uri={item.profilePicture} showEditButton={false}/>
                                            <View style={styles.commentContent}>
                                                <TouchableOpacity
                                                    // onPress={() => this.props.navigation.navigate("StudentProfile", {userId: item.authorId})}>
                                                    onPress={() => this.props.navigation.navigate("UserInfoDetailScreen", {userId: item.authorId})}>
                                                    <Text style={styles.userNameText}>{item.userFullName}</Text>
                                                    {/*<Text style={styles.userNameText}>Author Id {item.authorId}</Text>*/}

                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.posted}>
                                                <Text style={styles.text}>{item.posted}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.container}>
                                        <Image
                                            style={styles.tinyLogo}
                                            source={{uri: item.url}}
                                        />
                                    </View>

                                    <View style={styles.comment}>
                                        <Text>{item.caption}</Text>
                                        <View style={styles.buttonContainer}>

                                            <LikeButton/>
                                            <CommentButton
                                                onPress={() => this.props.navigation.navigate("CommentsSection", {photoId: item.id})}
                                                content={"Comments"}
                                            />

                                            <ReportButton photoId={item.id} post={item} loggedInUser={this.state.loggedUserId}/>
                                            {/*<CustomReportButton  photoId={item.id} post={item} />*/}
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                }

            </View>
        )
    }



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    textContainer: {
        color: "red",
        width: "100%",
        textAlign: "center",
    },
    imageStyle: {
        resizeMode: "cover",
        width: "100%",
        height: "675",
        // marginBottom: 10,
        // borderRadius: 10,
    },
    tinyLogo: {
        width: "100%",
        height: 275,
        backgroundColor: '#e78',
    },
    flatList: {
        flex: 1,
        backgroundColor: "#eee",
    },
    postContainer: {
        width: "100%",
        overflow: "hidden",
        marginBottom: 5,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "gray"
    },
    commentContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    }
    ,
    commentContent: {
        flex: 1,
        flexDirection: 'column',
    }
    ,
    post: {
        width: "100%",
        marginLeft: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    posted: {
        marginRight: 10,
    }
    ,
    comment: {
        padding: 5,
    },
    postText: {
        padding: 10,
        marginTop: 10,
        paddingLeft: 5,
        textAlign: "center",
    },
    text: {
        fontFamily: "regular",
        // fontFamily:"mon-black",
    },
    userNameText: {
        fontFamily: "regular",
        padding: 10,
        borderRadius: 5,


    },
    buttonContainer: {
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        // borderColor:"black",
        // borderWidth:1,
        // borderStyle:"solid",

    }
});

export default Feed;


// <View style={{flex:1}}>
//
//     {/*<View style={{height:70,paddingTop:30,backgroundColor:"white",borderColor:"lightgray",borderBottomWidth:0.5,justifyContent:"center",alignItems:"center"}}>*/}
//     {/*   /!*<Text>  NEWS FEED</Text>*!/*/}
//     {/*</View>*/}
//
//     <View>
//         <View>
//             <Text>Time Ago</Text>
//             <Text>@User Name Posted</Text>
//         </View>
//
//         <View>
//             <Image source={}/>
{/*        </View>*/
}

{/*    </View>*/
}

{/*</View>*/
}