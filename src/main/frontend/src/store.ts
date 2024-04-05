// noinspection TypeScriptValidateTypes

import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./features";
import {authApi, authApiWithAuth} from "./services/auth.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [authApiWithAuth.reducerPath]: authApiWithAuth.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware, authApiWithAuth.middleware)
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;