import { DBRef } from '../firebase';
/** Loads partial collection of planets items */
export function getCompletePlanetsCollection() {
    return DBRef
        .collection('planets')
        .get();
}
/**
 * Lazyloads parts of planets items and provides the destructor function
 * @param last Last document to restrict the batch
 * @param threshholdNumber General number of planets items to display
 */
export function getChunkOfPlanetsCollection(last, threshholdNumber) {
    return DBRef.collection('planets')
        .endAt(last)
        .limit(threshholdNumber)
        .get();
}
/**
 * Loads a particular planet's entry
 * @param docID Id of the planet's entry
 */
export var getPlanetItemDoc = function (docID) { return DBRef
    .collection('planets')
    .doc(docID)
    .get(); };
export function getRelevantPlanetsCollection(planetsPKsTen) {
    return DBRef.collection('planets')
        .where('pk', 'in', planetsPKsTen)
        .get();
}
