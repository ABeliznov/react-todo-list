import {RootState} from "../store";

export const ToDoItemsState = (state: RootState) => {
    return state.todo.todo
}