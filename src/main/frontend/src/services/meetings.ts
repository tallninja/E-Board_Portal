// noinspection TypeScriptValidateTypes

import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "./baseQuery.ts";

export const meetingsApi = createApi({
    reducerPath: "meetingsApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        meetings: builder.query<Meeting[], Page>({
            query: (pageData: Page) => ({
                url: "meetings"
                    + `?page=${pageData.page || 0}`
                    + `&page_size=${pageData.pageSize || 10}`
                    + `&sort_direction=${pageData.sortDirection || "desc"}`
                    + `&sortBy=${pageData.sortBy || "createdAt"}`,
                method: "GET"
            })
        }),
        getMeetingBySlug: builder.query<Meeting, string>({
           query: (slug) => ({
               url: `meetings/slug/${slug}`,
               method: "GET"
           })
        }),
        createMeeting: builder.mutation<Meeting, Meeting>({
            query: ({ ...body }) => ({
                url: "meetings",
                method: "POST",
                body
            })
        }),
        updateMeeting: builder.mutation<Meeting, { id: string, body: Meeting }>({
            query: ({ id, body } : { id: string, body: Meeting }) => ({
                url: `meetings/${id}`,
                method: "PUT",
                body
            })
        }),
        deleteMeeting: builder.mutation<void, string>({
            query: (id: string) => ({
                url: `meetings/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const {
    useMeetingsQuery,
    useGetMeetingBySlugQuery,
    useCreateMeetingMutation,
    useUpdateMeetingMutation,
    useDeleteMeetingMutation,
} = meetingsApi;