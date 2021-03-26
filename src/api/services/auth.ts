import firebase from "firebase/app";
import { firebaseApp } from '../firebase';

import { store } from '../../store/store';
import * as actionCreators from '../../store/action-creators/action-creators'

/** Checking if user is signed in or out. */
export const getSignInStatus = (): void => {
  firebaseApp.auth().onAuthStateChanged((user) => {
    // the observer is only triggered on sign-in or sign-out.
    if (user) {
      store.dispatch(actionCreators.signUserIn());
    } else {
      store.dispatch(actionCreators.signUserOut());
    }
  })
};

/**
 * Signs in or doesn't a user.
 * @param email User's email
 * @param password User's password
 */
export const signIn = (email: string, password: string): Promise<firebase.auth.UserCredential> => {
  store.dispatch(actionCreators.setCommonBackdropOn());
  return firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
};

/** Signing a user out. */
export const signOut = (): Promise<void> => firebaseApp
    .auth()
    .signOut();


