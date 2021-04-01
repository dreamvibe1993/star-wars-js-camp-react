import firebase from "firebase/app";
import { firebaseApp } from '../firebase';

/**
 * Firebase API to create a user in the db.
 * @param email User's email
 * @param password User's password
 */
export const createUser = (email: string, password: string): Promise<firebase.auth.UserCredential> => firebaseApp.auth().createUserWithEmailAndPassword(email, password)

/**
 * Signs in or doesn't a user.
 * @param email User's email
 * @param password User's password
 */
export const userSignIn = (email: string, password: string): Promise<firebase.auth.UserCredential> => firebaseApp
  .auth()
  .signInWithEmailAndPassword(email, password);

/** Signing a current user out. */
export const userSignOut = (): Promise<void> => firebaseApp
  .auth()
  .signOut();
