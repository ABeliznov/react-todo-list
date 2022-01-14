import {RootState} from "../store";

export const ToDoItemsState = (state: RootState) => {
    return state.todo.todo
}
export const ToDoIsFetchingState = (state: RootState) => {
    return state.todo.isFetching
}