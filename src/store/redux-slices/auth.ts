/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as AuthAPI from '../../api/services/auth'
import { AuthStateRootState, UserCredentials } from "../store-types";

/** User auth statuses */
export enum UserSignInStatus {
    Pending = 2,
    Authorised = 1,
    Unauthorised = 0,
}

/** Reducer slice of the user's auth status states */
export const authStateReducer = createSlice({
    name: 'authState',
    initialState: {
        isUserSignedIn: UserSignInStatus.Pending,
        passwordErrorCodeMsg: null,
        emailErrorCodeMsg: null,
        userEmail: null,
    } as AuthStateRootState,
    reducers: {
        signUserIn: (state) => {
            state.isUserSignedIn = UserSignInStatus.Authorised
        },
        signUserOut: (state) => {
            state.isUserSignedIn = UserSignInStatus.Unauthorised
        },
        setPassErrMsg: (state, action) => {
            state.passwordErrorCodeMsg = action.payload
        },
        setEmailErrMsg: (state, action) => {
            state.emailErrorCodeMsg = action.payload
        },
        setUserEmailString: (state, action) => {
            state.userEmail = action.payload
        },
        flushAllErrCodes: (state) => {
            state.emailErrorCodeMsg = null
            state.passwordErrorCodeMsg = null
            state.userEmail = null
        },
    },
})

export const {
    signUserIn,
    signUserOut,
    setPassErrMsg,
    setEmailErrMsg,
    setUserEmailString,
    flushAllErrCodes
} = authStateReducer.actions;

/** Async function to signin a user */
export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: UserCredentials, thunkAPI) => {
        thunkAPI.dispatch(flushAllErrCodes())
        await AuthAPI.userSignIn(email, password)
            .catch((err) => {
                if (err.code === 'auth/user-not-found') {
                    thunkAPI.dispatch(setEmailErrMsg(err.message))
                } else if (err.code === 'auth/wrong-password') {
                    thunkAPI.dispatch(setPassErrMsg(err.message))
                }
            })
    },

)

/** Async function to sign out a user */
export const signCurrentUserOut = createAsyncThunk(
    'auth/signOut',
    async (id, thunkAPI) => {
        thunkAPI.dispatch(flushAllErrCodes())
        await AuthAPI.userSignOut()
    }
)

/** Async function to create a new account */
export const createUserAccount = createAsyncThunk(
    'auth/create',
    async ({ email, password }: UserCredentials, thunkAPI) => {
        thunkAPI.dispatch(flushAllErrCodes())
        await AuthAPI.createUser(email, password)
            .catch(err => {
                thunkAPI.dispatch(setEmailErrMsg(err.message))
            })
    }
)