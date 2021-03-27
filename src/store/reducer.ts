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
import { lazyloadMoreCharacters } from './thunks';

const moviesStoreReducer = createSlice({
    name: 'moviesStore',
    initialState: {
        movies: [],
        relevantCharacters: [],
        relevantPlanets: [],
        movieItem: null,
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


})

export const { setMovies, setRelevChars, setRelevPlanets, setMovieItem, flushMovieItem } = moviesStoreReducer.actions


// .then((limitedQuerySnapshot) => {
//     if (!limitedQuerySnapshot.empty) {
//         const characters = limitedQuerySnapshot.docs.map(character => mapCharacter(character.data() as CharacterDTO, character.id));
//         store.dispatch(setCharacters(characters));
//     }
// });
// }
// )
// loadMoreCharactersItems(last, numberOfItemsToDisplay)
// .then(() => dispatch(setSidebarLoadingOff()))

const charactersStoreReducer = createSlice({
    name: 'charactersStore',
    initialState: {
        characters: [],
        characterItem: null,
        numberOfItemsDisplayCharacters: 1,
        itemsToDispCharacters: 1,
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
    }
    // thunkAPI.dispatch(setCharacters(characters));

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
            .addCase(lazyloadMoreCharacters.pending, (state, action) => {
                state.isSidebarLoading = true
            })
            .addCase(lazyloadMoreCharacters.rejected, (state, action) => {
                state.isSidebarLoading = false
            })
            .addCase(lazyloadMoreCharacters.fulfilled, (state, action) => {
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

