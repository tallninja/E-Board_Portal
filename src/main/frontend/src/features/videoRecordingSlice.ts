import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    videoRecording: VideoRecording | null
}

const initialState: InitialState = {
    videoRecording: null
}

export const videoRecordingsSlice = createSlice({
    name: "videoRecordings",
    initialState,
    reducers: {
        setVideoRecording: (state: InitialState, action: PayloadAction<VideoRecording>) => {
            state.videoRecording = action.payload;
        },
    }
});

export const {setVideoRecording} = videoRecordingsSlice.actions;
export const videoRecordingsReducer = videoRecordingsSlice.reducer;