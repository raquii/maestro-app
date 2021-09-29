import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/'
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: 'DELETE',
            }),
        }),
        isLoggedIn: builder.mutation({
            query: () => ({
                url: 'me',
            })
        }),
        students: builder.mutation({
            query: () => ({
                url: 'students',
            })
        }),
    })
})


export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useIsLoggedInMutation, 
    } = api;

export const { endpoints: { 
    login, 
    logout, 
    isLoggedIn, 
    } } = api;