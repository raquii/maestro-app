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
            .addMatcher(api.endpoints.createRecurringEvent.matchFulfilled, (state, action) => {
                console.log('fulfilled: createRecurringEvent', action);
                const newEvents = [...state, ...action.payload.data.map(e=>({id: e.id, ...e.attributes}))]
                return newEvents
            })
            .addMatcher(api.endpoints.updateEvent.matchFulfilled, (state, action) => {
                console.log('fulfilled: updateEvent', action.payload.data);
                return state.map(e=> e.id === action.payload.data.id ? {id: action.payload.data.id, ...action.payload.data.attributes} : e)
            })
            .addMatcher(api.endpoints.updateFutureEventOccurances.matchFulfilled, (state, action) => {
                console.log('fulfilled: updateFutureEvents', action,);
                // return action.payload.data
            })
            .addMatcher(api.endpoints.updateAllEventOccurances.matchFulfilled, (state, action) => {
                console.log('fulfilled: updateAllEvents', action,);
                // return action.payload.data
            })
            .addMatcher(api.endpoints.deleteEvent.matchFulfilled, (state, action) => {
                console.log('fulfilled: deleteEvent', action,);
                return state.filter(event => parseInt(event.id) !== action.payload.id)
            })
            .addMatcher(api.endpoints.deleteFutureEventOccurances.matchFulfilled, (state, action) => {
                console.log('fulfilled: deleteFutureEvents', action,);
                // return action.payload.data
            })
            .addMatcher(api.endpoints.deleteAllEventOccurances.matchFulfilled, (state, action) => {
                console.log('fulfilled: deleteAllEvents', action,);
                // return action.payload.data
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled: logout - events', state);
                return initialState;
            })

    }
})

export default slice.reducer;