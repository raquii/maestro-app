import { createSlice } from "@reduxjs/toolkit";
import { api, updateStudents } from "./api";

const initialState = [];

export const slice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.fetchStudents.matchFulfilled, (state, action) => {
                console.log('fulfilled: fetchStudents', action,);
                const students = action.payload.data.map(s => ({
                    id: s.id,
                    firstName: s.attributes.firstName,
                    lastName: s.attributes.lastName,
                    phone: s.attributes.phone,
                    email: s.attributes.email,
                    address: s.attributes.address,
                    studentProfile: {
                        adult: s.attributes.studentProfile.data.attributes.adult,
                        grade: s.attributes.studentProfile.data.attributes.grade,
                        status: s.attributes.studentProfile.data.attributes.status,
                        gender: s.attributes.studentProfile.data.attributes.gender,
                        defaultLessonPrice: s.attributes.studentProfile.data.attributes.defaultLessonPrice,
                        defaultLessonDuration: s.attributes.studentProfile.data.attributes.defaultLessonDuration,
                        makeUpCredits: s.attributes.studentProfile.data.attributes.makeUpCredits,
                        birthday: s.attributes.studentProfile.data.attributes.birthday,
                        id: s.attributes.studentProfile.data.id,
                    }


                }))

                return students
            })
            .addMatcher(api.endpoints.updateStudents.matchFulfilled, (state, action) => {
                console.log('fulfilled: updateStudents', state, action.payload.data);
                const updatedStudents = action.payload.data.map(s => ({
                    id: s.id,
                    firstName: s.attributes.firstName,
                    lastName: s.attributes.lastName,
                    phone: s.attributes.phone,
                    email: s.attributes.email,
                    address: s.attributes.address,
                    studentProfile: {
                        adult: s.attributes.studentProfile.data.attributes.adult,
                        grade: s.attributes.studentProfile.data.attributes.grade,
                        status: s.attributes.studentProfile.data.attributes.status,
                        gender: s.attributes.studentProfile.data.attributes.gender,
                        defaultLessonPrice: s.attributes.studentProfile.data.attributes.defaultLessonPrice,
                        defaultLessonDuration: s.attributes.studentProfile.data.attributes.defaultLessonDuration,
                        makeUpCredits: s.attributes.studentProfile.data.attributes.makeUpCredits,
                        birthday: s.attributes.studentProfile.data.attributes.birthday,
                        id: s.attributes.studentProfile.data.id,
                    }
                }))
                const updatedState = state.map(student => updatedStudents.find(s => s.id === student.id) || student)
                
                return updatedState;
                
            })
            .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
                console.log('fulfilled-logout', state);
                return initialState;
            })

    }
})


export default slice.reducer;