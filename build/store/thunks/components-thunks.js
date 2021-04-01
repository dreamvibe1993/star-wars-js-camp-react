var _a;
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { lazyloadMoreCharacters } from "./characters-thunks";
import { deleteMovieEntry } from "./movies-thunks";
import { lazyloadMorePlanets } from "./planets-thunks";
export var componentsStateReducer = createSlice({
    name: 'componentsState',
    initialState: {
        isDeletionConfirmationOpen: false,
        isSidebarLoading: false,
        isCommonLoadingBckDropOn: false,
        mode: true,
    },
    reducers: {
        setDeletionModalOpen: function (state) {
            state.isDeletionConfirmationOpen = true;
        },
        setDeletionModalClose: function (state) {
            state.isDeletionConfirmationOpen = false;
        },
        setSidebarLoadingOn: function (state) {
            state.isSidebarLoading = true;
        },
        setSidebarLoadingOff: function (state) {
            state.isSidebarLoading = false;
        },
        setCommonBackdropOn: function (state) {
            state.isCommonLoadingBckDropOn = true;
        },
        setCommonBackdropOff: function (state) {
            state.isCommonLoadingBckDropOn = false;
        },
        setThemingMode: function (state, action) {
            state.mode = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder
            .addCase(lazyloadMoreCharacters.pending, function (state) {
            state.isSidebarLoading = true;
        })
            .addCase(lazyloadMoreCharacters.rejected, function (state) {
            state.isSidebarLoading = false;
        })
            .addCase(lazyloadMoreCharacters.fulfilled, function (state) {
            state.isSidebarLoading = false;
        })
            .addCase(lazyloadMorePlanets.pending, function (state) {
            state.isSidebarLoading = true;
        })
            .addCase(lazyloadMorePlanets.rejected, function (state) {
            state.isSidebarLoading = false;
        })
            .addCase(lazyloadMorePlanets.fulfilled, function (state) {
            state.isSidebarLoading = false;
        })
            .addCase(deleteMovieEntry.pending, function (state) {
            state.isDeletionConfirmationOpen = false;
        });
    }
});
export var setDeletionModalOpen = (_a = componentsStateReducer.actions, _a.setDeletionModalOpen), setDeletionModalClose = _a.setDeletionModalClose, setSidebarLoadingOn = _a.setSidebarLoadingOn, setSidebarLoadingOff = _a.setSidebarLoadingOff, setCommonBackdropOn = _a.setCommonBackdropOn, setCommonBackdropOff = _a.setCommonBackdropOff, setThemingMode = _a.setThemingMode;
