import { DBRef } from "../firebase";
/** Loads whole movies' collection */
export function getMoviesCollection() {
    return DBRef.collection('films');
}
/**
 * Loads a particular movie entry
 * @param docID Id of the movie entry
 */
export function getMovieItemData(docID) {
    return DBRef.collection('films').doc(docID).get();
}
export function searchMovieEntity(title) {
    return DBRef.collection('films').where('fields.title', '==', title).get();
}
