import firebase from "firebase/app";
import { DBRef } from "../firebase";

/** API to get the whole doc's collection of chars at the db */
export function getCompleteCharactersCollection(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('people').get()
}

/**
 * API to get partially downloaded pieces of the collection of chars in the db.
 * @param last Last doc's reference.
 * @param threshholdNumber Peak ammount of entries to get.
 */
export function getChunkOfCharactersCollection(last: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, threshholdNumber: number): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('people')
        .endAt(last)
        .limit(threshholdNumber)
        .get()
}

/**
 * API to get a particular item from the db.
 * @param docID Doc's ID.
 * @returns Promise with docs.
 */
export const getCharacterItemDoc = (docID: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> => DBRef
    .collection('people')
    .doc(docID)
    .get()

/**
 * API to get 10 doc from char's collection
 * @param charactersPKsTen Slice of char's array.
 * @returns Promise with docs.
 */
export function getRelevantCharactersCollection(charactersPKsTen: number[]): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('people')
        .where('pk', 'in', charactersPKsTen)
        .get()
}