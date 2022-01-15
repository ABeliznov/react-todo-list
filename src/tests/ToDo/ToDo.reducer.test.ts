import {ServerErrorType, ServerResponseType, ServerSuccessType, ToDoItemType} from "../../../types";
import {ServerStatusEnum} from "../../enums";
import {describe, expect, jest, beforeEach, it} from '@jest/globals'
import {ToDoApi} from "../../api/ToDoApi";
import {add_todo, delete_todo, toggle_todo} from "../../store/slices/ToDo.slice";
import {AsyncThunkAction, PayloadAction} from "@reduxjs/toolkit";
import ToDoSlice from "../../store/slices/ToDo.slice"
import store from "../../store/store"

const dispatchMock = jest.fn()
const getStateMock = jest.fn()
let actionMock: AsyncThunkAction<void, string, {}>;

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    ToDoApiMock.add.mockClear()
    ToDoApiMock.delete.mockClear()
})

jest.mock('../../api/ToDoApi')
const ToDoApiMock = ToDoApi as jest.Mocked<typeof ToDoApi>


describe('TODO SLICE TEST',  () => {

    const add_result_success: ServerSuccessType<ToDoItemType> = {
        status: ServerStatusEnum.SUCCESS,
        data: {
            id: 1,
            task: 'test task',
            completed: false
        }
    }

    it('should test initital todo state', async () => {
        const action = {type: add_todo.pending};
        const initialState = ToDoSlice({
            isFetching: false,
            todo: []
        }, action);
        expect(store.getState().todo).toEqual({isFetching: false, todo: []})
    })

    it('should add update and delete', async () => {
        const add_action: PayloadAction<ServerResponseType<ToDoItemType>> = {
            type: add_todo.fulfilled.type,
            payload: add_result_success
        }
        let newState = ToDoSlice({
            isFetching: false,
            todo: []
        }, add_action);
        expect(newState.todo).toHaveLength(1)

        const update_action: PayloadAction<ServerResponseType, string, {arg: ToDoItemType}> = {
            type: toggle_todo.fulfilled.type,
            payload: { status: ServerStatusEnum.SUCCESS },
            meta: { arg: newState.todo[0] }
        }
        newState = ToDoSlice(newState, update_action)
        expect(newState.todo[0].completed).toBeTruthy()

        newState = ToDoSlice(newState, update_action)
        expect(newState.todo[0].completed).toBeFalsy()

        const delete_action: PayloadAction<ServerResponseType, string, {arg: number}> = {
            type: delete_todo.fulfilled.type,
            payload: { status: ServerStatusEnum.SUCCESS },
            meta: { arg: 1 }
        }
        newState = ToDoSlice(newState, delete_action)

        expect(newState.todo).toHaveLength(0)
    });


    it('should count todo dispatches', async () => {

        ToDoApiMock.add.mockReturnValue(Promise.resolve(add_result_success))
        let task_name = 'test task'
        const thunk = add_todo(task_name)
        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(2);

    })

})
