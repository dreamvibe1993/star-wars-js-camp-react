import firebase from "firebase/app";
import { DBRef } from "../firebase";

import { store } from "../../store/store";
import { Movie } from "../../models/movie";
import { MoviesDTO } from "../dtos/MovieDTO";
import { CharacterDTO } from "../dtos/CharacterDTO";
import { PlanetDTO } from "../dtos/PlanetDTO";

import { mapMovie, mapCharacter, mapPlanet } from "../mappers/mapper";
import { getCollection } from "./get-collection";
import { setCharacters, setMovieItem, setMovies, setPlanets, setRelevChars, setRelevPlanets } from "../../store/reducer";


/** Loads whole movies' collection */
export const loadMoviesData = (): (() => void) => DBRef
    .collection('films')
    .onSnapshot((querySnapshot) => {
        const movies = querySnapshot.docs
            .map(movie => mapMovie(movie.data() as MoviesDTO, movie.id))
        store.dispatch(setMovies(movies))
    })

/** 
 * Loads chars that are participated in the particular movie
 * @param characters Array of characters' pk to find those.
 */
const loadRelevantCharactersData = (charactersPKs: number[]): void => {
    if (charactersPKs.length > 0) {
        // The slice's here since the firestore allows only up to 10 items to be requested at once.
        const charactersPKsTen = charactersPKs.slice(0, 10)
        DBRef.collection('people')
            .where('pk', 'in', charactersPKsTen)
            .get()
            .then((querySnapshot) => {
                const relevantCharacters = querySnapshot.docs
                    .map(character => mapCharacter(character.data() as CharacterDTO, character.id))
                store.dispatch(setRelevChars(relevantCharacters))
            })
    }
    store.dispatch(setRelevChars([]))
}

/** 
 * Loads planets that are participated in the particular movie
 * @param planets Array of planets' pk to find those
 */
const loadRelevantPlanetsData = (planetsPKs: number[]): void => {
    if (planetsPKs.length > 0) {
        // The slice's here since the firestore allows only up to 10 items to be requested at once.
        const planetsPKsTen = planetsPKs.slice(0, 10)
        DBRef.collection('planets')
            .where('pk', 'in', planetsPKsTen)
            .get()
            .then((querySnapshot) => {
                const relevantPlanets = querySnapshot.docs
                    .map(planet => mapPlanet(planet.data() as PlanetDTO, planet.id))
                store.dispatch(setRelevPlanets(relevantPlanets))
            })
    }
    store.dispatch(setRelevPlanets([]))
}

/**
 * Loads a particular movie entry
 * @param docID Id of the movie entry
 * @param onNotFound Optional parameter which is a function that fires redirect if nothing's been found.
 */
export const loadMovieItemData = (docID: string, onNotFound?: () => void): (() => void) => DBRef
    .collection('films')
    .doc(docID)
    .onSnapshot((querySnapshot) => {
        if (!querySnapshot.exists && onNotFound) {
            onNotFound()
        } else {
            const movie: Movie = mapMovie(querySnapshot.data() as MoviesDTO, querySnapshot.id)
            loadRelevantCharactersData(movie.charactersPKs)
            loadRelevantPlanetsData(movie.planetsPKs)
            store.dispatch(setMovieItem(movie))
        }
    })

/** If a user creates an entry that func loads whole set of characters and planets to add into entry. */
export const loadCharsAndPlanetsToMovieCreate = (): void => {
    getCollection('people')
        .then((collection) => {
            const characters = collection.docs
                .map(character => mapCharacter(character.data() as CharacterDTO, character.id))
            store.dispatch(setCharacters(characters))
        });
    getCollection('planets')
        .then((collection) => {
            const planets = collection.docs
                .map(planet => mapPlanet(planet.data() as PlanetDTO, planet.id))
            store.dispatch(setPlanets(planets))
        });
}

export const searchMovieEntity = (title: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => DBRef
    .collection('films')
    .where('fields.title', '==', title)
    .get()
