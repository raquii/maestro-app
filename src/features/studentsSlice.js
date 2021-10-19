import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = [];

export const slice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
                console.log('fulfilled: login - students', action);
                return action.payload.data.attributes.students.data.map(s=> ({id: s.id, ...s.attributes})); 
            })
            .addMatcher(api.endpoints.isLoggedIn.matchFulfilled, (state, action) => {
                console.log('fulfilled: isLoggedIn - student', action);
                return action.payload.data.attributes.students.data.map(s=> ({id: s.id, ...s.attributes})); 
              
            })
            .addMatcher(api.endpoints.createStudent.matchFulfilled, (state, action) => {
                console.log('fulfilled: createStudent', action,);
                const {id, attributes} = action.payload.data
                state.push({id:id, ...attributes})
            })
            .addMatcher(api.endpoints.deleteStudent.matchFulfilled, (state, action) => {
                console.log('fulfilled: deleteStudent', action,);
                return state.filter(s => s.id !== action.payload.id);
            })
            .addMatcher(api.endpoints.deleteStudents.matchFulfilled, (state, action) => {
                console.log('fulfilled: deleteStudents', action,);
                return action.payload.data.map(s=> ({id: s.id, ...s.attributes}));
            })
            .addMatcher(api.endpoints.updateStudent.matchFulfilled, (state, action) => {
                console.log('fulfilled: updateStudent', state, action);
                return state.map(s=> s.id===action.payload.data.id ? {id: action.payload.data.id, ...action.payload.data.attributes} : s);
            })
            .addMatcher(api.endpoints.updateStudents.matchFulfilled, (state, action) => {
                console.log('fulfilled: updateStudents', state, action);
                const updatedStudents = action.payload.data.map(s=> ({id: s.id, ...s.attributes}));
                return state.map(student => updatedStudents.find(s => s.id === student.id) || student);
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled-logout', state);
                return initialState;
            })

    }
})


export default slice.reducer;