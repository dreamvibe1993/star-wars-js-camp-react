import { createAsyncThunk } from "@reduxjs/toolkit";
import { CharacterDTO } from "../../api/dtos/CharacterDTO";
import { mapCharacter } from "../../api/mappers/mapper";
import * as CharactersDataAPI from '../../api/services/load-characters-data-api'
import { RootState } from "../store";

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



