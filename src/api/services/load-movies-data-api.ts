import firebase from "firebase/app";
import { DBRef } from "../firebase";

/** Loads whole movies' collection */
export function getMoviesCollection(): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
    return DBRef.collection('films')
}

/**
 * Loads a particular movie entry
 *
 * @param docID Id of the movie entry
 */
export function getMovieItemData(docID: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('films').doc(docID).get()
}

export function searchMovieEntity(title: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('films').where('fields.title', '==', title).get()
}
