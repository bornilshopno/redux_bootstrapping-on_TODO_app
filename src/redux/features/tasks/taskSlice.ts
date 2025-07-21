import type { RootState } from "@/redux/store";
import type { Itask } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";


interface IinitialState {
    tasks: Itask[];
    filter: "All" | 'High' | 'Medium' | 'Low'
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
    filter: 'All'
}


type DraftTask = Pick<Itask, 'title' | 'description' | 'dueDate' | 'priority'|'assignedUser'>

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
            console.log(action.payload)
            state.tasks.push(taskData)
        },

        toggleCompleted: (state, action: PayloadAction<string>) => {
            state.tasks.forEach((task) => task.id === action.payload ? (task.isCompleted = !task.isCompleted) : task)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        updateTask: (state, action: PayloadAction<Itask>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        updateFilter: (state, action: PayloadAction<'High' | 'Medium' | 'Low' | 'All'>) => {
            state.filter = action.payload;
        }


    }
})


export const selectTask = (state: RootState) => {
const filter = state.todo.filter;
if (filter==='Low'){
    return state.todo.tasks.filter((task)=>task.priority==='Low')
}
if (filter==='Medium'){
    return state.todo.tasks.filter((task)=>task.priority==='Medium')
}
if (filter==='High'){
    return state.todo.tasks.filter((task)=>task.priority==='High')
}
    return state.todo.tasks

}
export const selectFilter = (state: RootState) => state.todo.filter

export const { addTask, toggleCompleted, deleteTask, updateTask, updateFilter } = todoSlice.actions
export default todoSlice.reducer