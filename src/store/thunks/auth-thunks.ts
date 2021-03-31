import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AuthAPI from '../../api/services/auth'
import { flushAllErrCodes, setEmailErrMsg, setPassErrMsg, signUserOut } from "../reducer";

interface UserCredentials {
    email: string;
    password: string;
}

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

export const signCurrentUserOut = createAsyncThunk(
    'auth/signOut',
    async (id, thunkAPI) => {
        thunkAPI.dispatch(flushAllErrCodes())
        await AuthAPI.userSignOut()
    }
)

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

