import { combineReducers } from "@reduxjs/toolkit";
import { authStateReducer } from "./auth-thunks";
import { charactersStoreReducer } from "./characters-thunks";
import { componentsStateReducer } from "./components-thunks";
import { moviesStoreReducer } from "./movies-thunks";
import { planetsStoreReducer } from "./planets-thunks";

export const reducer = combineReducers({
    componentsState: componentsStateReducer.reducer,
    moviesStore: moviesStoreReducer.reducer,
    planetsStore: planetsStoreReducer.reducer,
    charactersStore: charactersStoreReducer.reducer,
    authState: authStateReducer.reducer,
  })