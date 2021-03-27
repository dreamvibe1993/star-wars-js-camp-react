import { createAction } from '@reduxjs/toolkit';
import { Character } from '../../models/character';
import { Movie } from '../../models/movie';
import { Planet } from '../../models/planet';

/** Sets movies into store */
export const setMovies = createAction<Movie[]>('SET_MOVIES');
/** Sets relevant characters of a movie into store */
export const setRelevChars = createAction<Character[]>('SET_RELEV_CHARS')
/** Sets relevant planets of a movie into store */
export const setRelevPlanets = createAction<Planet[]>('SET_RELEV_PLANETS')
/** Sets people into store */
export const setCharacters = createAction<Character[]>('SET_PEOPLE');
/** Sets planets into store */
export const setPlanets = createAction<Planet[]>('SET_PLANETS');
/** Opens the sidebar */
export const setMovieItem = createAction<Movie>('SET_MOVIE_ITEM');
/** Sets a person entry to display */
export const setPersonItem = createAction<Character>('SET_PERSON_ITEM');
/** Sets a planet entry to display */
export const setPlanetItem = createAction<Planet>('SET_PLANET_ITEM');
/** Adds to the init. amount of people to display in the sidebar */
export const addItemsToDisplayCharacters= createAction('ADD_ITEMS_PEOPLE');
/** Adds to the init. amount of planets to display in the sidebar */
export const addItemsToDisplayPlanets = createAction('ADD_ITEMS_PLANETS');
/** Opens the deletion modal window */
export const setDeletionModalOpen = createAction('SET_DEL_MOD_OPEN');
/** Closes the deletion modal window */
export const setDeletionModalClose = createAction('SET_DEL_MOD_CLOSE');
/** Gets rid of a movie entry if one is deleted */
export const flushMovieItem = createAction('FLUSH_MOVIE_ITEM');
/** Indicates if user is signed in */
export const signUserIn = createAction('SIGN_USER_IN');
/** Indicates if user is signed out */
export const signUserOut = createAction('SIGN_USER_OUT');
/** Set the threshold of people to display in the sidebar */
export const setNumberOfItemsDisplayCharacters = createAction<number>('SET_NUMBER_PEOPLE');
/** Set the threshold of planets to display in the sidebar */
export const setNumberOfItemsDisplayPlanets = createAction<number>('SET_NUMBER_PLANETS');
/** Set the the sidebar loading backdrop on */
export const setSidebarLoadingOn = createAction('SET_SIDEB_LOADING_ON');
/** Set the the sidebar loading backdrop off */
export const setSidebarLoadingOff = createAction('SET_SIDEB_LOADING_OFF');
/** Set the the common loading backdrop on */
export const setCommonBackdropOn = createAction('SET_COMM_LOADING_ON');
/** Set the the common loading backdrop off */
export const setCommonBackdropOff = createAction('SET_COMM_LOADING_OFF');
/** Drops the amount of people entries to display */
export const discardCharactersItemsAmmount = createAction('DISCARD_PEOPLE_AMMOUNT');
/** Drops the amount of planets' entries to display */
export const discardPlanetsItemsAmmount = createAction('DISCARD_PLANETS_AMMOUNT');







