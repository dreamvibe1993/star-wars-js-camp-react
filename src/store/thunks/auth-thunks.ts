import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AuthAPI from '../../api/services/auth'
import { setEmailErrMsg, setPassErrMsg, signUserOut } from "../reducer";

interface UserCredentials {
    email: string;
    password: string;
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: UserCredentials, thunkAPI) => {
        await AuthAPI.userSignIn(email, password)
            .then(() => {
                // const teardown = AuthAPI.getSignInStatus()
                // teardown()
                // await getSignInStatus()
                // thunkAPI.dispatch(setEmailErrMsg(null))
                // thunkAPI.dispatch(setPassErrMsg(null))
            })
            .catch((err) => {
                thunkAPI.dispatch(setEmailErrMsg(err.message))
                // const teardown = AuthAPI.getSignInStatus()
                // teardown()
                // thunkAPI.dispatch(signUserOut())
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
    async () => {
        await AuthAPI.userSignOut()
            .then(() => {
                // const teardown = AuthAPI.getSignInStatus()
                // teardown()
            })
    }
)

export const createUserAccount = createAsyncThunk(
    'auth/create',
    async ({ email, password }: UserCredentials) => {
        await AuthAPI.createUser(email, password)
    }
)

