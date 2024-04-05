// noinspection TypeScriptValidateTypes

import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery, baseQueryWithReAuth} from "./baseQuery.ts";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		loginUser: builder.mutation<LoginResponse, LoginRequest>({
			query: ({...body}) => ({
				url: "auth/login",
				method: "POST",
				body: body
			})
		})
	}),
});

export const authApiWithAuth = createApi({
	reducerPath: "authApiWithAuth",
	baseQuery: baseQueryWithReAuth,
	endpoints: (builder) => ({
		getAuthUser: builder.query<AuthUser, void>({
			query: () => "auth/profile"
		}),
		logoutUser: builder.mutation<void, void>({
			query: () => ({
				url: "auth/logout",
				method: "POST"
			})
		})
	})
})

export const { useLoginUserMutation } = authApi;
export const { useGetAuthUserQuery, useLogoutUserMutation } = authApiWithAuth;



























