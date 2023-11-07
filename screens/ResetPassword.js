// import React, { useState } from 'react';
// import { View, TextInput, Button, Text } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { getFirebaseApp } from "../utils/firebaseHelper";
// import { getAuth } from "firebase/auth";
//
//
// const ResetPassword = () => {
//     const [email, setEmail] = useState('');
//     const [resetSent, setResetSent] = useState(false);
//     const [error, setError] = useState(null);
//
//     const handleFormSubmit = async () => {
//
//
//         try {
//             await auth().sendPasswordResetEmail(email);
//             setResetSent(true);
//             setError(null);
//         } catch (err) {
//             alert("ERROR")
//             setError(err.message);
//         }
//     };
//
//     return (
//         <View>
//             <Text>Reset Password</Text>
//             {resetSent ? (
//                 <Text>Password reset email sent. Please check your inbox.</Text>
//             ) : (
//                 <>
//                     <TextInput
//                         placeholder="Enter your email"
//                         value={email}
//                         onChangeText={(text) => setEmail(text)}
//                     />
//                     <Button title="Reset Password" onPress={handleFormSubmit} />
//                     {error && <Text>{error}</Text>}
//                 </>
//             )}
//         </View>
//     );
// };
//
// export default ResetPassword;
