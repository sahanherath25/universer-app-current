import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
// import {auth, database, dbRef} from "../config/config";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirebaseApp} from "../utils/firebaseHelper";
// import EditButton from "../components/EditButton";
// import PhotoList from "../components/PhotoList";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }


    componentDidMount = () => {

        let that = this;

        const app=getFirebaseApp();
        const auth=getAuth(app);
        onAuthStateChanged(auth, (user) => {

            console.log("USER AUTHENTICATED",user.isAuthenticated)
            console.log("USER",user.uid)

            if (user) {

                // console.error("USER DATA IS LOGGING ")
                // console.error(user)
                //   User LoggedIn
                that.setState({
                    loggedIn: true,
                })
            } else {
                //   User Not LoggedIn
                that.setState({
                    loggedIn: false,
                })
            }


        })


    }

    render() {


        {console.log("NAVIGATION IN PROFILE")}
        // {console.log(this.props.navigation.navigate("Upload"))}
        return (


            <View style={styles.mainContainer}>

                {this.state.loggedIn === true ?
                    <View style={styles.mainContainer}>
                        <View style={styles.profileContainer}>
                            <Text>User LoggedIn</Text>
                        </View>

                        {/*/!* TODO PROFILE IMAGE*!/*/}
                        {/*<View style={styles.profileImageContainer}>*/}
                        {/*    <Image style={styles.profileImage}*/}
                        {/*           source={{uri:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}}*/}
                        {/*    />*/}
                        {/*    <View>*/}
                        {/*        <Text>User Name</Text>*/}
                        {/*        <Text>@userName</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        {/*/!*Logout/ Edit  Buttons *!/*/}
                        {/*<View>*/}
                        {/*    /!*<Button title={"Go to "} onPress={super.props.navigation.navigate("Upload")}/>*!/*/}
                        {/*    <EditButton content={"Sign Out"}  />*/}
                        {/*    <EditButton content={"Edit Profile"}  onPress={()=>this.props.navigation.navigate("News Feed")}/>*/}
                        {/*    <EditButton content={"Upload New"}   onPress={()=>this.props.navigation.navigate("Upload")}/>*/}
                        {/*    /!*<EditButton content={"Upload Image"}   onPress={()=>this.props.navigation.navigate("UploadPostTest")}/>*!/*/}
                        {/*    /!*<EditButton content={"Edit Profile"} onPress={()=>super.props} />*!/*/}
                        {/*</View>*/}

                        {/*<View style={styles.postList}>*/}
                        {/*    <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation} />*/}
                        {/*</View>*/}

                    </View>

                    :

                    <View style={styles.container}>
                        <Text>User Not LoggedIn</Text>
                        <Text>Please Login to View Details</Text>
                    </View>

                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        height: 70,
        paddingTop: 30,
        backgroundColor: "white",
        borderColor: "lightgrey",
    },
    textContainer: {
        color: "red",
        width: "100%",
        textAlign: "center",
    },
    profileImageContainer:{
        justifyContent:"space-evenly",
        alignItems:"center",
        flexDirection:"row",
        paddingVertical:10,
    },
    profileImage:{
        width: 100,
        height: 100,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginLeft:10,
        // elevation: 10,
    },
    postList:{
        borderColor:"red",
        borderWidth:2,
        borderStyle:"solid"

    }

});


export default Profile;