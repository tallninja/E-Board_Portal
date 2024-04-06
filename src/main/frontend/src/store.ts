// noinspection TypeScriptValidateTypes

import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authReducer, meetingsReducer} from "./features";
import {
    authApi,
    authApiWithAuth,
    statsApi,
    meetingsApi,
    documentsApi,
    audioRecordingsApi,
    videoRecordingsApi
} from "./services";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        meetings: meetingsReducer,
        [authApi.reducerPath]: authApi.reducer,
        [authApiWithAuth.reducerPath]: authApiWithAuth.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
        [meetingsApi.reducerPath]: meetingsApi.reducer,
        [documentsApi.reducerPath]: documentsApi.reducer,
        [audioRecordingsApi.reducerPath]: audioRecordingsApi.reducer,
        [videoRecordingsApi.reducerPath]: videoRecordingsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(
                authApi.middleware,
                authApiWithAuth.middleware,
                statsApi.middleware,
                meetingsApi.middleware,
                documentsApi.middleware,
                audioRecordingsApi.middleware,
                videoRecordingsApi.middleware
            )
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;