import firebase from "firebase/app";
import { firebaseApp } from '../firebase';

import { signUserIn, setCommonBackdropOn, setUserEmailString } from "../../store/reducer";
import { store } from '../../store/reducer';
import { signCurrentUserOut } from "../../store/thunks/auth-thunks";

export const createUser = (email: string, password: string): Promise<firebase.auth.UserCredential> => firebaseApp.auth().createUserWithEmailAndPassword(email, password)

/** Checking if user is signed in or out. */
export const getSignInStatus = (): void => {
  firebaseApp.auth().onAuthStateChanged((user) => {
    // the observer is only triggered on sign-in or sign-out.
    if (user) {
      store.dispatch(signUserIn());
      store.dispatch(setUserEmailString(user.email))
    } else {
      store.dispatch(signCurrentUserOut());
      store.dispatch(setUserEmailString(null))
    }
  })
};

/**
 * Signs in or doesn't a user.
 * @param email User's email
 * @param password User's password
 */
export const userSignIn = (email: string, password: string): Promise<firebase.auth.UserCredential> => firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password);

/** Signing a user out. */
export const userSignOut = (): Promise<void> => firebaseApp
  .auth().signOut();

