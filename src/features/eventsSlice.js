import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {};

export const slice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.fetchEvents.matchFulfilled, (state, action) => {
                console.log('fulfilled: fetchEvents', action);
                return action.payload.data.map(e => ({id:e.id, ...e.attributes}))
            })
            .addMatcher(api.endpoints.createEvent.matchFulfilled, (state, action) => {
                console.log('fulfilled: createEvent', action);
                // return action.payload.data.attributes.preferences.data
            })
            .addMatcher(api.endpoints.updateEvent.matchFulfilled, (state, action) => {
                console.log('fulfilled: updateEvent', action,);
                // return action.payload.data
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled: logout - settings', state);
                return initialState;
            })

    }
})

export default slice.reducer;