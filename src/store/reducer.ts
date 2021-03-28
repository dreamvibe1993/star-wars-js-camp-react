import { createSlice, PayloadAction, combineReducers, createAsyncThunk } from '@reduxjs/toolkit'
import { CharacterDTO } from '../api/dtos/CharacterDTO';
import { DBRef } from '../api/firebase';
import { mapCharacter } from '../api/mappers/mapper';
// import { loadCharactersData, loadMoreCharactersItems } from '../api/services/load-characters-data';
import { Character } from '../models/character';
import { Movie } from '../models/movie';
import { Planet } from '../models/planet';
import { AuthStateRootState, CharactersStore, ComponentsRootState, MoviesStore, PlanetsStore } from './redux-store-state';
import { store } from './store';
import { lazyloadMoreCharacters, loadCharacterItem } from './thunks/characters-thunks';
import { addMovieEntry, loadDataToAddWhenCreating, loadMovieItem, subscribeToMovies } from './thunks/movies-thunks';
import { lazyloadMorePlanets, loadPlanetItem } from './thunks/planets-thunks';


const moviesStoreReducer = createSlice({
    name: 'moviesStore',
    initialState: {
        movies: [],
        relevantCharacters: [],
        relevantPlanets: [],
        movieItem: null,
        isMovieLoadingPending: true,
        areEntitiesLoading: false,
        isEntityBeingAdded: false,
    } as MoviesStore,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
        setRelevChars: (state, action: PayloadAction<Character[]>) => {
            state.relevantCharacters = action.payload;
        },
        setRelevPlanets: (state, action: PayloadAction<Planet[]>) => {
            state.relevantPlanets = action.payload;
        },
        setMovieItem: (state, action: PayloadAction<Movie>) => {
            state.movieItem = action.payload
        },
        flushMovieItem: state => {
            state.movieItem = null
        },
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
            .addCase(loadMovieItem.pending, (state) => {
                state.isMovieLoadingPending = true;
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
    }


})

export const { setMovies, setRelevChars, setRelevPlanets, setMovieItem, flushMovieItem } = moviesStoreReducer.actions

const charactersStoreReducer = createSlice({
    name: 'charactersStore',
    initialState: {
        characters: [],
        characterItem: null,
        numberOfItemsDisplayCharacters: 1,
        itemsToDispCharacters: 1,
        isCharacterLoadingPending: true
    } as CharactersStore,
    reducers: {
        setCharacters: (state, action: PayloadAction<Character[]>) => {
            state.characters = action.payload;
        },
        setCharacterItem: (state, action: PayloadAction<Character>) => {
            state.characterItem = action.payload
        },
        setNumberOfItemsDisplayCharacters: (state, action: PayloadAction<number>) => {
            state.numberOfItemsDisplayCharacters = action.payload
        },
        discardCharactersItemsAmmount: (state) => {
            state.itemsToDispCharacters = 1
        },
        addItemsToDisplayCharacters: (state) => {
            state.itemsToDispCharacters += state.numberOfItemsDisplayCharacters
        },
    },
    extraReducers: builder => {
        builder
            .addCase(lazyloadMoreCharacters.fulfilled, (state, action) => {
                if (action.payload) {
                    state.characters = action.payload;
                }
            })
            .addCase(loadCharacterItem.fulfilled, (state, action) => {
                state.isCharacterLoadingPending = false
                if (action.payload) {
                    state.characterItem = action.payload
                }
            })
            .addCase(loadCharacterItem.pending, (state) => {
                state.isCharacterLoadingPending = true
            })
            .addCase(loadCharacterItem.rejected, (state) => {
                state.isCharacterLoadingPending = false
            })
    }

})

export const {
    setCharacters,
    setCharacterItem,
    setNumberOfItemsDisplayCharacters,
    discardCharactersItemsAmmount,
    addItemsToDisplayCharacters
} = charactersStoreReducer.actions

const planetsStoreReducer = createSlice({
    name: 'planetsStore',
    initialState: {
        planets: [],
        planetItem: null,
        numberOfItemsDisplayPlanets: 1,
        itemsToDispPlanets: 1,
        isPlanetLoadingPending: true
    } as PlanetsStore,
    reducers: {
        setPlanets: (state, action: PayloadAction<Planet[]>) => {
            state.planets = action.payload;
        },
        setPlanetItem: (state, action: PayloadAction<Planet>) => {
            state.planetItem = action.payload
        },
        setNumberOfItemsDisplayPlanets: (state, action: PayloadAction<number>) => {
            state.numberOfItemsDisplayPlanets = action.payload
        },
        discardPlanetsItemsAmmount: (state) => {
            state.itemsToDispPlanets = 1
        },
        addItemsToDisplayPlanets: (state) => {
            state.itemsToDispPlanets += state.numberOfItemsDisplayPlanets
        },
    },
    extraReducers: builder => {
        builder
            .addCase(lazyloadMorePlanets.fulfilled, (state, action) => {
                if (action.payload) {
                    state.planets = action.payload;
                }
            })
            .addCase(loadPlanetItem.fulfilled, (state, action) => {
                state.isPlanetLoadingPending = false
                if (action.payload) {
                    state.planetItem = action.payload
                }
            })
            .addCase(loadPlanetItem.pending, (state) => {
                state.isPlanetLoadingPending = true
            })
            .addCase(loadPlanetItem.rejected, (state) => {
                state.isPlanetLoadingPending = false
            })
    }
})

export const {
    setPlanets,
    setPlanetItem,
    setNumberOfItemsDisplayPlanets,
    discardPlanetsItemsAmmount,
    addItemsToDisplayPlanets
} = planetsStoreReducer.actions;

const componentsStateReducer = createSlice({
    name: 'componentsState',
    initialState: {
        isDeletionConfirmationOpen: false,
        isSidebarLoading: false,
        isCommonLoadingBckDropOn: false,
        redirectTo404: false,
    } as ComponentsRootState,
    reducers: {
        setDeletionModalOpen: (state) => {
            state.isDeletionConfirmationOpen = true
        },
        setDeletionModalClose: (state) => {
            state.isDeletionConfirmationOpen = false
        },
        setSidebarLoadingOn: (state) => {
            state.isSidebarLoading = true
        },
        setSidebarLoadingOff: (state) => {
            state.isSidebarLoading = false
        },
        setCommonBackdropOn: (state) => {
            state.isCommonLoadingBckDropOn = true
        },
        setCommonBackdropOff: (state) => {
            state.isCommonLoadingBckDropOn = false
        },
    },
    extraReducers: builder => {
        builder
            .addCase(lazyloadMoreCharacters.pending, (state) => {
                state.isSidebarLoading = true
            })
            .addCase(lazyloadMoreCharacters.rejected, (state) => {
                state.isSidebarLoading = false
            })
            .addCase(lazyloadMoreCharacters.fulfilled, (state) => {
                state.isSidebarLoading = false
            })
            .addCase(lazyloadMorePlanets.pending, (state) => {
                state.isSidebarLoading = true
            })
            .addCase(lazyloadMorePlanets.rejected, (state) => {
                state.isSidebarLoading = false
            })
            .addCase(lazyloadMorePlanets.fulfilled, (state) => {
                state.isSidebarLoading = false
            })
    }
})

export const {
    setDeletionModalOpen,
    setDeletionModalClose,
    setSidebarLoadingOn,
    setSidebarLoadingOff,
    setCommonBackdropOn,
    setCommonBackdropOff
} = componentsStateReducer.actions;

export enum UserSignInStatus {
    Pending = 2,
    Authorised = 1,
    Unauthorised = 0,
}

const authStateReducer = createSlice({
    name: 'authState',
    initialState: {
        isUserSignedIn: UserSignInStatus.Pending,
    } as AuthStateRootState,
    reducers: {
        signUserIn: (state) => {
            state.isUserSignedIn = UserSignInStatus.Authorised
        },
        signUserOut: (state) => {
            state.isUserSignedIn = UserSignInStatus.Unauthorised
        },
    },
})

export const {
    signUserIn,
    signUserOut,
} = authStateReducer.actions;

export const reducer = combineReducers({
    componentsState: componentsStateReducer.reducer,
    moviesStore: moviesStoreReducer.reducer,
    planetsStore: planetsStoreReducer.reducer,
    charactersStore: charactersStoreReducer.reducer,
    authState: authStateReducer.reducer,
})

