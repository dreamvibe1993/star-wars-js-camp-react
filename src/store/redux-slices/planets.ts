/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlanetDTO } from "../../api/dtos/PlanetDTO";
import { mapPlanet } from "../../api/mappers/mapper";
import { Planet } from "../../models/planet";
import * as PlanetsDataAPI from '../../api/services/load-planets-data-api'
import { RootState, PlanetsStore } from "../store-types";

/** Async function to lazyload more items into sidebar */
export const lazyloadMorePlanets = createAsyncThunk(
    'planetsStore/llMorePlanets',
    async (threshholdNumber: number) => {
        const querySnapshot = await PlanetsDataAPI.getCompletePlanetsCollection()
        const lastDocument = querySnapshot.docs[threshholdNumber]
        const limitedQuerySnapshot = await PlanetsDataAPI.getChunkOfPlanetsCollection(lastDocument, threshholdNumber)
        if (!limitedQuerySnapshot.empty) {
            const planets = limitedQuerySnapshot.docs.map(planet => mapPlanet(planet.data() as PlanetDTO, planet.id));
            return planets
        }
    }
)

/** Async function to load one planet information */
export const loadPlanetItem = createAsyncThunk(
    'planetsStore/loadPlanetItem',
    async (newDocId: string) => {
        const doc = await PlanetsDataAPI.getPlanetItemDoc(newDocId)
        if (doc.exists) {
            const planetItem = mapPlanet(doc.data() as PlanetDTO, doc.id)
            return planetItem
        }
    },
    {
        condition: (newDocId, { getState }) => {
            const { planetsStore } = getState() as RootState
            const item = planetsStore.planetItem
            if (item && item.docId === newDocId) {
                return false;
            }
        }
    }
)

/** Planets' reducer state */
export const planetsStoreReducer = createSlice({
    name: 'planetsStore',
    initialState: {
        planets: [],
        planetItem: null,
        numberOfItemsDisplayPlanets: 1,
        itemsToDispPlanets: 1,
        isPlanetLoadingPending: true,
        arePlanetEntitiesLoaded: false,
        isSidebarLoading: false,
    } as PlanetsStore,
    reducers: {
        setPlanets: (state, action: PayloadAction<Planet[]>) => {
            state.planets = action.payload;
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
            .addCase(lazyloadMorePlanets.pending, (state) => {
                state.isSidebarLoading = true
            })
            .addCase(lazyloadMorePlanets.rejected, (state) => {
                state.isSidebarLoading = false
            })
            .addCase(lazyloadMorePlanets.fulfilled, (state, action) => {
                state.isSidebarLoading = false
                if (action.payload) {
                    state.arePlanetEntitiesLoaded = true;
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
    setNumberOfItemsDisplayPlanets,
    discardPlanetsItemsAmmount,
    addItemsToDisplayPlanets
} = planetsStoreReducer.actions;