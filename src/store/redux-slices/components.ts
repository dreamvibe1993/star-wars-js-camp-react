/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
import { ComponentsRootState } from "../store-types"

/** Component's theming slice of state */
export const componentsStateReducer = createSlice({
    name: 'componentsState',
    initialState: {
        isCommonLoadingBckDropOn: false,
        mode: true,
    } as ComponentsRootState,
    reducers: {
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
})

export const {
    setCommonBackdropOn,
    setCommonBackdropOff,
    setThemingMode
} = componentsStateReducer.actions;




