import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    audioRecording: AudioRecording | null
}

const initialState: InitialState = {
    audioRecording: null
}

export const audioRecordingsSlice = createSlice({
    name: "audioRecordings",
    initialState,
    reducers: {
        setAudioRecording: (state: InitialState, action: PayloadAction<AudioRecording>) => {
            state.audioRecording = action.payload;
        },
    }
});

export const {setAudioRecording} = audioRecordingsSlice.actions;
export const audioRecordingsReducer = audioRecordingsSlice.reducer;