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
import { mapMovie, mapCharacter, mapPlanet } from "../../api/mappers/mapper";
import * as MoviesDataAPI from '../../api/services/load-movies-data-api';
import * as CharactersDataAPI from '../../api/services/load-characters-data-api';
import * as PlanetsDataAPI from '../../api/services/load-planets-data-api';
import { setCharacters } from "./characters-thunks";
import { setPlanets } from "./planets-thunks";
// eslint-disable-next-line import/no-mutable-exports
export var movieSidebarSnapshotTeardown;
export var loadMovieItem = createAsyncThunk('movies/loadMovItem', function (docId) { return __awaiter(void 0, void 0, void 0, function () {
    var movieDoc, movie, relevantCharacters, relevantPlanets, relevantCharactersDocs, relevantPlanetsDocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MoviesDataAPI.getMovieItemData(docId)];
            case 1:
                movieDoc = _a.sent();
                if (!movieDoc.exists) return [3 /*break*/, 6];
                movie = mapMovie(movieDoc.data(), movieDoc.id);
                relevantCharacters = null;
                relevantPlanets = null;
                if (!(movie.charactersPKs.length > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, CharactersDataAPI.getRelevantCharactersCollection(movie.charactersPKs.slice(0, 10))];
            case 2:
                relevantCharactersDocs = _a.sent();
                relevantCharacters = relevantCharactersDocs.docs.map(function (character) { return mapCharacter(character.data(), character.id); });
                _a.label = 3;
            case 3:
                if (!(movie.planetsPKs.length > 0)) return [3 /*break*/, 5];
                return [4 /*yield*/, PlanetsDataAPI.getRelevantPlanetsCollection(movie.planetsPKs.slice(0, 10))];
            case 4:
                relevantPlanetsDocs = _a.sent();
                relevantPlanets = relevantPlanetsDocs.docs.map(function (planet) { return mapPlanet(planet.data(), planet.id); });
                _a.label = 5;
            case 5: return [2 /*return*/, { movie: movie, relevantCharacters: relevantCharacters, relevantPlanets: relevantPlanets }];
            case 6: return [2 /*return*/, null];
        }
    });
}); });
export var loadDataToAddWhenCreating = createAsyncThunk('movies/loadDataToAdd', function (id, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    var charactersDocs, planetsDocs, characters, planets, state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CharactersDataAPI.getCompleteCharactersCollection()];
            case 1:
                charactersDocs = _a.sent();
                return [4 /*yield*/, PlanetsDataAPI.getCompletePlanetsCollection()];
            case 2:
                planetsDocs = _a.sent();
                characters = charactersDocs.docs.map(function (character) { return mapCharacter(character.data(), character.id); });
                planets = planetsDocs.docs.map(function (planet) { return mapPlanet(planet.data(), planet.id); });
                state = thunkAPI.getState();
                if (state.charactersStore.characters.length < 1) {
                    thunkAPI.dispatch(setCharacters(characters));
                }
                if (state.planetsStore.planets.length < 1) {
                    thunkAPI.dispatch(setPlanets(planets));
                }
                return [2 /*return*/];
        }
    });
}); });
export var addMovieEntry = createAsyncThunk('movies/addToDb', function (MovieDTO) { return __awaiter(void 0, void 0, void 0, function () {
    var moviesCollection, moviesCollectionLastIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MoviesDataAPI.getMoviesCollection().get()];
            case 1:
                moviesCollection = _a.sent();
                moviesCollectionLastIndex = moviesCollection.docs.length;
                MovieDTO.pk = moviesCollectionLastIndex + 1;
                MoviesDataAPI.getMoviesCollection().add(MovieDTO);
                return [2 /*return*/];
        }
    });
}); });
export var editMovieEntry = createAsyncThunk('movies/edit', function (_a) {
    var MovieDTO = _a.MovieDTO, docID = _a.docID;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            MoviesDataAPI.getMoviesCollection().doc(docID).update(MovieDTO);
            return [2 /*return*/, mapMovie(MovieDTO, docID)];
        });
    });
});
export var deleteMovieEntry = createAsyncThunk('movies/delete', function (docId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, MoviesDataAPI.getMoviesCollection().doc(docId).delete()];
}); }); });
export var searchMovieEntry = createAsyncThunk('movies/search', function (title) { return __awaiter(void 0, void 0, void 0, function () {
    var movieDocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MoviesDataAPI.searchMovieEntity(title)];
            case 1:
                movieDocs = _a.sent();
                if (!movieDocs.empty) {
                    return [2 /*return*/, "/films/" + movieDocs.docs[movieDocs.docs.length - 1].id];
                }
                return [2 /*return*/, '/not-found'];
        }
    });
}); });
export var moviesStoreReducer = createSlice({
    name: 'moviesStore',
    initialState: {
        movies: [],
        relevantCharacters: [],
        relevantPlanets: [],
        movieItem: null,
        isMovieLoadingPending: true,
        areEntitiesLoading: false,
        isEntityBeingAdded: false,
        isEntityBeingDeleted: false,
        redirectLink: null,
        areMovieEntitiesLoaded: false,
    },
    reducers: {
        setMovies: function (state, action) {
            if (action.payload) {
                state.movies = action.payload;
                state.areMovieEntitiesLoaded = true;
            }
        },
        setRelevChars: function (state, action) {
            state.relevantCharacters = action.payload;
        },
        setRelevPlanets: function (state, action) {
            state.relevantPlanets = action.payload;
        },
        setMovieItem: function (state, action) {
            state.movieItem = action.payload;
        },
        flushMovieItem: function (state) {
            state.movieItem = null;
        },
        setMovieLoadingPending: function (state, action) {
            state.isMovieLoadingPending = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder
            .addCase(loadMovieItem.fulfilled, function (state, action) {
            state.isMovieLoadingPending = false;
            if (action.payload) {
                state.movieItem = action.payload.movie;
                state.relevantCharacters = action.payload.relevantCharacters;
                state.relevantPlanets = action.payload.relevantPlanets;
            }
        })
            .addCase(loadDataToAddWhenCreating.pending, function (state) {
            state.areEntitiesLoading = true;
        })
            .addCase(loadDataToAddWhenCreating.fulfilled, function (state) {
            state.areEntitiesLoading = false;
        })
            .addCase(loadDataToAddWhenCreating.rejected, function (state) {
            state.areEntitiesLoading = false;
        })
            .addCase(addMovieEntry.pending, function (state) {
            state.isEntityBeingAdded = true;
        })
            .addCase(addMovieEntry.fulfilled, function (state) {
            state.isEntityBeingAdded = false;
        })
            .addCase(editMovieEntry.fulfilled, function (state, action) {
            state.movieItem = action.payload;
        })
            .addCase(deleteMovieEntry.pending, function (state) {
            state.isEntityBeingDeleted = true;
        })
            .addCase(deleteMovieEntry.fulfilled, function (state) {
            state.movieItem = null;
            state.isEntityBeingDeleted = false;
            state.isMovieLoadingPending = true;
        })
            .addCase(searchMovieEntry.pending, function (state) {
            state.redirectLink = null;
        })
            .addCase(searchMovieEntry.fulfilled, function (state, action) {
            state.redirectLink = action.payload;
        })
            .addCase(searchMovieEntry.rejected, function (state) {
            state.redirectLink = "/not-found";
        });
    }
});
export var setMovies = (_a = moviesStoreReducer.actions, _a.setMovies), setRelevChars = _a.setRelevChars, setRelevPlanets = _a.setRelevPlanets, setMovieItem = _a.setMovieItem, flushMovieItem = _a.flushMovieItem, setMovieLoadingPending = _a.setMovieLoadingPending;
export var subscribeToMovies = createAsyncThunk('movies/loadMovs', function (id, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    var moviesCollection;
    return __generator(this, function (_a) {
        moviesCollection = MoviesDataAPI.getMoviesCollection();
        movieSidebarSnapshotTeardown = moviesCollection.onSnapshot(function (querySnapshot) {
            var movies = querySnapshot.docs.map(function (movie) { return mapMovie(movie.data(), movie.id); });
            thunkAPI.dispatch(setMovies(movies));
        }, function (error) { return console.error(error); });
        return [2 /*return*/];
    });
}); });
