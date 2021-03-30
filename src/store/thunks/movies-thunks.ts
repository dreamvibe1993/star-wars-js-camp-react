import { createAsyncThunk } from "@reduxjs/toolkit";
import { MoviesDTO } from "../../api/dtos/MovieDTO";
import { mapCharacter, mapMovie, mapPlanet, movieDTOMapper } from "../../api/mappers/mapper";
import * as MoviesDataAPI from '../../api/services/load-movies-data-api'
import * as CharactersDataAPI from '../../api/services/load-characters-data-api'
import * as PlanetsDataAPI from '../../api/services/load-planets-data-api'

import { setCharacters, setMovies, setPlanets } from "../reducer";
import { RootState } from "../reducer";
import { PlanetDTO } from "../../api/dtos/PlanetDTO";
import { CharacterDTO } from "../../api/dtos/CharacterDTO";

export let movieSidebarSnapshotTeardown: null | (() => void);

export const subscribeToMovies = createAsyncThunk(
    'movies/loadMovs',
    async (id, thunkAPI) => {
        const moviesCollection = MoviesDataAPI.getMoviesCollection()
        movieSidebarSnapshotTeardown = moviesCollection.onSnapshot(
            (querySnapshot) => {
                const movies = querySnapshot.docs.map(movie => mapMovie(movie.data() as MoviesDTO, movie.id))
                thunkAPI.dispatch(setMovies(movies))
            },
            (error) => console.error(error)
        )
    },
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
            return { movie, relevantCharacters, relevantPlanets }
        }
    }
)

export const loadDataToAddWhenCreating = createAsyncThunk(
    'movies/loadDataToAdd',
    async (id, thunkAPI) => {
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

interface editionArgsProps { MovieDTO: MoviesDTO, docID: string }

export const editMovieEntry = createAsyncThunk(
    'movies/edit',
    async ({ MovieDTO, docID }: editionArgsProps) => {
        MoviesDataAPI.getMoviesCollection().doc(docID).update(MovieDTO)
        return mapMovie(MovieDTO, docID)
    }
)


export const deleteMovieEntry = createAsyncThunk(
    'movies/delete',
    async (docId: string) => MoviesDataAPI.getMoviesCollection().doc(docId).delete()
)

export const searchMovieEntry = createAsyncThunk(
    'movies/search',
    async (title: string) => {
        const movieDocs = await MoviesDataAPI.searchMovieEntity(title)
        if (!movieDocs.empty) {
            return `/films/${movieDocs.docs[movieDocs.docs.length - 1].id}`
        } 
            return '/not-found'
    }
)

// searchMovieEntity(values.title).then((querySnapshot) => {
//     if (!querySnapshot.empty) {
//         querySnapshot.forEach((querySnapshotItem) => {
//             history.push(`/films/${querySnapshotItem.id}`)
//         })
//     } else {
//         history.push('/not-found')
//     }
//     dispatch(setCommonBackdropOff())
// })

//  {
//     history.push("/films")
//     dispatch(setCommonBackdropOn())
//     DBRef.collection('films').doc(entryID)
//         .delete()
//         .then(() => {
//             dispatch(setCommonBackdropOff())
//             console.log('Document successfully deleted!');
//         }).catch((error) => {
//             console.error(error)
//             history.push('/error')
//         })
// }