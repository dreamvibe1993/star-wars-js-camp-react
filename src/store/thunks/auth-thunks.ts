import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AuthAPI from '../../api/services/auth'
import { setEmailErrMsg, setPassErrMsg } from "../reducer";

interface UserCredentials {
    email: string;
    password: string;
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: UserCredentials, thunkAPI) => {
        try {
            await AuthAPI.userSignIn(email, password)
            thunkAPI.dispatch(setEmailErrMsg(null))
            thunkAPI.dispatch(setPassErrMsg(null))
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                thunkAPI.dispatch(setEmailErrMsg(err.message))
            } else if (err.code === 'auth/wrong-password') {
                thunkAPI.dispatch(setPassErrMsg(err.message))
            }
        }
    }
)

export const signCurrentUserOut = createAsyncThunk(
    'auth/signOut',
    async () => {
        await AuthAPI.userSignOut()
    }
)

export const createUserAccount = createAsyncThunk(
    'auth/create',
    async ({ email, password }: UserCredentials) => {
        await AuthAPI.createUser(email, password)
    }
)