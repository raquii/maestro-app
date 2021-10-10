import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
    // columnViews: {
    //     firstName: false,
    //     lastName: false,
    //     age: true,
    //     birthday: true,
    //     defaultLessonDuration: true,
    //     defaultLessonPrice: true,
    //     email: false,
    //     phone: true,
    //     family: true,
    //     gender: true,
    //     groups: true,
    //     makeUpCredits: false,
    //     status: false,
    // }
};

export const slice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
                console.log('fulfilled: login - settings', action);
                return action.payload.data.attributes.preferences.data
            })
            .addMatcher(api.endpoints.isLoggedIn.matchFulfilled, (state, action) => {
                console.log('fulfilled: isLoggedIn - settings', action);
                return action.payload.data.attributes.preferences.data
            })
            .addMatcher(api.endpoints.updateSettings.matchFulfilled, (state, action) => {
                console.log('fulfilled: settings', action,);
                return action.payload.data
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled: logout - settings', state);
                return initialState;
            })

    }
})


export default slice.reducer;