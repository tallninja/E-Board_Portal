// noinspection TypeScriptValidateTypes

import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "./baseQuery.ts";

export const statsApi = createApi({
    reducerPath: "statsApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        countStats: builder.query<CountStats, void>({
            query: () => ({
                url: "statistics/counts",
                method: "GET"
            })
        })
    })
});

export const { useCountStatsQuery } = statsApi;