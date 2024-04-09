import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    document: DocumentFile | null
}

const initialState: InitialState = {
    document: null
}

export const documentsSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        setDocument: (state: InitialState, action: PayloadAction<DocumentFile>) => {
            state.document = action.payload;
        },
    }
});

export const {setDocument} = documentsSlice.actions;
export const documentsReducer = documentsSlice.reducer;