import { createAsyncThunk } from "@reduxjs/toolkit";
import { CharacterDTO } from "../api/dtos/CharacterDTO";
import { DBRef } from "../api/firebase";
import { mapCharacter } from "../api/mappers/mapper";
import * as CharactersDataAPI from '../api/services/load-characters-data-api'
import { setCharacters, setSidebarLoadingOff, setSidebarLoadingOn } from "./reducer";

export const lazyloadMoreCharacters = createAsyncThunk(
    'users/llMoreChars',
    async (threshholdNumber: number, thunkAPI) => {
        const querySnapshot = await CharactersDataAPI.getCompleteCharactersCollection()
        const lastDocument = querySnapshot.docs[threshholdNumber]
        const limitedQuerySnapshot = await CharactersDataAPI.getChunkOfCharactersCollection(lastDocument, threshholdNumber)
        if (!limitedQuerySnapshot.empty) {
            const characters = limitedQuerySnapshot.docs.map(character => mapCharacter(character.data() as CharacterDTO, character.id));
            return characters
        }
        // return characters
    }
)


