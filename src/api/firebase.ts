import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyA-VnpxuMGw5OAb71i-9SrZdLXJsho8D6o",
    authDomain: "star-wars-all-stars.firebaseapp.com",
    databaseURL: "https://star-wars-all-stars-default-rtdb.firebaseio.com",
    projectId: "star-wars-all-stars",
    storageBucket: "star-wars-all-stars.appspot.com",
    messagingSenderId: "775785381521",
    appId: "1:775785381521:web:08cd5039529aac26704930",
    measurementId: "G-T7RS5XF38F"
  };


firebase.initializeApp(firebaseConfig);
export const DBRef = firebase.firestore();
export const firebaseApp = firebase