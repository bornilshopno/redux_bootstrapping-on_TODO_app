import type { RootState } from "@/redux/store";
import type { Itask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    tasks: Itask[];
    filter: "all" | 'High' | 'Medium' | 'Low'
}

const initialState: IinitialState = {

    tasks: [{
        id: "1",
        title: "one",
        description: "desc-1",
        dueDate: "2025-11-11",
        isCompleted: false,
        priority: "High"
    },
    {
        id: "2",
        title: "two",
        description: "desc-2",
        dueDate: "2025-11-11",
        isCompleted: false,
        priority: "Medium"
    }
],
filter: 'all'
}

const todoSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // addTodo:(state,action)=>{ state.count= state.count+ action.payload}

    }
})

// export const {addTodo}= todoSlice.actions
export const selectTask = (state: RootState) => state.todo.tasks
export const selectFilter = (state: RootState) => state.todo.filter
export default todoSlice.reducer