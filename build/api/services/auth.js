import { firebaseApp } from '../firebase';
export var createUser = function (email, password) { return firebaseApp.auth().createUserWithEmailAndPassword(email, password); };
/**
 * Signs in or doesn't a user.
 * @param email User's email
 * @param password User's password
 */
export var userSignIn = function (email, password) { return firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password); };
/** Signing a user out. */
export var userSignOut = function () { return firebaseApp
    .auth()
    .signOut(); };
