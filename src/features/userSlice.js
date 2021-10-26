import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    address: "",
    id:"",
    studioName:"",
    studioId:"",
    nextLesson:{
        title: "",
        start:"",
    }
};

export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.login.matchPending, (state, action) => {
                console.log('pending', action);
            })
            .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
                console.log('fulfilled-login', action);
                const { id, attributes:{ firstName, lastName, email, address, phone, role, studioId, studioName, nextLesson  }} = action.payload.data;
                Object.assign(state, { id, firstName, lastName, email, address, phone, role, studioId, studioName, nextLesson  });
            })
            .addMatcher(api.endpoints.login.matchRejected, (state, action) => {
                console.log('rejected', action);
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled-logout', state);
                return initialState;
            })
            .addMatcher(api.endpoints.isLoggedIn.matchFulfilled, (state, action) => {
                console.log('fulfilled-session recovered', action);
                const { id, attributes:{ firstName, lastName, email, address, phone, role, studioId, studioName, nextLesson }} = action.payload.data;
                Object.assign(state, { id, firstName, lastName, email, address, phone, role, studioId, studioName, nextLesson });
            })
            .addMatcher(api.endpoints.updateTeacherProfile.matchFulfilled, (state, action) => {
                console.log('fulfilled-update teacher profile', action);
                console.log(action.payload)
            })
            .addMatcher(api.endpoints.signup.matchFulfilled, (state, action) => {
                console.log('fulfilled-signed up', action);
                const { id, attributes:{ firstName, lastName, email, address, phone, role, studioId, studioName, nextLesson  }} = action.payload.data;
                Object.assign(state, { id, firstName, lastName, email, address, phone, role, studioId, studioName, nextLesson });
            })
    }
})


export default slice.reducer;