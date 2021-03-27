/* eslint-disable no-param-reassign */
import { combineReducers, createReducer } from '@reduxjs/toolkit';

import { 
    AuthStateRootState, 
    ComponentsRootState, 
    MoviesStore, 
    CharactersStore, 
    PlanetsStore 
} from './redux-store-state';

import * as actionCreators from './action-creators/action-creators';

const moviesStoreInitialState: MoviesStore = {
    movies: [],
    relevantCharacters: [],
    relevantPlanets: [],
    movieItem: null,
}

const planetsStoreInitialState: PlanetsStore = {
    planets: [],
    planetItem: null,
    numberOfItemsDisplayPlanets: 1,
    itemsToDispPlanets: 1,
}

const charactersStoreInitialState: CharactersStore = {
    characters: [],
    characterItem: null,
    numberOfItemsDisplayCharacters: 1,
    itemsToDispCharacters: 1,
}

const componentsInitialState: ComponentsRootState = {
    isDeletionConfirmationOpen: false,
    isSidebarLoading: false,
    isCommonLoadingBckDropOn: false,
}

export enum UserSignInStatus {
    Unauthorised = 0,
    Pending = 2,
    Authorised = 1
}

const authState: AuthStateRootState = {
    isUserSignedIn: UserSignInStatus.Pending,
}

/** Movies store reducer */
export const moviesStoreReducer = createReducer(moviesStoreInitialState, builder => {
    builder
        .addCase(actionCreators.setMovies, (state, action) => {
            state.movies = action.payload;
        })
        .addCase(actionCreators.setRelevChars, (state, action) => {
            state.relevantCharacters = action.payload;
        })
        .addCase(actionCreators.setRelevPlanets, (state, action) => {
            state.relevantPlanets = action.payload;
        })
        .addCase(actionCreators.setMovieItem, (state, action) => {
            state.movieItem = action.payload
        })
        .addCase(actionCreators.flushMovieItem, (state) => {
            state.movieItem = null
        })
})

/** People store reducer */
export const charactersStoreReducer = createReducer(charactersStoreInitialState, builder => {
    builder
        .addCase(actionCreators.setCharacters, (state, action) => {
            state.characters = action.payload;
        })
        .addCase(actionCreators.setPersonItem, (state, action) => {
            state.characterItem = action.payload
        })
        .addCase(actionCreators.setNumberOfItemsDisplayCharacters, (state, action) => {
            state.numberOfItemsDisplayCharacters = action.payload
        })
        .addCase(actionCreators.discardCharactersItemsAmmount, (state) => {
            state.itemsToDispCharacters = 1
        })
        .addCase(actionCreators.addItemsToDisplayCharacters, (state) => {
            state.itemsToDispCharacters += state.numberOfItemsDisplayCharacters
        })
})

/** Planets store reducer */
export const planetsStoreReducer = createReducer(planetsStoreInitialState, builder => {
    builder
        .addCase(actionCreators.setPlanets, (state, action) => {
            state.planets = action.payload;
        })
        .addCase(actionCreators.setPlanetItem, (state, action) => {
            state.planetItem = action.payload
        })
        .addCase(actionCreators.setNumberOfItemsDisplayPlanets, (state, action) => {
            state.numberOfItemsDisplayPlanets = action.payload
        })
        .addCase(actionCreators.discardPlanetsItemsAmmount, (state) => {
            state.itemsToDispPlanets = 1
        })
        .addCase(actionCreators.addItemsToDisplayPlanets, (state) => {
            state.itemsToDispPlanets += state.numberOfItemsDisplayPlanets
        })
})

/** Misc component's state store */
export const componentsStateReducer = createReducer(componentsInitialState, builder => {
    builder
        .addCase(actionCreators.setDeletionModalOpen, (state) => {
            state.isDeletionConfirmationOpen = true
        })
        .addCase(actionCreators.setDeletionModalClose, (state) => {
            state.isDeletionConfirmationOpen = false
        })
        .addCase(actionCreators.setSidebarLoadingOn, (state) => {
            state.isSidebarLoading = true
        })
        .addCase(actionCreators.setSidebarLoadingOff, (state) => {
            state.isSidebarLoading = false
        })
        .addCase(actionCreators.setCommonBackdropOn, (state) => {
            state.isCommonLoadingBckDropOn = true
        })
        .addCase(actionCreators.setCommonBackdropOff, (state) => {
            state.isCommonLoadingBckDropOn = false
        })
})

/** User's authorization state */
export const authStateReducer = createReducer(authState, builder => {
    builder
        .addCase(actionCreators.signUserIn, (state) => {
            state.isUserSignedIn = UserSignInStatus.Authorised
        })
        .addCase(actionCreators.signUserOut, (state) => {
            state.isUserSignedIn = UserSignInStatus.Unauthorised
        })
})

export const reducer = combineReducers({
    componentsState: componentsStateReducer,
    moviesStore: moviesStoreReducer,
    planetsStore: planetsStoreReducer,
    charactersStore: charactersStoreReducer,
    authState: authStateReducer,
})

