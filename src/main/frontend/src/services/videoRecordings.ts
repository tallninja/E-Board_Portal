// noinspection TypeScriptValidateTypes

import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "./baseQuery.ts";

export const videoRecordingsApi = createApi({
    reducerPath: "videoRecordingsApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getVideoRecordings: builder.query<VideoRecording[], Page>({
            query: (pageData: Page) => ({
                url: "video-recordings"
                    + `?page=${pageData.page || 0}`
                    + `&page_size=${pageData.pageSize || 10}`
                    + `&sort_direction=${pageData.sortDirection || "desc"}`
                    + `&sortBy=${pageData.sortBy || "createdAt"}`,
                method: "GET"
            })
        })
    })
});

export const { useGetVideoRecordingsQuery } = videoRecordingsApi;