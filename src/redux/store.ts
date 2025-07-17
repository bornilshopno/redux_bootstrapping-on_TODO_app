import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "./features/to-do/todoSlice"

export const store = configureStore({
    reducer: {
        todo: todoReducer
    }

})

