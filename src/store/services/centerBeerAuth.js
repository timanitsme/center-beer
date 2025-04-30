import {createApi, fetchBaseQuery}  from "@reduxjs/toolkit/query/react";
import {centerBeerApi} from "./centerBeer.js";

const baseQuery = fetchBaseQuery({
    baseUrl: "/apiAuth",
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
        refreshToken: builder.mutation({
            query: (refreshToken) => {
                return({
                    url: 'authentication/refresh-token',
                    method: "POST",
                    body: refreshToken
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
        logout: builder.mutation({
            query: () => {
                return({
                    url: 'authentication/logout',
                    method: "POST"
                })
            }
        }),
    })
})

export const {useGetUserProfileQuery, useLoginMutation, useRefreshTokenMutation,
    useRefreshTokenCookieMutation, useLogoutMutation } = centerBeerAuthApi