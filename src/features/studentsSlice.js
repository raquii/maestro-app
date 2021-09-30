import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
    students: []
};

export const slice = createSlice({
    name: "students",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.students.matchFulfilled, (state, action) => {
                console.log('fulfilled-login', action);
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled-logout', state);
                return initialState;
            })
            
    }
})


export default slice.reducer;