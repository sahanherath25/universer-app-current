
//FireBase DB Configs
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase, ref, set, onValue} from "firebase/database";
import { getStorage } from "firebase/storage";
import { ref  as dbRef} from "firebase/database";



// // My app's Firebase configuration -Unique for each project
// const firebaseConfig = {
//     apiKey: "AIzaSyC8pTHWPYGrwCZ9c49l4Yu-ihy2Nz6ynS8",
//     authDomain: "horizon-news-feed.firebaseapp.com",
//     projectId: "horizon-news-feed",
//     storageBucket: "horizon-news-feed.appspot.com",
//     messagingSenderId: "625123867089",
//     appId: "1:625123867089:web:8e46dc178fdeb3e82fc8f0",
//     // databaseURL: "https://horizon-news-feed-default-rtdb.firebaseio.com",
// };

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app); // export const auth=firebase.auth();
//
// // Initialize Realtime Database and get a reference to the service
// export const database = getDatabase(app);
//
// // Initialize Firebase Storage and get a reference to the service
// export const storage = getStorage(app);
//


export const getFirebaseApp=()=>{

    // My app's Firebase configuration -Unique for each project
    const firebaseConfig = {
        apiKey: "AIzaSyC8pTHWPYGrwCZ9c49l4Yu-ihy2Nz6ynS8",
        authDomain: "horizon-news-feed.firebaseapp.com",
        projectId: "horizon-news-feed",
        storageBucket: "horizon-news-feed.appspot.com",
        messagingSenderId: "625123867089",
        appId: "1:625123867089:web:8e46dc178fdeb3e82fc8f0",
        databaseURL: "https://horizon-news-feed-default-rtdb.firebaseio.com",
    };

    return initializeApp(firebaseConfig)
}

