import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollViewComponent,
    ScrollView,
    Alert
} from 'react-native';
import {child, getDatabase, onValue, ref} from "firebase/database";
import {getFirebaseApp} from "../utils/firebaseHelper";


class StudentProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,

        }

        let params=this.props.route.params;
        // console.log("params Object Received")
        // console.log(params)
    }


    componentDidMount = () => {

        console.log("PROPS", this.props.route.params.userId);

        this.checkParams();
        this.fetchUserInfo(this.props.userId)
    }

    checkParams = () => {
        let params=this.props.route.params;
        console.log("PARAMS RECEIVED ",params)
        if(params){
            if(params.userId){
                this.setState({
                    userId:params.userId
                })
                this.fetchUserInfo(params.userId)
            }
        }
    }


    fetchUserInfo = (userId) => {

        let that=this;

        alert("USER ID RECEIVED IS ",userId)

        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));

        const userRef = child(dbRef, `/users/${userId}/userName`)

        //Fetching user Name From DB
        onValue(userRef, (snapshot) => {
            // console.log("SELECTING USER NAME ",snapshot.val())
            console.log(snapshot.val())
            //TODO Checking User is Exists
            const exists = snapshot.exists();
            if (exists) {
                let data=snapshot.val()
                alert("user found")
                that.setState({
                    userName:data
                })
            }

        }, {
            onlyOnce: true,
        });

        //Fetching Picture  From DB
        const profilePictureRef = child(dbRef, `/users/${userId}/profilePicture`)
        onValue(profilePictureRef, (snapshot) => {
            // console.log("SELECTING NAME ")
            // console.log(snapshot.val())
            //TODO Checking User is Exists
            const exists = snapshot.exists();
            if (exists) {
                let data=snapshot.val()
                alert("Profile Picture found")
                that.setState({
                    profilePicture:data
                })
            }

        }, {
            onlyOnce: true,
        });


        //Fetching name From DB
        const userNameRef = child(dbRef, `/users/${userId}/name`)
        onValue(userNameRef, (snapshot) => {
            // console.log("SELECTING NAME ")
            // console.log(snapshot.val())
            //TODO Checking User is Exists
            const exists = snapshot.exists();
            if (exists) {
                let data=snapshot.val()
                alert("user found")
                that.setState({
                    name:data
                })
            }

        }, {
            onlyOnce: true,
        });


        //Fetching avatar From DB
        const avatarRef = child(dbRef, `/users/${userId}/avatar`)
        onValue(avatarRef, (snapshot) => {
            console.log("SELECTING USER AVATAR ")
            console.log(snapshot.val())
            //TODO Checking User is Exists
            const exists = snapshot.exists();
            if (exists) {
                let data=snapshot.val()
              Alert.alert("USER AVATAR FOUND ")
                that.setState({
                    avatar:data,
                    loaded:true,
                })
            }

        }, {
            onlyOnce: true,
        });

    }

    render() {
        const { name, bio, profilePicture, coverPicture, images, onLogout, onUploadPost } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.coverContainer}>
                    <Image style={styles.coverPicture} source={require("../assets/images/chatWallpaper.jpg")} />
                </View>
                <View style={styles.profileContainer}>
                    <Image style={styles.profilePicture} source={{uri:this.state.profilePicture}} />
                    <Text style={styles.name}>{this.state.name} </Text>
                    <Text style={styles.bio}>{this.state.userName}</Text>
                </View>

                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true}>
                    <View style={styles.imagesContainer}>
                        <Image style={styles.profilePicture} source={require("../assets/images/userImage.jpeg")} />
                        <Image style={styles.profilePicture} source={require("../assets/images/userImage.jpeg")} />
                        <Image style={styles.profilePicture} source={require("../assets/images/userImage.jpeg")} />
                        <Image style={styles.profilePicture} source={require("../assets/images/userImage.jpeg")} />
                    </View>
                </ScrollView>
            </View>
        );
    }
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
        flexGrow:1,
        flexDirection:"column",
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
        borderRadius: 5,
        marginRight: 8,
    },
});

export default StudentProfile;
