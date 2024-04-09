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
        }),
        getMeetingCountStats: builder.query<CountStats, string>({
            query: (slug: string) => ({
                url: `statistics/counts/meetings/slug/${slug}`,
                method: "GET"
            })
        })
    })
});

export const { useCountStatsQuery, useGetMeetingCountStatsQuery } = statsApi;