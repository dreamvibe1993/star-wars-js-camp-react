/* eslint-disable no-param-reassign */
import { combineReducers, createReducer } from '@reduxjs/toolkit';
import * as actionCreators from './action-creators/action-creators';
import { AuthStateRootState, ComponentsRootState, DataStoreRootState } from '../models/redux-store-state';

const dataStoreInitialState: DataStoreRootState = {
    films: [],
    relevantCharacters: [],
    relevantPlanets: [],
    people: [],
    planets: [],
    movieItem: null,
    planetItem: null,
    personItem: null,
    numberOfItemsDisplayPeople: 1,
    numberOfItemsDisplayPlanets: 1,
    itemsToDispPeople: 1,
    itemsToDispPlanets: 1,
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


/** Store where all loaded data is being saved */
export const dataStoreReducer = createReducer(dataStoreInitialState, builder => {
    builder
        .addCase(actionCreators.setMovies, (state, action) => {
            state.films = action.payload;
        })
        .addCase(actionCreators.setRelevChars, (state, action) => {
            state.relevantCharacters = action.payload;
        })
        .addCase(actionCreators.setRelevPlanets, (state, action) => {
            state.relevantPlanets = action.payload;
        })
        .addCase(actionCreators.setPeople, (state, action) => {
            state.people = action.payload;
        })
        .addCase(actionCreators.setPlanets, (state, action) => {
            state.planets = action.payload;
        })
        .addCase(actionCreators.setMovieItem, (state, action) => {
            state.movieItem = action.payload
        })
        .addCase(actionCreators.setPlanetItem, (state, action) => {
            state.planetItem = action.payload
        })
        .addCase(actionCreators.setPersonItem, (state, action) => {
            state.personItem = action.payload
        })
        .addCase(actionCreators.setNumberOfItemsDisplayPeople, (state, action) => {
            state.numberOfItemsDisplayPeople = action.payload
        })
        .addCase(actionCreators.setNumberOfItemsDisplayPlanets, (state, action) => {
            state.numberOfItemsDisplayPlanets = action.payload
        })
        .addCase(actionCreators.discardPeopleItemsAmmount, (state) => {
            state.itemsToDispPeople = 1
        })
        .addCase(actionCreators.discardPlanetsItemsAmmount, (state) => {
            state.itemsToDispPlanets = 1
        })
        .addCase(actionCreators.addItemsToDisplayPeople, (state) => {
            state.itemsToDispPeople += state.numberOfItemsDisplayPeople
        })
        .addCase(actionCreators.addItemsToDisplayPlanets, (state) => {
            state.itemsToDispPlanets += state.numberOfItemsDisplayPlanets
        })
        .addCase(actionCreators.flushMovieItem, (state) => {
            state.movieItem = null
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
    dataStore: dataStoreReducer,
    authState: authStateReducer,
})

