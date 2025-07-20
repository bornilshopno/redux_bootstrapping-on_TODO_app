import type { RootState } from "@/redux/store";
import type { Itask } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

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
        addTask: (state, action:PayloadAction<Itask>) => {
            const id= uuidv4();
            const taskData={...action.payload, id, isCompleted:false}
            state.tasks.push(taskData)
        }
     

    }
})

// export const {addTodo}= todoSlice.actions
export const selectTask = (state: RootState) => state.todo.tasks
export const selectFilter = (state: RootState) => state.todo.filter

export const {addTask}= todoSlice.actions
export default todoSlice.reducer