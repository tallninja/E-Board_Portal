import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    meeting: Meeting | null
}

const initialState: InitialState = {
    meeting: null
}

export const meetingsSlice = createSlice({
    name: "meetings",
    initialState,
    reducers: {
        setMeeting: (state: InitialState, action: PayloadAction<Meeting>) => {
            state.meeting = action.payload;
        },
    }
});

export const {setMeeting} = meetingsSlice.actions;
export const meetingsReducer = meetingsSlice.reducer;