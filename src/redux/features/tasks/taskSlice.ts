import type { RootState } from "@/redux/store";
import type { Itask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";


interface IinitialState {
    tasks: Itask[];
    filter: "all" | 'High' | 'Medium' | 'Low'
}

const initialState: IinitialState = {
    tasks: [],
    // tasks: [{
    //     id: "1",
    //     title: "one",
    //     description: "desc-1",
    //     dueDate: "2025-11-11",
    //     isCompleted: false,
    //     priority: "High"
    // },
    // {
    //     id: "2",
    //     title: "two",
    //     description: "desc-2",
    //     dueDate: "2025-11-11",
    //     isCompleted: false,
    //     priority: "Medium"
    // }
    // ],
    filter: 'all'
}


type DraftTask = Pick<Itask, 'title' | 'description' | 'dueDate' | 'priority'>

const createTask = (taskData: DraftTask): Itask => {
    return {
        id: nanoid(),
        isCompleted: false,
        ...taskData
    }
}
const todoSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Itask>) => {
            const taskData = createTask(action.payload)
            state.tasks.push(taskData)
        },

        toggleCompleted: (state, action: PayloadAction<string>) => {
            state.tasks.forEach((task) => task.id === action.payload ? (task.isCompleted = !task.isCompleted) : task)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        updateTask: (state,action:PayloadAction<Itask> )=>{
            state.tasks.forEach((task)=>task.id === action.payload.id ? action.payload : task)

        }


    }
})


export const selectTask = (state: RootState) => state.todo.tasks
export const selectFilter = (state: RootState) => state.todo.filter

export const { addTask, toggleCompleted , deleteTask } = todoSlice.actions
export default todoSlice.reducer