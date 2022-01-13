import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from 'uuid'
import {ToDoApi} from "../../../api/ToDoApi";
import {ServerResponseType} from "../../../types";

export type ToDoItemType = {
    id: string,
    text: string,
    selected: boolean
}
let initialState = {
    todo: [] as ToDoItemType[]
}
type initialStateType = typeof initialState


export const get_todos = createAsyncThunk('todos/get_list', async () => {
    return await ToDoApi.get_all()
})


const ToDoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        addToDo: (state, action: PayloadAction<string>) => {
            state.todo.push({
                id: v4(),
                text: action.payload,
                selected: false
            })
        },
        toggleToDoSelected: (state, action: PayloadAction<string>) => {
            state.todo = state.todo.map(item => {
                if( item.id === action.payload )
                    item.selected = !item.selected
                return item
            })
        },
        deleteToDo: (state, action: PayloadAction<string>) => {
            state.todo = state.todo.filter(item => item.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(get_todos.fulfilled, (state, action: PayloadAction<ServerResponseType>) => {
            console.log(action.payload)
            state.todo = action.payload.data
        })
    },
})

export const {addToDo, toggleToDoSelected, deleteToDo} = ToDoSlice.actions


export default ToDoSlice.reducer