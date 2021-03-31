import firebase from "firebase/app";
import { DBRef } from "../firebase";

export function getCompleteCharactersCollection(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('people').get()
}

export function getChunkOfCharactersCollection(last: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, threshholdNumber: number): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('people')
        .endAt(last)
        .limit(threshholdNumber)
        .get()
}

export const getCharacterItemDoc = (docID: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> => DBRef
    .collection('people')
    .doc(docID)
    .get()

export function getRelevantCharactersCollection(charactersPKsTen: number[]): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('people')
        .where('pk', 'in', charactersPKsTen)
        .get()
}