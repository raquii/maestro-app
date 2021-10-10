import { configureStore } from "@reduxjs/toolkit";
import { api } from './api'
import userReducer from "./userSlice";
import studentsReducer from './studentsSlice'
import settingsReducer from './settingsSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        students: studentsReducer,
        settings: settingsReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export default store;