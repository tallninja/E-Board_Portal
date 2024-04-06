// noinspection TypeScriptValidateTypes

import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "./baseQuery.ts";

export const audioRecordingsApi = createApi({
    reducerPath: "audioRecordingsApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getAudioRecordings: builder.query<AudioRecording[], Page>({
            query: (pageData: Page) => ({
                url: "audio-recordings"
                    + `?page=${pageData.page || 0}`
                    + `&page_size=${pageData.pageSize || 10}`
                    + `&sort_direction=${pageData.sortDirection || "desc"}`
                    + `&sortBy=${pageData.sortBy || "createdAt"}`,
                method: "GET"
            })
        })
    })
});

export const { useGetAudioRecordingsQuery } = audioRecordingsApi;