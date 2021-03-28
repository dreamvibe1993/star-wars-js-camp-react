import { createAsyncThunk } from "@reduxjs/toolkit";
import { MoviesDTO } from "../../api/dtos/MovieDTO";
import { mapCharacter, mapMovie, mapPlanet, movieDTOMapper } from "../../api/mappers/mapper";
import * as MoviesDataAPI from '../../api/services/load-movies-data-api'
import * as CharactersDataAPI from '../../api/services/load-characters-data-api'
import * as PlanetsDataAPI from '../../api/services/load-planets-data-api'

import { setCharacters, setMovies, setPlanets } from "../reducer";
import { RootState } from "../store";
import { PlanetDTO } from "../../api/dtos/PlanetDTO";
import { CharacterDTO } from "../../api/dtos/CharacterDTO";
import { MovieTransferValueCreateForm } from "../../models/movies-transfer-value-create-form";


export const subscribeToMovies = createAsyncThunk(
    'movies/loadMovs',
    async (id, thunkAPI) => {
        const moviesCollection = MoviesDataAPI.getMoviesCollection()
        const snapShotTearDown = moviesCollection.onSnapshot((querySnapshot) => {
            const movies = querySnapshot.docs.map(movie => mapMovie(movie.data() as MoviesDTO, movie.id))
            thunkAPI.dispatch(setMovies(movies))
        })
        // return snapShotTearDown
    },
    {
        condition: (id, { getState }) => {
            const { moviesStore } = getState() as RootState
            if (moviesStore.movies.length > 0) {
                return false
            }
        },
        dispatchConditionRejection: true
    }
)

export const loadMovieItem = createAsyncThunk(
    'movies/loadMovItem',
    async (docId: string) => {
        const movieDoc = await MoviesDataAPI.getMovieItemData(docId)
        if (movieDoc.exists) {
            const movie = mapMovie(movieDoc.data() as MoviesDTO, movieDoc.id)
            let relevantCharacters = null; let relevantPlanets = null;
            if (movie.charactersPKs.length > 0) {
                const relevantCharactersDocs = await CharactersDataAPI.getRelevantCharactersCollection(movie.charactersPKs.slice(0, 10))
                relevantCharacters = relevantCharactersDocs.docs.map(character => mapCharacter(character.data() as CharacterDTO, character.id))
            }
            if (movie.planetsPKs.length > 0) {
                const relevantPlanetsDocs = await PlanetsDataAPI.getRelevantPlanetsCollection(movie.planetsPKs.slice(0, 10))
                relevantPlanets = relevantPlanetsDocs.docs.map(planet => mapPlanet(planet.data() as PlanetDTO, planet.id))
            }
            return {movie, relevantCharacters, relevantPlanets}
        }
    }
)

export const loadDataToAddWhenCreating = createAsyncThunk(
    'movies/loadDataToAdd',
    async(id, thunkAPI) => {
        const charactersDocs = await CharactersDataAPI.getCompleteCharactersCollection()
        const planetsDocs = await PlanetsDataAPI.getCompletePlanetsCollection()
        const characters = charactersDocs.docs.map(character => mapCharacter(character.data() as CharacterDTO, character.id))
        const planets = planetsDocs.docs.map(planet => mapPlanet(planet.data() as PlanetDTO, planet.id))
        const state = thunkAPI.getState() as RootState
        if (state.charactersStore.characters.length < 1) {
            thunkAPI.dispatch(setCharacters(characters))
        }
        if (state.planetsStore.planets.length < 1) {
            thunkAPI.dispatch(setPlanets(planets))
        }
    }
)

export const addMovieEntry = createAsyncThunk(
    'movies/addToDb',
    async (MovieDTO: MoviesDTO) => {
        const moviesCollection = await MoviesDataAPI.getMoviesCollection().get()
        const moviesCollectionLastIndex = moviesCollection.docs.length
        MovieDTO.pk = moviesCollectionLastIndex + 1
        MoviesDataAPI.getMoviesCollection().add(MovieDTO)
    }
)


/**load individ movitem */
// .onSnapshot((querySnapshot) => {
//     if (!querySnapshot.exists && onNotFound) {
//         onNotFound()
//     } else {
//         const movie: Movie = mapMovie(querySnapshot.data() as MoviesDTO, querySnapshot.id)
//         loadRelevantCharactersData(movie.charactersPKs)
//         loadRelevantPlanetsData(movie.planetsPKs)
//         store.dispatch(setMovieItem(movie))
//     }
// })


/**
 * Loads chars that are participated in the particular movie
 * @param characters Array of characters' pk to find those.
 */
//  const loadRelevantCharactersData = (charactersPKs: number[]): void => {
//     if (charactersPKs.length > 0) {
//         // The slice's here since the firestore allows only up to 10 items to be requested at once.
//         const charactersPKsTen = charactersPKs.slice(0, 10)
//         DBRef.collection('people')
//             .where('pk', 'in', charactersPKsTen)
//             .get()
//             .then((querySnapshot) => {
//                 const relevantCharacters = querySnapshot.docs
//                     .map(character => mapCharacter(character.data() as CharacterDTO, character.id))
//                 store.dispatch(setRelevChars(relevantCharacters))
//             })
//     }
//     store.dispatch(setRelevChars([]))
// }


/**
 * Loads planets that are participated in the particular movie
 * @param planets Array of planets' pk to find those
 */
//  const loadRelevantPlanetsData = (planetsPKs: number[]): void => {
//     if (planetsPKs.length > 0) {
//         // The slice's here since the firestore allows only up to 10 items to be requested at once.
//         const planetsPKsTen = planetsPKs.slice(0, 10)
//         DBRef.collection('planets')
//             .where('pk', 'in', planetsPKsTen)
//             .get()
//             .then((querySnapshot) => {
//                 const relevantPlanets = querySnapshot.docs
//                     .map(planet => mapPlanet(planet.data() as PlanetDTO, planet.id))
//                 store.dispatch(setRelevPlanets(relevantPlanets))
//             })
//     }
//     store.dispatch(setRelevPlanets([]))
// }


// /** If a user creates an entry that func loads whole set of characters and planets to add into entry. */
// export const loadCharsAndPlanetsToMovieCreate = (): void => {
//     getCollection('people')
//         .then((collection) => {
//             const characters = collection.docs
//                 .map(character => mapCharacter(character.data() as CharacterDTO, character.id))
//             store.dispatch(setCharacters(characters))
//         });
//     getCollection('planets')
//         .then((collection) => {
//             const planets = collection.docs
//                 .map(planet => mapPlanet(planet.data() as PlanetDTO, planet.id))
//             store.dispatch(setPlanets(planets))
//         });
// }