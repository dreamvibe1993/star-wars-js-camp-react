import firebase from "firebase/app";
import { DBRef } from "../firebase";

/** 
 * API to load the whole movies' collection 
 * @returns Collection's reference.
 */
export function getMoviesCollection(): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
    return DBRef.collection('films')
}

/**
 * Loads a particular movie entry
 * @param docID Id of the movie entry
 * @returns Promise with a particular document from movies' collection.
 */
export function getMovieItemData(docID: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('films').doc(docID).get()
}

/**
 * API to search a movie.
 * @param title Movie's title.
 * @returns Promise with a doc. 
 */
export function searchMovieEntity(title: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('films').where('fields.title', '==', title).get()
}
