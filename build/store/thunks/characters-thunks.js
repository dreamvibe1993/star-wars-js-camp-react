var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mapCharacter } from "../../api/mappers/mapper";
import * as CharactersDataAPI from '../../api/services/load-characters-data-api';
export var lazyloadMoreCharacters = createAsyncThunk('charactersStore/llMoreChars', function (threshholdNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var querySnapshot, lastDocument, limitedQuerySnapshot, characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CharactersDataAPI.getCompleteCharactersCollection()];
            case 1:
                querySnapshot = _a.sent();
                lastDocument = querySnapshot.docs[threshholdNumber];
                return [4 /*yield*/, CharactersDataAPI.getChunkOfCharactersCollection(lastDocument, threshholdNumber)];
            case 2:
                limitedQuerySnapshot = _a.sent();
                if (!limitedQuerySnapshot.empty) {
                    characters = limitedQuerySnapshot.docs.map(function (character) { return mapCharacter(character.data(), character.id); });
                    return [2 /*return*/, characters];
                }
                return [2 /*return*/];
        }
    });
}); });
export var loadCharacterItem = createAsyncThunk('charactersStore/loadCharItem', function (newDocId) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, characterItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CharactersDataAPI.getCharacterItemDoc(newDocId)];
            case 1:
                doc = _a.sent();
                if (doc.exists) {
                    characterItem = mapCharacter(doc.data(), doc.id);
                    return [2 /*return*/, characterItem];
                }
                return [2 /*return*/];
        }
    });
}); }, {
    condition: function (newDocId, _a) {
        var getState = _a.getState;
        var charactersStore = getState().charactersStore;
        var item = charactersStore.characterItem;
        if (item && item.docId === newDocId) {
            return false;
        }
    }
});
export var charactersStoreReducer = createSlice({
    name: 'charactersStore',
    initialState: {
        characters: [],
        characterItem: null,
        numberOfItemsDisplayCharacters: 1,
        itemsToDispCharacters: 1,
        isCharacterLoadingPending: true,
        areCharacterEntitiesLoaded: false,
    },
    reducers: {
        setCharacters: function (state, action) {
            state.characters = action.payload;
        },
        setCharacterItem: function (state, action) {
            state.characterItem = action.payload;
        },
        setNumberOfItemsDisplayCharacters: function (state, action) {
            state.numberOfItemsDisplayCharacters = action.payload;
        },
        discardCharactersItemsAmmount: function (state) {
            state.itemsToDispCharacters = 1;
        },
        addItemsToDisplayCharacters: function (state) {
            state.itemsToDispCharacters += state.numberOfItemsDisplayCharacters;
        },
    },
    extraReducers: function (builder) {
        builder
            .addCase(lazyloadMoreCharacters.fulfilled, function (state, action) {
            if (action.payload) {
                state.areCharacterEntitiesLoaded = true;
                state.characters = action.payload;
            }
        })
            .addCase(loadCharacterItem.fulfilled, function (state, action) {
            state.isCharacterLoadingPending = false;
            if (action.payload) {
                state.characterItem = action.payload;
            }
        })
            .addCase(loadCharacterItem.pending, function (state) {
            state.isCharacterLoadingPending = true;
        })
            .addCase(loadCharacterItem.rejected, function (state) {
            state.isCharacterLoadingPending = false;
        });
    }
});
export var setCharacters = (_a = charactersStoreReducer.actions, _a.setCharacters), setCharacterItem = _a.setCharacterItem, setNumberOfItemsDisplayCharacters = _a.setNumberOfItemsDisplayCharacters, discardCharactersItemsAmmount = _a.discardCharactersItemsAmmount, addItemsToDisplayCharacters = _a.addItemsToDisplayCharacters;
