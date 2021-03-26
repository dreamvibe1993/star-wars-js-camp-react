import firebase from "firebase/app";
import { DBRef } from "../firebase";

import { mapMovieDTOForEdit, movieDTOMapper } from "../mappers/mapper";
import { MovieTransferValueCreateForm } from "../../models/movies-transfer-value-create-form";
import { Movie } from "../../models/movie";
import { MovieTransferValueEditForm } from "../../models/movie-transfer-value-edit-form";

/**
 * Adds an entry into the db.
 * @param formValues Values from a form.
 */
export const addMovieEntry = (formValues: MovieTransferValueCreateForm): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> => DBRef
    .collection('films')
    .get()
    .then(querySnapshot => querySnapshot.docs.length)
    .then(indexNumber => DBRef
        .collection('films')
        .add({ ...movieDTOMapper(formValues, indexNumber) }))


/**
 * Adds data to edit a movie.
 * @param movie Movie item from store.
 * @param formValues Values from a form.
 */
export const editMovieEntry = (movie: Movie, formValues: MovieTransferValueEditForm): Promise<void> => DBRef
    .collection('films')
    .doc(movie.docId)
    .update(mapMovieDTOForEdit(movie, formValues))

