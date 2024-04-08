// noinspection TypeScriptValidateTypes

import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "./baseQuery.ts";

export const documentsApi = createApi({
    reducerPath: "documentsApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getDocuments: builder.query<DocumentFile[], Page>({
            query: (pageData: Page) => ({
                url: "documents"
                    + `?page=${pageData.page || 0}`
                    + `&page_size=${pageData.pageSize || 10}`
                    + `&sort_direction=${pageData.sortDirection || "desc"}`
                    + `&sortBy=${pageData.sortBy || "createdAt"}`,
                method: "GET"
            })
        }),
        getDocumentsByMeeting: builder.query<DocumentFile[], MeetingIdWithPageData>({
            query: ({ meetingId, pageData } : MeetingIdWithPageData) => ({
                url: "documents"
                    + `?meeting_id=${meetingId}`
                    + `&page=${pageData.page || 0}`
                    + `&page_size=${pageData.pageSize || 10}`
                    + `&sort_direction=${pageData.sortDirection || "desc"}`
                    + `&sortBy=${pageData.sortBy || "createdAt"}`,
                method: "GET"
            })
        }),
        uploadDocument: builder.mutation<Document, FileUploadRequest>({
            query: ({ meetingId, formData }: FileUploadRequest) => ({
                url: `documents/upload?meeting_id=${meetingId}`,
                method: "POST",
                body: formData,
                formData: true
            })
        })
    })
});

export const {
    useGetDocumentsQuery,
    useGetDocumentsByMeetingQuery,
    useUploadDocumentMutation
} = documentsApi;