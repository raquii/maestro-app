import { configureStore } from "@reduxjs/toolkit";
import { api } from './api'
import userReducer from "./userSlice";
import studentReducer from './studentsSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        students: studentReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export default store;