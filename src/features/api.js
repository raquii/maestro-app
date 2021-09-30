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
        signup: builder.mutation({
            query: (credentials) => ({
                url: "sign_up",
                method: 'POST',
                body: credentials,
            }),
        }),
        isLoggedIn: builder.mutation({
            query: () => ({
                url: 'me',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
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