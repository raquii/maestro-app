import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        prepareHeaders: (headers) => {
            if (localStorage.getItem("token")) {
                headers.set('Authorization', `${localStorage.getItem("token")}`)
            }
            headers.append("Content-Type", "application/json")
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (rawResult, meta) => {
                return { ...rawResult, token: meta.response.headers.get("Authorization") }
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
            transformResponse: (rawResult, meta) => {
                return { ...rawResult, token: meta.response.headers.get("Authorization") }
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
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...student }) => ({
                url: `students/${id}`,
                method: 'PATCH',
                body: student
            }),
        }),
        updateStudents: builder.mutation({
            query: (students) => ({
                url: 'students/bulk_update',
                method: 'PUT',
                body: students,
            }),
        }),
        updateSettings: builder.mutation({
            query: ({ id, ...preference }) => ({
                url: `preferences/${id}`,
                method: 'PATCH',
                body: preference
            })
        }),
        fetchEvents: builder.query({
            query: () => ({
                url: 'events'
            })
        }),
        createEvent: builder.mutation({
            query: (event) => ({
                url: 'events',
                method: 'POST',
                body: event
            })
        }),
        createRecurringEvent: builder.mutation({
            query: (event)=>({
                url:'events/create_recurring_event',
                method: 'POST',
                body: event
            })
        }),
        updateEvent: builder.mutation({
            query: ({ id, ...event }) => ({
                url: `events/${id}`,
                method: 'PATCH',
                body: event
            })
        }),
        deleteEvent: builder.mutation({
            query: ({ id, ...event }) => ({
                url: `events/${id}`,
                method: 'DELETE',
                body: event
            })
        }),
        updateAllEventOccurances: builder.mutation({
            query: (event) => ({
                url: `events/update_all_event_occurances`,
                method: 'PUT',
                body: event
            })
        }),
        updateFutureEventOccurances: builder.mutation({
            query: (event) => ({
                url: `events/update_future_event_occurances`,
                method: 'PUT',
                body: event
            })
        }),
        deleteAllEventOccurances: builder.mutation({
            query: (event) => ({
                url: `events/destroy_all_event_occurances`,
                method: 'DELETE',
                body: event
            })
        }),
        deleteFutureEventOccurances: builder.mutation({
            query: (event) => ({
                url: `events/destroy_future_event_occurances`,
                method: 'DELETE',
                body: event
            })
        }),
        createStudent: builder.mutation({
            query: (student) => ({
                url: 'students',
                method: 'POST',
                body: student
            })
        }),
        deleteStudent: builder.mutation({
            query: ({ id, ...student }) => ({
                url: `students/${id}`,
                method: 'DELETE',
                body: student
            })
        }),
        deleteStudents: builder.mutation({
            query: (students) => ({
                url: 'students/bulk_destroy',
                method: 'DELETE',
                body: students,
            }),
        }),
    })
})


export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useIsLoggedInMutation,
    useFetchStudentsQuery,
    useUpdateStudentMutation,
    useUpdateStudentsMutation,
    useUpdateSettingsMutation,
    useFetchEventsQuery,
    useCreateEventMutation,
    useCreateRecurringEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useUpdateAllEventOccurancesMutation,
    useUpdateFutureEventOccurancesMutation,
    useDeleteAllEventOccurancesMutation,
    useDeleteFutureEventOccurancesMutation,
    useCreateStudentMutation,
    useDeleteStudentMutation,
    useDeleteStudentsMutation
} = api;

export const { endpoints: {
    login,
    logout,
    signup,
    isLoggedIn,
    fetchStudents,
    updateStudent,
    updateStudents,
    updateSettings,
    fetchEvents,
    createEvent,
    createRecurringEvent,
    updateEvent,
    updateAllEventOccurances,
    updateFutureEventOccurances,
    deleteEvent,
    deleteAllEventOccurances,
    deleteFutureEventOccurances,
    createStudent,
    deleteStudent,
    deleteStudents
} } = api;