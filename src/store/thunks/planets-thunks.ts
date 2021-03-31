/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlanetDTO } from "../../api/dtos/PlanetDTO";
import { mapPlanet } from "../../api/mappers/mapper";
import { Planet } from "../../models/planet";
import * as PlanetsDataAPI from '../../api/services/load-planets-data-api'
import { RootState } from "./store";


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

/** Planets store */
export interface PlanetsStore {
    /** Planets that are disp. in the sidebar */
    planets: Planet[];
    /** Planet item to display */
    planetItem: Planet | null;
    /** Amount of planets items to display in the sidebar */
    itemsToDispPlanets: number;
    /** Threshold of planets to display in the sidebar */
    numberOfItemsDisplayPlanets: number;

    isPlanetLoadingPending: boolean;

    arePlanetEntitiesLoaded: boolean;
}

export const planetsStoreReducer = createSlice({
    name: 'planetsStore',
    initialState: {
        planets: [],
        planetItem: null,
        numberOfItemsDisplayPlanets: 1,
        itemsToDispPlanets: 1,
        isPlanetLoadingPending: true,
        arePlanetEntitiesLoaded: false,
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
    setPlanetItem,
    setNumberOfItemsDisplayPlanets,
    discardPlanetsItemsAmmount,
    addItemsToDisplayPlanets
} = planetsStoreReducer.actions;