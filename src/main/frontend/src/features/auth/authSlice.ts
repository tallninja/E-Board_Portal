import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    user: AuthUser | null,
    authenticated: boolean
}

const initialState: InitialState = {
    user: null,
    authenticated: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
        },
        login: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.authenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.authenticated = false;
        }
    }
})

export const {setAuthUser, login, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;