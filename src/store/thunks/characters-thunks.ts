/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterDTO } from "../../api/dtos/CharacterDTO";
import { mapCharacter } from "../../api/mappers/mapper";
import { Character } from "../../models/character";
import * as CharactersDataAPI from '../../api/services/load-characters-data-api'
import { RootState } from "./store";

export const lazyloadMoreCharacters = createAsyncThunk(
    'charactersStore/llMoreChars',
    async (threshholdNumber: number) => {
        const querySnapshot = await CharactersDataAPI.getCompleteCharactersCollection()
        const lastDocument = querySnapshot.docs[threshholdNumber]
        const limitedQuerySnapshot = await CharactersDataAPI.getChunkOfCharactersCollection(lastDocument, threshholdNumber)
        if (!limitedQuerySnapshot.empty) {
            const characters = limitedQuerySnapshot.docs.map(character => mapCharacter(character.data() as CharacterDTO, character.id));
            return characters
        }
    }
)

export const loadCharacterItem = createAsyncThunk(
    'charactersStore/loadCharItem',
    async (newDocId: string) => {
        const doc = await CharactersDataAPI.getCharacterItemDoc(newDocId)
        if (doc.exists) {
            const characterItem = mapCharacter(doc.data() as CharacterDTO, doc.id)
            return characterItem
        }
    },
    {
        condition: (newDocId, { getState }) => {
            const { charactersStore } = getState() as RootState
            const item = charactersStore.characterItem
            if (item && item.docId === newDocId) {
                return false;
            }
        }
    }
)

/** People store */
export interface CharactersStore {
    /** Characters that are disp. in the sidebar */
    characters: Character[];
    /** Planet item to display */
    characterItem: Character | null;
    /** Amount of planets items to display in the sidebar */
    itemsToDispCharacters: number;
    /** Threshold of planets to display in the sidebar */
    numberOfItemsDisplayCharacters: number;

    isCharacterLoadingPending: boolean;

    areCharacterEntitiesLoaded: boolean;    
}


export const charactersStoreReducer = createSlice({
    name: 'charactersStore',
    initialState: {
        characters: [],
        characterItem: null,
        numberOfItemsDisplayCharacters: 1,
        itemsToDispCharacters: 1,
        isCharacterLoadingPending: true,
        areCharacterEntitiesLoaded: false,
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
                    state.areCharacterEntitiesLoaded = true;
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