import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
};

export const slice = createSlice({
    name: "families",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
                console.log('fulfilled: login - families', action);
                return action.payload.data.attributes.families.data.map(f =>({id: f.id, members: f.attributes.members, names: f.attributes.names}));
            })
            .addMatcher(api.endpoints.isLoggedIn.matchFulfilled, (state, action) => {
                console.log('fulfilled: isLoggedIn - families', action);
                return action.payload.data.attributes.families.data.map(f =>({id: f.id, members: f.attributes.members, names: f.attributes.names}));
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled: logout - families', state);
                return initialState;
            })
    }
})


export default slice.reducer;