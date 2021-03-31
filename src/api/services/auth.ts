import firebase from "firebase/app";
import { firebaseApp } from '../firebase';

import { signUserIn, setUserEmailString, signUserOut, flushAllErrCodes , store } from "../../store/reducer";


export const createUser = (email: string, password: string): Promise<firebase.auth.UserCredential> => firebaseApp.auth().createUserWithEmailAndPassword(email, password)

/** Checking if user is signed in or out. */
export const getSignInStatus = (): firebase.Unsubscribe => firebaseApp.auth().onAuthStateChanged((user) => {
  // the observer is only triggered on sign-in or sign-out.
  if (user) {
    store.dispatch(signUserIn());
    store.dispatch(setUserEmailString(user.email))
  } else {
    store.dispatch(signUserOut());
    store.dispatch(setUserEmailString(null))
  }
})


/**
 * Signs in or doesn't a user.
 *
 * @param email User's email
 * @param password User's password
 */
export const userSignIn = (email: string, password: string): Promise<firebase.auth.UserCredential> => firebaseApp
  .auth()
  .signInWithEmailAndPassword(email, password);

/** Signing a user out. */
export const userSignOut = (): Promise<void> => firebaseApp
  .auth()
  .signOut();
