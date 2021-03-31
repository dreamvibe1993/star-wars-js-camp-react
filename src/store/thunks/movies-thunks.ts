/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterDTO } from "../../api/dtos/CharacterDTO";
import { MoviesDTO } from "../../api/dtos/MovieDTO";
import { PlanetDTO } from "../../api/dtos/PlanetDTO";
import { mapMovie, mapCharacter, mapPlanet } from "../../api/mappers/mapper";
import { Character } from "../../models/character";
import { Planet } from "../../models/planet";
import * as MoviesDataAPI from '../../api/services/load-movies-data-api'
import * as CharactersDataAPI from '../../api/services/load-characters-data-api'
import * as PlanetsDataAPI from '../../api/services/load-planets-data-api'

import { Movie } from "../../models/movie";
import { setCharacters } from "./characters-thunks";
import { setPlanets } from "./planets-thunks";
import { RootState } from "./store";


/** Movies store */
export interface MoviesStore {
    /** Movies that are disp. in the sidebar */
    movies: Movie[];
    /** Rel. charaters of a movie item */
    relevantCharacters: Character[] | null;
    /** Rel. planets of a movie item */
    relevantPlanets: Planet[] | null;
    /** Movie item to display */
    movieItem: Movie | null;

    isMovieLoadingPending: boolean;

    areEntitiesLoading: boolean;

    isEntityBeingAdded: boolean;

    isEntityBeingDeleted: boolean;

    redirectLink: string | null;

    areMovieEntitiesLoaded: boolean;
}

// eslint-disable-next-line import/no-mutable-exports
export let movieSidebarSnapshotTeardown: null | (() => void);



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
        return null
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

export const moviesStoreReducer = createSlice({
    name: 'moviesStore',
    initialState: {
        movies: [],
        relevantCharacters: [],
        relevantPlanets: [],
        movieItem: null,
        isMovieLoadingPending: true,
        areEntitiesLoading: false,
        isEntityBeingAdded: false,
        isEntityBeingDeleted: false,
        redirectLink: null,
        areMovieEntitiesLoaded: false,
    } as MoviesStore,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            if (action.payload) {
                state.movies = action.payload;
                state.areMovieEntitiesLoaded = true;
            }
            
        },
        setRelevChars: (state, action: PayloadAction<Character[] | null>) => {
            state.relevantCharacters = action.payload;
        },
        setRelevPlanets: (state, action: PayloadAction<Planet[] | null>) => {
            state.relevantPlanets = action.payload;
        },
        setMovieItem: (state, action: PayloadAction<Movie>) => {
            state.movieItem = action.payload
        },
        flushMovieItem: state => {
            state.movieItem = null
        },
        setMovieLoadingPending: (state, action) => {
            state.isMovieLoadingPending = action.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(loadMovieItem.fulfilled, (state, action) => {
        state.isMovieLoadingPending = false;
                if (action.payload) {
                    state.movieItem = action.payload.movie
                    state.relevantCharacters = action.payload.relevantCharacters
                    state.relevantPlanets = action.payload.relevantPlanets
                }
            })
            .addCase(loadDataToAddWhenCreating.pending, (state) => {
                state.areEntitiesLoading = true;
            })
            .addCase(loadDataToAddWhenCreating.fulfilled, (state) => {
                state.areEntitiesLoading = false;
            })
            .addCase(loadDataToAddWhenCreating.rejected, (state) => {
                state.areEntitiesLoading = false;
            })
            .addCase(addMovieEntry.pending, (state) => {
                state.isEntityBeingAdded = true;
            })
            .addCase(addMovieEntry.fulfilled, (state) => {
                state.isEntityBeingAdded = false;
            })
            .addCase(editMovieEntry.fulfilled, (state, action) => {
                state.movieItem = action.payload
            })
            .addCase(deleteMovieEntry.pending, (state) => {
                state.isEntityBeingDeleted = true
            })
            .addCase(deleteMovieEntry.fulfilled, (state) => {
                state.movieItem = null
                state.isEntityBeingDeleted = false
                state.isMovieLoadingPending = true
            })
            .addCase(searchMovieEntry.pending, (state) => {
                state.redirectLink = null
            })
            .addCase(searchMovieEntry.fulfilled, (state, action) => {
                state.redirectLink = action.payload
            })
            .addCase(searchMovieEntry.rejected, (state) => {
                state.redirectLink = `/not-found`
            })
    }


})

export const { setMovies, setRelevChars, setRelevPlanets, setMovieItem, flushMovieItem, setMovieLoadingPending } = moviesStoreReducer.actions

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