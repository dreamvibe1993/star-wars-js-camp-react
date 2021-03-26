import firebase from "firebase/app";
import { DBRef } from "../firebase";

import { store } from "../../store/store";
import { Movie } from "../../models/movie";
import { MoviesDTO } from "../dtos/MovieDTO";
import { Person } from "../../models/person";
import { PersonDTO } from "../dtos/PersonDTO";
import { Planet } from "../../models/planet";
import { PlanetDTO } from "../dtos/PlanetDTO";

import { mapMovie, mapPerson, mapPlanet } from "../mappers/mapper";
import * as actionCreators from '../../store/action-creators/action-creators'
import { getCollection } from "./get-collection";


/** Loads whole movies' collection */
export const loadMoviesData = (): (() => void) => DBRef
    .collection('films')
    .onSnapshot((querySnapshot) => {
        const movies: Movie[] = [];
        querySnapshot.forEach(doc => {
            movies.push(mapMovie(doc.data() as MoviesDTO, doc.id));
        })
        store.dispatch(actionCreators.setCommonBackdropOff())
        store.dispatch(actionCreators.setMovies(movies))
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
                const relevantCharacters: Person[] = [];
                querySnapshot.forEach((doc) => {
                    relevantCharacters.push(mapPerson(doc.data() as PersonDTO, doc.id));
                })
                store.dispatch(actionCreators.setRelevChars(relevantCharacters))
            })
    }
    store.dispatch(actionCreators.setRelevChars([]))
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
                const relevantPlanets: Planet[] = [];
                querySnapshot.forEach((doc) => {
                    relevantPlanets.push(mapPlanet(doc.data() as PlanetDTO, doc.id));
                })
                store.dispatch(actionCreators.setRelevPlanets(relevantPlanets))
            })
    }
    store.dispatch(actionCreators.setRelevPlanets([]))
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
            store.dispatch(actionCreators.setMovieItem(movie))
        }
    })

/** If a user creates an entry that func loads whole set of characters and planets to add into entry. */
export const loadCharsAndPlanetsToMovieCreate = (): void => {
    getCollection('people').then((collection) => {
        const people: Person[] = []
        collection.forEach(person => {
            people.push(mapPerson(person.data() as PersonDTO, person.id))
        })
        store.dispatch(actionCreators.setPeople(people as Person[]))
    });
    getCollection('planets').then((collection) => {
        const planets: Planet[] = []
        collection.forEach(planet => {
            planets.push(mapPlanet(planet.data() as PlanetDTO, planet.id))
        })
        store.dispatch(actionCreators.setPlanets(planets as Planet[]))
    });
}

export const searchMovieEntity = (title: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => DBRef
    .collection('films')
    .where('fields.title', '==', title)
    .get()
