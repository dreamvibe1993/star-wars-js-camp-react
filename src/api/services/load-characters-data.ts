import firebase from "firebase/app";

import { store } from "../../store/store";
import { DBRef } from "../firebase";
import { Person } from "../../models/person";
import { PersonDTO } from "../dtos/PersonDTO";
import * as actionCreators from '../../store/action-creators/action-creators'

import { mapPerson } from "../mappers/mapper";

/**
 * Lazyloads parts of people items and provides the destructor function
 * @param last Last document to restrict the batch
 * @param numItemsToDisp General number of people items to display
 */
const loadMoreCharactersItems = (last: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, numItemsToDisp: number) => DBRef
    .collection('people')
    .endAt(last)
    .limit(numItemsToDisp)
    .get()
    .then((limitedQuerySnapshot) => {
        if (!limitedQuerySnapshot.empty) {
            const people: Person[] = [];
            limitedQuerySnapshot.forEach(doc => {
                people.push(mapPerson(doc.data() as PersonDTO, doc.id));
            });
            store.dispatch(actionCreators.setPeople(people));
        }
    });

/** 
 * Loads partial collection of people items 
 * @param numItemsToDisp Number of people items to display in the sidebar
 */
export const loadCharacterData = (numItemsToDisp: number): Promise<void> => DBRef
    .collection('people')
    .get()
    .then((querySnapshot) => {
        if (numItemsToDisp === 1) {
            store.dispatch(actionCreators.setCommonBackdropOff())
        }
        const last = querySnapshot.docs[numItemsToDisp]
        store.dispatch(actionCreators.setSidebarLoadingOff());
        if (last) {
            loadMoreCharactersItems(last, numItemsToDisp);
        }
    })
/**
 * Loads a particular person's entry
 * @param docID Id of the person's entry
 * @param onNotFound Optional parameter which is a function that fires redirect if nothing's been found. 
 */
export const loadCharacterItemData = (docID: string, onNotFound?:() => void): (() => void) => DBRef
    .collection('people')
    .doc(docID)
    .onSnapshot((querySnapshot) => {
        if (!querySnapshot.exists && onNotFound) {
            onNotFound()
        } else {
            const person: Person = mapPerson(querySnapshot.data() as PersonDTO, querySnapshot.id)
            store.dispatch(actionCreators.setPersonItem(person))
        }
    })
