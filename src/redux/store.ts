import { configureStore } from '@reduxjs/toolkit';
import taskReducer from "./features/tasks/taskSlice"
import userReducer from './features/users/userSlice';

export const store = configureStore({
    reducer: {
        todo: taskReducer,
        user: userReducer
    }

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

