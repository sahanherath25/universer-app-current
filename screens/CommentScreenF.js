// import React, {Component} from "react";
// import {
//     Alert,
//     FlatList,
//     KeyboardAvoidingView,
//     StyleSheet,
//     Image,
//     Text,
//     TouchableOpacity,
//     View,
//     TextInput
// } from "react-native";
// // import {auth} from "../config/config";
// import {getAuth} from "firebase/auth";
// import {child, get, getDatabase, onValue, orderByChild, query, ref, set} from "firebase/database";
// import {getFirebaseApp} from "../utils/firebaseHelper";
// import ProfileImage from "../components/ProfileImage";
// import colors from "../constants/colors";
// import PostCommentButton from "../components/PostCommentButton";
//
// // class CommentsScreen extends Component {
// //
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             loggedIn: false,
// //             comments_list: [],
// //         }
// //
// //     }
// //
// //     componentDidMount = () => {
// //
// //         this.checkParams()
// //         const auth = getAuth();
// //         const user = auth.currentUser;
// //
// //         Alert.alert*("CURRENT LOGGEDIN USER IS ",user.uid)
// //
// //         const userId = user.uid
// //         this.setState({
// //             userId
// //         })
// //         let that = this;
// //
// //         auth.onAuthStateChanged((user) => {
// //
// //             // console.error(user.uid)
// //
// //             if (user) {
// //                 //   User LoggedIn
// //                 that.setState({
// //                     loggedIn: true,
// //                 })
// //             } else {
// //                 //   User Not LoggedIn
// //                 that.setState({
// //                     loggedIn: false,
// //                 })
// //             }
// //
// //         })
// //
// //     }
// //
// //     checkParams = () => {
// //         let params = this.props.route.params;
// //         console.log("PARAMS RECEIVED ", params)
// //         if (params) {
// //             if (params.photoId) {
// //                 Alert.alert("Photo Id For This Is ", params.photoId)
// //                 this.setState({
// //                     photoId: params.photoId
// //                 })
// //                 this.fetchComments(params.photoId)
// //             }
// //         }
// //     }
// //
// //
// //     generateRandomCode = () => {
// //         return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
// //     }
// //
// //     uniqueID = () => {
// //         return this.generateRandomCode() + this.generateRandomCode() + "-" + this.generateRandomCode() + "-" + this.generateRandomCode() + "-" +
// //             this.generateRandomCode() + "-" + this.generateRandomCode() + "-" + this.generateRandomCode() + "-" + this.generateRandomCode()
// //     }
// //
// //     async addCommentToList(comments_list, data, comment) {
// //
// //         let that = this;
// //         //TODO Get the Comment typed From the object
// //         let commentObject = data[comment]
// //
// //         //TODO Get the user Who Typed the comment
// //
// //         const app = getFirebaseApp();
// //         const dbRef = ref(getDatabase(app));
// //
// //         const selectedUserId = commentObject.author;
// //         console.log("COMMENTED USER IS ", selectedUserId);
// //
// //         if (selectedUserId) {
// //
// //             const userRef = await child(dbRef, `/users/${selectedUserId}`);
// //             let userName = "";
// //             let uri = ""
// //
// //             //Fetching user Name From DB
// //             onValue(userRef, (snapshot) => {
// //                 console.log(snapshot.val())
// //                 //TODO Checking User is Exists
// //                 const exists = snapshot.exists();
// //                 if (exists) {
// //                     userName = snapshot.val().firstLast;
// //                     uri = snapshot.val().profilePicture;
// //                     console.log("USER NAME IS ", userName)
// //                     console.log("Profile Picture is ", uri)
// //                     alert("user found")
// //
// //                     comments_list.push(
// //                         {
// //                             id: comment,
// //                             comment: commentObject.comment,
// //                             posted: this.timeConverter2(commentObject.posted),
// //                             author: userName,
// //                             profilePicture: uri,
// //                             authorId: commentObject.author,
// //                         }
// //                     )
// //
// //                     that.setState({
// //                         refresh: false,
// //                         loading: false,
// //                     })
// //                 }
// //
// //             }, {
// //                 onlyOnce: true,
// //             });
// //
// //             console.log("User Is ", userName)
// //
// //
// //         }
// //
// //
// //     }
// //
// //     fetchComments(photoId) {
// //
// //         let that = this;
// //
// //         const app = getFirebaseApp();
// //         const dbRef = ref(getDatabase(app));
// //
// //         let params = this.props.route.params;
// //         let photo=params.photoId;
// //
// //         const commentsRef = child(dbRef, `/comments/${photo}`)
// //         const orderedQuery = query(commentsRef, orderByChild('posted'));
// //         onValue(orderedQuery, (snapshot) => {
// //
// //             console.log(snapshot.val())
// //             //TODO Checking User is Exists
// //             const exists = snapshot.exists();
// //             if (exists) {
// //                 let data = snapshot.val();
// //
// //                 let comments_list = that.state.comments_list;
// //
// //                 for (let comment in data) {
// //
// //                     that.addCommentToList(comments_list, data, comment)
// //                 }
// //
// //
// //                 alert("Comments Found For This Photo")
// //                 // that.setState({
// //                 //     name: data
// //                 // })
// //             }
// //
// //         }, {
// //             onlyOnce: true,
// //         });
// //
// //     }
// //
// //     postComment=()=>{
// //
// //         let comment=this.state.comment;
// //
// //         if(comment!==""){
// //
// //             let photoId=this.state.photoId;
// //             let userId=this.state.userId;
// //             let commentId=this.uniqueID();
// //
// //             let dateTime=Date.now()
// //             let timeStamp=Math.floor(dateTime/1000);
// //
// //             this.setState({
// //                 comment:""
// //             })
// //
// //             let commentObject={
// //                 posted:timeStamp,
// //                 author:userId,
// //                 comment:comment,
// //
// //             }
// //             console.log("Generated Comment OBJ is  ",commentObject);
// //
// //
// //             //TODO Adding Comment to the Related PhotoID
// //
// //             const app = getFirebaseApp();
// //             const dbRef = ref(getDatabase(app));
// //
// //             //     taking the Photo Id And Returning All the Comments related for this Photo Id
// //
// //             //Fetching name From DB
// //             const commentsRef = child(dbRef, `/comments/${photoId}/${commentId}`)
// //
// //             set(commentsRef,commentObject).then(()=>{
// //                 Alert.alert("Posted Comment Successfully")
// //             }).catch(()=>{
// //                 console.error("COMMENT POSTING FAILED")
// //             })
// //
// //             console.log("USER ID ",userId);
// //
// //
// //         }else {
// //             Alert.alert("Comment cannot be post empty")
// //         }
// //
// //
// //
// //
// //     }
// //
// //     reloadCommentsList=()=>{
// //         this.setState({
// //             comment_list:[]
// //
// //         })
// //     }
// //
// //
// //
// //     render() {
// //         return (
// //             <View style={styles.container}>
// //                 {this.state.loggedIn === true ? (
// //                     <View>
// //                         <Text>Comments</Text>
// //
// //                         <KeyboardAvoidingView behavior={"padding"} enabled={true} style={{
// //                             borderTopWidth: 1,
// //                             borderTopColor: "gray",
// //                             padding: 10,
// //                             marginBottom: 20
// //                         }}>
// //
// //                             <Text style={{fontWeight: "bold"}}>Post a Comment</Text>
// //                             <View>
// //                                 <TextInput
// //                                     placeholder={"Post Your Comment"}
// //                                     onChangeText={(text) => this.setState({comment: text})}
// //                                     style={{paddingVertical:10}}
// //
// //                                 />
// //
// //                                 {/*<PostCommentButton onPress={()=>this.postComment()}/>*/}
// //                                 <PostCommentButton onPress={()=>this.postComment()}/>
// //
// //                             </View>
// //
// //
// //                         </KeyboardAvoidingView>
// //                     </View>
// //                 ) : (
// //                     <View>
// //                         <Text>User Not Logged In</Text>
// //                         <Text>Please Login to Comment Post</Text>
// //                     </View>
// //                 )}
// //
// //                 {this.state.comments_list.length === 0 ? (
// //                     <Text>No Comments Yet for This Photo</Text>
// //                 ) : (
// //                     <FlatList
// //                         refreshing={this.state.refresh}
// //                         data={this.state.comments_list}
// //                         keyExtractor={(item, index) => index.toString()}
// //                         style={{flex: 1, backgroundColor: '#eee'}}
// //                         renderItem={({item, index}) => {
// //                             console.log('ARRAY ITEMS ', this.state.comments_list.length);
// //                             console.log('ITEM', item);
// //                             return (
// //                                 <View
// //                                     key={index}
// //                                     style={{
// //                                         width: '100%',
// //                                         overflow: 'hidden',
// //                                         marginBottom: 10,
// //                                         justifyContent: 'space-between',
// //                                         borderBottomWidth: 1,
// //                                         borderColor: 'gray',
// //                                         paddingBottom:10
// //                                         // marginBottom:10,
// //                                     }}>
// //
// //                                     <View style={styles.container}>
// //                                         <View style={styles.commentContainer}>
// //                                             <ProfileImage size={50} uri={item.profilePicture} showEditButton={false}/>
// //                                             <View style={styles.commentContent}>
// //                                                 <Text style={styles.author}>{item.author}</Text>
// //                                                 <Text style={styles.commentText}>{item.comment}</Text>
// //                                             </View>
// //                                             <View style={styles.comment}>
// //                                                 <Text style={styles.posted}>{item.posted}</Text>
// //                                             </View>
// //                                         </View>
// //                                     </View>
// //
// //                                 </View>
// //                             );
// //                         }}
// //                     />
// //                 )}
// //             </View>
// //         )
// //     }
// // }
//
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, Alert, KeyboardAvoidingView } from 'react-native';
//
// const CommentsScreen = (props) => {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [commentsList, setCommentsList] = useState([]);
//     const [userId, setUserId] = useState('');
//     const [photoId, setPhotoId] = useState('');
//     const [comment, setComment] = useState('');
//
//     useEffect(() => {
//         checkParams();
//         const auth = getAuth();
//         const user = auth.currentUser;
//         Alert.alert('CURRENT LOGGEDIN USER IS ', user.uid);
//         const userId = user.uid;
//         setUserId(userId);
//         let that = this;
//
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             if (user) {
//                 // User LoggedIn
//                 setLoggedIn(true);
//             } else {
//                 // User Not LoggedIn
//                 setLoggedIn(false);
//             }
//         });
//
//         return () => unsubscribe(); // Cleanup function for unsubscribing from the onAuthStateChanged event
//     }, []);
//
//     const checkParams = () => {
//         let params = props.route.params;
//         console.log('PARAMS RECEIVED ', params);
//         if (params) {
//             if (params.photoId) {
//                 Alert.alert('Photo Id For This Is ', params.photoId);
//                 setPhotoId(params.photoId);
//                 fetchComments(params.photoId);
//             }
//         }
//     };
//
//     const generateRandomCode = () => {
//         return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
//     };
//
//     const uniqueID = () => {
//         return (
//             generateRandomCode() +
//             generateRandomCode() +
//             '-' +
//             generateRandomCode() +
//             '-' +
//             generateRandomCode() +
//             '-' +
//             generateRandomCode() +
//             '-' +
//             generateRandomCode() +
//             '-' +
//             generateRandomCode() +
//             '-' +
//             generateRandomCode()
//         );
//     };
//
//     const addCommentToList = async (data, comment) => {
//         let that = this;
//         let commentObject = data[comment];
//         const app = getFirebaseApp();
//         const dbRef = ref(getDatabase(app));
//         const selectedUserId = commentObject.author;
//         console.log('COMMENTED USER IS ', selectedUserId);
//
//         if (selectedUserId) {
//             const userRef = await child(dbRef, `/users/${selectedUserId}`);
//             let userName = '';
//             let uri = '';
//
//             onValue(userRef, (snapshot) => {
//                 console.log(snapshot.val());
//                 const exists = snapshot.exists();
//                 if (exists) {
//                     userName = snapshot.val().firstLast;
//                     uri = snapshot.val().profilePicture;
//                     console.log('USER NAME IS ', userName);
//                     console.log('Profile Picture is ', uri);
//                     alert('user found');
//
//                     setCommentsList((prevComments) => [
//                         ...prevComments,
//                         {
//                             id: comment,
//                             comment: commentObject.comment,
//                             posted: timeConverter2(commentObject.posted),
//                             author: userName,
//                             profilePicture: uri,
//                             authorId: commentObject.author,
//                         },
//                     ]);
//
//                     setRefresh(false);
//                     setLoading(false);
//                 }
//             }, { onlyOnce: true });
//         }
//     };
//
//     const fetchComments = (photoId) => {
//         let that = this;
//         const app = getFirebaseApp();
//         const dbRef = ref(getDatabase(app));
//         let params = props.route.params;
//         let photo = params.photoId;
//         const commentsRef = child(dbRef, `/comments/${photo}`);
//         const orderedQuery = query(commentsRef, orderByChild('posted'));
//
//         onValue(orderedQuery, (snapshot) => {
//             console.log(snapshot.val());
//             const exists = snapshot.exists();
//             if (exists) {
//                 let data = snapshot.val();
//                 let comments_list = [];
//                 for (let comment in data) {
//                     addCommentToList(data, comment);
//                 }
//                 alert('Comments Found For This Photo');
//             }
//         }, { onlyOnce: true });
//     };
//
//     const postComment = () => {
//         if (comment !== '') {
//             let photoId = photoId;
//             let userId = userId;
//             let commentId = uniqueID();
//             let dateTime = Date.now();
//             let timeStamp = Math.floor(dateTime / 1000);
//
//             setComment('');
//
//             let commentObject = {
//                 posted: timeStamp,
//                 author: userId,
//                 comment: comment,
//             };
//             console.log('Generated Comment OBJ is  ', commentObject);
//
//             const app = getFirebaseApp();
//             const dbRef = ref(getDatabase(app));
//             const commentsRef = child(dbRef, `/comments/${photoId}/${commentId}`);
//
//             set(commentsRef, commentObject)
//                 .then(() => {
//                     Alert.alert('Posted Comment Successfully');
//                 })
//                 .catch(() => {
//                     console.error('COMMENT POSTING FAILED');
//                 });
//
//             console.log('USER ID ', userId);
//         } else {
//             Alert.alert('Comment cannot be posted empty');
//         }
//     };
//
//     const reloadCommentsList = () => {
//         setCommentsList([]);
//     };
//
//         return (
//             <View style={styles.container}>
//                 {this.state.loggedIn === true ? (
//                     <View>
//                         <Text>Comments</Text>
//
//                         <KeyboardAvoidingView behavior={"padding"} enabled={true} style={{
//                             borderTopWidth: 1,
//                             borderTopColor: "gray",
//                             padding: 10,
//                             marginBottom: 20
//                         }}>
//
//                             <Text style={{fontWeight: "bold"}}>Post a Comment</Text>
//                             <View>
//                                 <TextInput
//                                     placeholder={"Post Your Comment"}
//                                     onChangeText={(text) => this.setState({comment: text})}
//                                     style={{paddingVertical:10}}
//
//                                 />
//
//                                 {/*<PostCommentButton onPress={()=>this.postComment()}/>*/}
//                                 <PostCommentButton onPress={()=>this.postComment()}/>
//
//                             </View>
//
//
//                         </KeyboardAvoidingView>
//                     </View>
//                 ) : (
//                     <View>
//                         <Text>User Not Logged In</Text>
//                         <Text>Please Login to Comment Post</Text>
//                     </View>
//                 )}
//
//                 {this.state.comments_list.length === 0 ? (
//                     <Text>No Comments Yet for This Photo</Text>
//                 ) : (
//                     <FlatList
//                         refreshing={this.state.refresh}
//                         data={this.state.comments_list}
//                         keyExtractor={(item, index) => index.toString()}
//                         style={{flex: 1, backgroundColor: '#eee'}}
//                         renderItem={({item, index}) => {
//                             console.log('ARRAY ITEMS ', this.state.comments_list.length);
//                             console.log('ITEM', item);
//                             return (
//                                 <View
//                                     key={index}
//                                     style={{
//                                         width: '100%',
//                                         overflow: 'hidden',
//                                         marginBottom: 10,
//                                         justifyContent: 'space-between',
//                                         borderBottomWidth: 1,
//                                         borderColor: 'gray',
//                                         paddingBottom:10
//                                         // marginBottom:10,
//                                     }}>
//
//                                     <View style={styles.container}>
//                                         <View style={styles.commentContainer}>
//                                             <ProfileImage size={50} uri={item.profilePicture} showEditButton={false}/>
//                                             <View style={styles.commentContent}>
//                                                 <Text style={styles.author}>{item.author}</Text>
//                                                 <Text style={styles.commentText}>{item.comment}</Text>
//                                             </View>
//                                             <View style={styles.comment}>
//                                                 <Text style={styles.posted}>{item.posted}</Text>
//                                             </View>
//                                         </View>
//                                     </View>
//
//                                 </View>
//                             );
//                         }}
//                     />
//                 )}
//             </View>
//         )
//
//
// }
//
//
//
// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         flex: 1,
//         // backgroundColor: '#fff', // Set the background color as needed
//         // paddingHorizontal: 20, // Add horizontal padding if desired
//         // paddingTop: 20, // Add top padding if desired
//         // paddingBottom: 20,
//
//     },
//     author:{
//         color:colors.profileUserName,
//     },
//     commentContainer: {
//
//         width: "100%",
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     commentContent: {
//         marginLeft:12,
//         flex: 1,
//         flexDirection: 'column',
//     }
//     ,
//     textContainer: {
//         color: "red",
//         width: "100%",
//         textAlign: "center",
//     },
//     comment: {
//         padding: 5,
//     }
// });
//
//
// export default CommentsScreen;
