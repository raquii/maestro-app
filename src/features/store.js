import { configureStore } from "@reduxjs/toolkit";
import { api } from './api'
import userReducer from "./userSlice";
import studentsReducer from './studentsSlice'
import settingsReducer from './settingsSlice'
import eventsReducer from './eventsSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        students: studentsReducer,
        settings: settingsReducer,
        events: eventsReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export default store;