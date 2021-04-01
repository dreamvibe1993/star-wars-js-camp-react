import { DBRef } from "../firebase";
export function getCompleteCharactersCollection() {
    return DBRef.collection('people').get();
}
export function getChunkOfCharactersCollection(last, threshholdNumber) {
    return DBRef.collection('people')
        .endAt(last)
        .limit(threshholdNumber)
        .get();
}
export var getCharacterItemDoc = function (docID) { return DBRef
    .collection('people')
    .doc(docID)
    .get(); };
export function getRelevantCharactersCollection(charactersPKsTen) {
    return DBRef.collection('people')
        .where('pk', 'in', charactersPKsTen)
        .get();
}
