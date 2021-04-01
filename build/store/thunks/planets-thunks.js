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
import { mapPlanet } from "../../api/mappers/mapper";
import * as PlanetsDataAPI from '../../api/services/load-planets-data-api';
export var lazyloadMorePlanets = createAsyncThunk('planetsStore/llMorePlanets', function (threshholdNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var querySnapshot, lastDocument, limitedQuerySnapshot, planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PlanetsDataAPI.getCompletePlanetsCollection()];
            case 1:
                querySnapshot = _a.sent();
                lastDocument = querySnapshot.docs[threshholdNumber];
                return [4 /*yield*/, PlanetsDataAPI.getChunkOfPlanetsCollection(lastDocument, threshholdNumber)];
            case 2:
                limitedQuerySnapshot = _a.sent();
                if (!limitedQuerySnapshot.empty) {
                    planets = limitedQuerySnapshot.docs.map(function (planet) { return mapPlanet(planet.data(), planet.id); });
                    return [2 /*return*/, planets];
                }
                return [2 /*return*/];
        }
    });
}); });
export var loadPlanetItem = createAsyncThunk('planetsStore/loadPlanetItem', function (newDocId) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, planetItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PlanetsDataAPI.getPlanetItemDoc(newDocId)];
            case 1:
                doc = _a.sent();
                if (doc.exists) {
                    planetItem = mapPlanet(doc.data(), doc.id);
                    return [2 /*return*/, planetItem];
                }
                return [2 /*return*/];
        }
    });
}); }, {
    condition: function (newDocId, _a) {
        var getState = _a.getState;
        var planetsStore = getState().planetsStore;
        var item = planetsStore.planetItem;
        if (item && item.docId === newDocId) {
            return false;
        }
    }
});
export var planetsStoreReducer = createSlice({
    name: 'planetsStore',
    initialState: {
        planets: [],
        planetItem: null,
        numberOfItemsDisplayPlanets: 1,
        itemsToDispPlanets: 1,
        isPlanetLoadingPending: true,
        arePlanetEntitiesLoaded: false,
    },
    reducers: {
        setPlanets: function (state, action) {
            state.planets = action.payload;
        },
        setPlanetItem: function (state, action) {
            state.planetItem = action.payload;
        },
        setNumberOfItemsDisplayPlanets: function (state, action) {
            state.numberOfItemsDisplayPlanets = action.payload;
        },
        discardPlanetsItemsAmmount: function (state) {
            state.itemsToDispPlanets = 1;
        },
        addItemsToDisplayPlanets: function (state) {
            state.itemsToDispPlanets += state.numberOfItemsDisplayPlanets;
        },
    },
    extraReducers: function (builder) {
        builder
            .addCase(lazyloadMorePlanets.fulfilled, function (state, action) {
            if (action.payload) {
                state.arePlanetEntitiesLoaded = true;
                state.planets = action.payload;
            }
        })
            .addCase(loadPlanetItem.fulfilled, function (state, action) {
            state.isPlanetLoadingPending = false;
            if (action.payload) {
                state.planetItem = action.payload;
            }
        })
            .addCase(loadPlanetItem.pending, function (state) {
            state.isPlanetLoadingPending = true;
        })
            .addCase(loadPlanetItem.rejected, function (state) {
            state.isPlanetLoadingPending = false;
        });
    }
});
export var setPlanets = (_a = planetsStoreReducer.actions, _a.setPlanets), setPlanetItem = _a.setPlanetItem, setNumberOfItemsDisplayPlanets = _a.setNumberOfItemsDisplayPlanets, discardPlanetsItemsAmmount = _a.discardPlanetsItemsAmmount, addItemsToDisplayPlanets = _a.addItemsToDisplayPlanets;
