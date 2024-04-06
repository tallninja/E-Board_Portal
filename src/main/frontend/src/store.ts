// noinspection TypeScriptValidateTypes

import {configureStore} from "@reduxjs/toolkit";
import {authReducer, meetingsReducer} from "./features";
import {authApi, authApiWithAuth} from "./services/auth.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import {statsApi} from "./services/stats.ts";
import {meetingsApi} from "./services/meetings.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        meetings: meetingsReducer,
        [authApi.reducerPath]: authApi.reducer,
        [authApiWithAuth.reducerPath]: authApiWithAuth.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
        [meetingsApi.reducerPath]: meetingsApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(
                authApi.middleware,
                authApiWithAuth.middleware,
                statsApi.middleware,
                meetingsApi.middleware
            )
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;