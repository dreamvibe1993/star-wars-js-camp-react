/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
import { lazyloadMoreCharacters } from "./characters-thunks"
import { deleteMovieEntry } from "./movies-thunks"
import { lazyloadMorePlanets } from "./planets-thunks"

export interface ComponentsRootState {
    /** State of delet. conf. modal window */
    isDeletionConfirmationOpen: boolean;
    /** State of a current user's credentials */
    isSidebarLoading: boolean;
    /** State of the main backdrop */
    isCommonLoadingBckDropOn: boolean;

    mode: boolean;
}

export const componentsStateReducer = createSlice({
    name: 'componentsState',
    initialState: {
        isDeletionConfirmationOpen: false,
        isSidebarLoading: false,
        isCommonLoadingBckDropOn: false,
        mode: true,
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
        setThemingMode: (state, action) => {
            state.mode = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(lazyloadMoreCharacters.pending, (state) => {
                state.isSidebarLoading = true
            })
            .addCase(lazyloadMoreCharacters.rejected, (state) => {
                state.isSidebarLoading = false
            })
            .addCase(lazyloadMoreCharacters.fulfilled, (state) => {
                state.isSidebarLoading = false
            })
            .addCase(lazyloadMorePlanets.pending, (state) => {
                state.isSidebarLoading = true
            })
            .addCase(lazyloadMorePlanets.rejected, (state) => {
                state.isSidebarLoading = false
            })
            .addCase(lazyloadMorePlanets.fulfilled, (state) => {
                state.isSidebarLoading = false
            })
            .addCase(deleteMovieEntry.pending, (state) => {
                state.isDeletionConfirmationOpen = false
            })
    }
})

export const {
    setDeletionModalOpen,
    setDeletionModalClose,
    setSidebarLoadingOn,
    setSidebarLoadingOff,
    setCommonBackdropOn,
    setCommonBackdropOff,
    setThemingMode
} = componentsStateReducer.actions;




