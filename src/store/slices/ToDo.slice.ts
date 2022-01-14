import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ToDoApi} from "../../api/ToDoApi";
import {ServerResponseType, ToDoItemType} from "../../../types";
import {ServerStatusEnum} from "../../enums";

let initialState = {
    isFetching: false,
    todo: [] as ToDoItemType[]
}
type initialStateType = typeof initialState


export const get_todos = createAsyncThunk('todos/get_list', async () => {
    return await ToDoApi.get_all()
})
export const add_todo = createAsyncThunk('todos/add_todo', async (task: string) => {
    return await ToDoApi.add(task)
})
export const delete_todo = createAsyncThunk('todos/delete_todo', async (id: number) => {
    return await ToDoApi.delete(id)
})
export const toggle_todo = createAsyncThunk('todos/toggle_todo', async (item: ToDoItemType) => {
    return await ToDoApi.update(item.id, {
        completed: !item.completed
    })
})


const ToDoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(get_todos.pending, (state) => {
              state.isFetching = true
        })
        builder.addCase(get_todos.fulfilled, (state, action: PayloadAction<ServerResponseType>) => {
            state.isFetching = false
            if( action.payload.status === ServerStatusEnum.SUCCESS )
                state.todo = action.payload.data
        })

        builder.addCase(add_todo.fulfilled, (state, action: PayloadAction<ServerResponseType<ToDoItemType>>) => {
            if( action.payload.status === ServerStatusEnum.SUCCESS )
            {
                state.todo.push({
                    id: action.payload.data.id,
                    task: action.payload.data.task,
                    completed: action.payload.data.completed
                })
            }
        })

        builder.addCase(delete_todo.fulfilled, (state, action: PayloadAction<ServerResponseType<ToDoItemType>, string, {arg: number}>) => {
            if( action.payload.status === ServerStatusEnum.SUCCESS )
            {
                state.todo = state.todo.filter(item => item.id !== action.meta.arg)
            }
        })

        builder.addCase(toggle_todo.fulfilled, (state, action: PayloadAction<ServerResponseType<ToDoItemType>, string, {arg: ToDoItemType}>) => {
            if( action.payload.status === ServerStatusEnum.SUCCESS )
            {
                state.todo = state.todo.map(item => {
                    if( item.id === action.meta.arg.id )
                        item.completed = !item.completed
                    return item
                })
            }
        })
    },
})


export default ToDoSlice.reducer