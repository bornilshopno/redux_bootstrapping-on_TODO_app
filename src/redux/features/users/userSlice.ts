import type { RootState } from "@/redux/store";
import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialUsers{
    users: IUser[]
}

const initialUsers:InitialUsers={
users:[{id:"1", name: "Muad"},
    {id:"2", name:"Manna"}
]
}

type DraftUser= Pick <IUser, 'name'>
const id= nanoid()
const createUser=(newUserDetail:DraftUser):IUser=>{
    return ({id, ...newUserDetail})
}

const userSlice= createSlice({
    name:"users",
    initialState:initialUsers,
    reducers:{
        addUser:(state,action:PayloadAction<IUser>)=>{
            const newUser=createUser(action.payload);
            state.users.push(newUser)
        },
        removeUser: (state,action: PayloadAction<string>)=>{
            state.users=state.users.filter((user)=>user.id!== action.payload)
        }

    }
})

export const selectUsers=(state:RootState)=>state.user.users;

export const {addUser, removeUser}=userSlice.actions;

export default userSlice.reducer;