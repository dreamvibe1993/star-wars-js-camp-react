import firebase from "firebase/app";
import { firebaseApp } from '../firebase';

export const createUser = (email: string, password: string): Promise<firebase.auth.UserCredential> => firebaseApp.auth().createUserWithEmailAndPassword(email, password)

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
  .auth()
  .signOut();
