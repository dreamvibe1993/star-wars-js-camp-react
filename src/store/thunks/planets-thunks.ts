import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlanetDTO } from "../../api/dtos/PlanetDTO";
import { mapPlanet } from "../../api/mappers/mapper";
import * as PlanetsDataApi from '../../api/services/load-planets-data-api'
import { RootState } from "../reducer";

export const lazyloadMorePlanets = createAsyncThunk(
    'planetsStore/llMorePlanets',
    async (threshholdNumber: number) => {
        const querySnapshot = await PlanetsDataApi.getCompletePlanetsCollection()
        const lastDocument = querySnapshot.docs[threshholdNumber]
        const limitedQuerySnapshot = await PlanetsDataApi.getChunkOfPlanetsCollection(lastDocument, threshholdNumber)
        if (!limitedQuerySnapshot.empty) {
            const planets = limitedQuerySnapshot.docs.map(planet => mapPlanet(planet.data() as PlanetDTO, planet.id));
            return planets
        }
    }
)

export const loadPlanetItem = createAsyncThunk(
    'planetsStore/loadPlanetItem',
    async (newDocId: string) => {
        const doc = await PlanetsDataApi.getPlanetItemDoc(newDocId)
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
