import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authStateReducer } from "./redux-slices/auth";
import { charactersStoreReducer } from "./redux-slices/characters";
import { componentsStateReducer } from "./redux-slices/components";
import { moviesStoreReducer } from "./redux-slices/movies";
import { planetsStoreReducer } from "./redux-slices/planets";

export const reducer = combineReducers({
    componentsState: componentsStateReducer.reducer,
    moviesStore: moviesStoreReducer.reducer,
    planetsStore: planetsStoreReducer.reducer,
    charactersStore: charactersStoreReducer.reducer,
    authState: authStateReducer.reducer,
  })
 
const store = configureStore({ reducer });
// eslint-disable-next-line import/no-default-export
export default store
