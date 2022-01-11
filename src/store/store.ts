import {configureStore} from "@reduxjs/toolkit";
import ToDoReducer from './slices/ToDo.slice'

const store = configureStore({
    reducer: {
        todo: ToDoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store