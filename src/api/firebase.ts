import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9FG8GnUX2OKo8SYmYIUTM5knuGI07c5A",
    authDomain: "my-back-973af.firebaseapp.com",
    databaseURL: "https://my-back-973af-default-rtdb.firebaseio.com",
    projectId: "my-back-973af",
    storageBucket: "my-back-973af.appspot.com",
    messagingSenderId: "246460573131",
    appId: "1:246460573131:web:620664b4063acaa4c2024e",
    measurementId: "G-0FXNFXWSTH"
};

firebase.initializeApp(firebaseConfig);
export const DBRef = firebase.firestore();
export const firebaseApp = firebase