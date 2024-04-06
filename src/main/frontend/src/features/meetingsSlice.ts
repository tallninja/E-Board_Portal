import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    data: any
}

const initialState: InitialState = {
    data: null
}

export const meetingsSlice = createSlice({
    name: "meetings",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
        },
    }
});

export const {setData} = meetingsSlice.actions;
export const meetingsReducer = meetingsSlice.reducer;