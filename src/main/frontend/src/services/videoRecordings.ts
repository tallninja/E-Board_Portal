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
        }),
        getVideoRecordingsByMeeting: builder.query<VideoRecording[], MeetingIdWithPageData>({
            query: ({meetingId, pageData}: MeetingIdWithPageData) => ({
                url: "video-recordings"
                    + `?meeting_id=${meetingId}`
                    + `&page=${pageData.page || 0}`
                    + `&page_size=${pageData.pageSize || 10}`
                    + `&sort_direction=${pageData.sortDirection || "desc"}`
                    + `&sortBy=${pageData.sortBy || "createdAt"}`,
                method: "GET"
            })
        }),
        uploadVideoRecording: builder.mutation<VideoRecording, FileUploadRequest>({
            query: ({ meetingId, formData }: FileUploadRequest) => ({
                url: `video-recordings/upload?meeting_id=${meetingId}`,
                method: "POST",
                body: formData,
                formData: true
            })
        })
    })
});

export const {
    useGetVideoRecordingsQuery,
    useGetVideoRecordingsByMeetingQuery,
    useUploadVideoRecordingMutation
} = videoRecordingsApi;