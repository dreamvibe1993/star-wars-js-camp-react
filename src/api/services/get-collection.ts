import firebase from "firebase/app";
import { DBRef } from "../firebase"

/** Getting the whole collection */
export const getCollection = (collectionName: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => DBRef
    .collection(collectionName)
    .get()