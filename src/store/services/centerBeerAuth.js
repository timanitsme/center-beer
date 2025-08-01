import {createApi, fetchBaseQuery}  from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "/authApi",
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    },
    responseHandler: async (response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')){
            return response.json();
        }
        else{
            return response.text();
        }
    },
    credentials: 'include',
})

export const centerBeerAuthApi = createApi({
    reducerPath: 'centerBeerAuthApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getUserProfile: (builder.query({
            query: () => `user/profile`
        })),
        login: builder.mutation({
            query: (credentials) => {
                return({
                    url: 'authentication/login',
                    method: 'POST',
                    body: credentials
                })}
        }),
        register: builder.mutation({
            query: (credentials) => {
                return({
                    url: 'authentication/register',
                    method: 'POST',
                    body: credentials
                })}
        }),
        refreshTokenCookie: builder.mutation({
            query: () => {
                return({
                    url: 'authentication/refresh-token-cookie',
                    method: "POST"
                })
            }
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => {
                return({
                    url: 'authentication/refresh-token',
                    method: "POST",
                    body: refreshToken
                })}
        }),
        logout: builder.mutation({
            query: () => {
                return({
                    url: 'authentication/logout',
                    method: "POST"
                })
            }
        }),
        updateNickname: builder.mutation({
            query: (newNickname) => {
                return({
                    url: `user/update-nickname?newNickname=${newNickname}`,
                    method: "PATCH",
                })}
        }),
        requestEmailChange: builder.mutation({
            query: (newEmail) => {
                return({
                    url: `user/request-email-change?newEmail=${newEmail}`,
                    method: "POST",
                })}
        }),
        confirmEmailChange: builder.mutation({
            query: (code) => {
                return({
                    url: `user/confirm-email-change?code=${code}`,
                    method: "POST",
                })}
        }),
    })
})

export const {useGetUserProfileQuery, useLoginMutation, useRefreshTokenMutation,
    useRefreshTokenCookieMutation, useLogoutMutation, useRegisterMutation, useUpdateNicknameMutation,
    useRequestEmailChangeMutation, useConfirmEmailChangeMutation
    } = centerBeerAuthApi