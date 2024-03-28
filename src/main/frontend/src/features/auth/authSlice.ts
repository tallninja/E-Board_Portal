import {createSlice} from "@reduxjs/toolkit";

const initialState: AuthUser = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        getAuthUser: (state) => {

        }
    }
})

export const {getAuthUser} = authSlice.actions;
export const authReducer = authSlice.reducer;