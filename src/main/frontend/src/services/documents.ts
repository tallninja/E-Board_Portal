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
        })
    })
});

export const { useGetDocumentsQuery } = documentsApi;