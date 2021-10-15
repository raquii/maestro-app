import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {};

export const slice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
                console.log('fulfilled: login - events', action.payload.data.attributes.events);
                return action.payload.data.attributes.events.data.map(e => ({ id: e.id, ...e.attributes }))
            })
            .addMatcher(api.endpoints.isLoggedIn.matchFulfilled, (state, action) => {
                console.log('fulfilled: isLoggedIn - events', action);
                return action.payload.data.attributes.events.data.map(e => ({ id: e.id, ...e.attributes }))
            })
            .addMatcher(api.endpoints.fetchEvents.matchFulfilled, (state, action) => {
                console.log('fulfilled: fetchEvents', action);
                return action.payload.data.map(e => ({ id: e.id, ...e.attributes }))
            })
            .addMatcher(api.endpoints.createEvent.matchFulfilled, (state, action) => {
                console.log('fulfilled: createEvent', action);
                const newEvent = {id: action.payload.data.id, ...action.payload.data.attributes}
                return [...state, newEvent]
            })
            .addMatcher(api.endpoints.updateEvent.matchFulfilled, (state, action) => {
                console.log('fulfilled: updateEvent', action,);
                // return action.payload.data
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled: logout - events', state);
                return initialState;
            })

    }
})

export default slice.reducer;