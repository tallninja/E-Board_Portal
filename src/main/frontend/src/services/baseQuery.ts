// noinspection TypeScriptValidateTypes

import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken} from "../utils/tokens.ts";
import {Mutex} from "async-mutex";
import {logout} from "../features";

const BASE_URL = "http://localhost:8080/api/"

export const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const accessToken = getAccessToken();
        headers.set("Authorization", `Bearer ${accessToken}`);
        return headers;
    }
});

const mutex = new Mutex();

export const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQueryWithAuth(args, api, extraOptions);

    if (result["error"] && result["error"].status === 401) {
        // Try to get a new access token
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const  refreshToken = getRefreshToken();
                const res = await baseQuery(`auth/refresh-token?token=${refreshToken}`, api, extraOptions); // Implement this to get a new access token
                if (refreshToken && res) {
                    const tokens: Tokens = res["data"] as Tokens;
                    // Store the new tokens
                    await setAccessToken(tokens.accessToken);
                    await setRefreshToken(tokens.refreshToken);
                    // Retry the original request with the new access token
                    result = await baseQueryWithAuth(args, api, extraOptions);
                } else {
                    api.dispatch(logout())
                }
            } finally {
                release();
            }
        } else {
            // Wait until the mutex is unlocked and retry the request
            await mutex.waitForUnlock();
            result = await baseQueryWithAuth(args, api, extraOptions);
        }
    }

    return result;
}