import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from 'uuid'
import {act} from "react-dom/test-utils";

export type ToDoItemType = {
    id: string,
    text: string,
    selected: boolean
}
let initialState = {
    todo: [] as ToDoItemType[]
}
type initialStateType = typeof initialState
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
    }
})

export const {addToDo, toggleToDoSelected, deleteToDo} = ToDoSlice.actions


export default ToDoSlice.reducer