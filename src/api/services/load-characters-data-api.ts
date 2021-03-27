import firebase from "firebase/app";

import { store } from "../../store/store";
import { DBRef } from "../firebase";
import { Character } from "../../models/character";
import { CharacterDTO } from "../dtos/CharacterDTO";

import { mapCharacter } from "../mappers/mapper";
import { setCharacterItem, setCharacters } from "../../store/reducer";


export function getCompleteCharactersCollection(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('people').get()
}

export function getChunkOfCharactersCollection(last: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, threshholdNumber: number): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return DBRef.collection('people')
        .endAt(last)
        .limit(threshholdNumber)
        .get()
}


// interface loadMoreCharsItems: {last: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, numItemsToDisp: number}
/**
 * Lazyloads parts of people items and provides the destructor function
 * @param last Last document to restrict the batch
 * @param numItemsToDisp General number of people items to display
 */
// export const loadMoreCharactersItems = ({last: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, numItemsToDisp: number}): Promise<void> => DBRef
//     .collection('people')
//     .endAt(last)
//     .limit(numItemsToDisp)
//     .get()
//     .then((limitedQuerySnapshot) => {
//         if (!limitedQuerySnapshot.empty) {
//             const characters = limitedQuerySnapshot.docs.map(character => mapCharacter(character.data() as CharacterDTO, character.id));
//             store.dispatch(setCharacters(characters));
//         }
//     });

/**
 * Loads partial collection of people items
 * @param numItemsToDisp Number of people items to display in the sidebar
 */
// export const loadCharactersData = (): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => DBRef
//     .collection('people')
//     .get()

/**
 * Loads a particular person's entry
 * @param docID Id of the person's entry
 * @param onNotFound Optional parameter which is a function that fires redirect if nothing's been found.
 */
// export const loadCharacterItemData = (docID: string, onNotFound?:() => void): (() => void) => DBRef
//     .collection('people')
//     .doc(docID)
//     .onSnapshot((querySnapshot) => {
//         if (!querySnapshot.exists && onNotFound) {
//             onNotFound()
//         } else {
//             const character = mapCharacter(querySnapshot.data() as CharacterDTO, querySnapshot.id)
//             store.dispatch(setCharacterItem(character))
//         }
//     })
