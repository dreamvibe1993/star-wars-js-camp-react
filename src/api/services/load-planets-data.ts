import firebase from "firebase/app";

import { store } from '../../store/store';
import { DBRef } from '../firebase';
import { Planet } from '../../models/planet';
import { PlanetDTO } from '../dtos/PlanetDTO';
import * as actionCreators from '../../store/action-creators/action-creators'

import { mapPlanet } from '../mappers/mapper';

/**
 * Lazyloads parts of planets items and provides the destructor function
 * @param last Last document to restrict the batch
 * @param numItemsToDisp General number of planets items to display
 */
const loadMorePlanetsItems = (last: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, numItemsToDisp: number) => DBRef
    .collection('planets')
    .endAt(last)
    .limit(numItemsToDisp)
    .get()
    .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            const planets: Planet[] = [];
            querySnapshot.forEach(doc => {
                planets.push(mapPlanet(doc.data() as PlanetDTO, doc.id));
            })
            store.dispatch(actionCreators.setPlanets(planets));
        }
    })

/** 
 * Loads partial collection of planets items 
 * @param numItemsToDisp Number of planets items to display in the sidebar
 */
export const loadPlanetsData = (numItemsToDisp: number): Promise<void> => DBRef
    .collection('planets')
    .get()
    .then((querySnapshot) => {
        if (numItemsToDisp === 1) {
            store.dispatch(actionCreators.setCommonBackdropOff())
        }
        const last = querySnapshot.docs[numItemsToDisp]
        store.dispatch(actionCreators.setSidebarLoadingOff());
        if (last) {
            loadMorePlanetsItems(last, numItemsToDisp)
        }
    });

/**
 * Loads a particular planet's entry
 * @param docID Id of the planet's entry
 * @param onNotFound Optional parameter which is a function that fires redirect if nothing's been found.
 */
export const loadPlanetItemData = (docID: string, onNotFound?:() => void): (() => void) => DBRef
    .collection('planets')
    .doc(docID)
    .onSnapshot((querySnapshot) => {
        if (!querySnapshot.exists && onNotFound) {
            onNotFound()
        } else {
        const planet: Planet = mapPlanet(querySnapshot.data() as PlanetDTO, querySnapshot.id)
        store.dispatch(actionCreators.setPlanetItem(planet))
        }
    })
