import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        prepareHeaders: (headers) => {
            if (localStorage.getItem("token")) {
              headers.set('Authorization', `${localStorage.getItem("token")}`)
            }
            headers.append("Content-Type","application/json")
            return headers
        },
    }),
    tagTypes: ['User', 'Student'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (rawResult,meta) =>{
                return {...rawResult, token: meta.response.headers.get("Authorization")}
            }
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
            transformResponse: (rawResult,meta) =>{
                return {...rawResult, token: meta.response.headers.get("Authorization")}
            }
        }),
        isLoggedIn: builder.mutation({
            query: () => ({
                url: 'me',
            })
        }),
        fetchStudents: builder.query({
            query: () => ({
                url: 'students',
            }),
            providesTags: ['Student']
        }),
        updateStudents: builder.mutation({
            query: (students) => ({
                url: 'students/bulk_update',
                method: 'PUT',
                body: students,
            }),

        })
    })
})


export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useSignupMutation,
    useIsLoggedInMutation, 
    useFetchStudentsQuery,
    useUpdateStudentsMutation
    } = api;

export const { endpoints: { 
    login, 
    logout, 
    signup,
    isLoggedIn,
    fetchStudents,
    updateStudents
    } } = api;