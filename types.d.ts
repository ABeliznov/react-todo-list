import {ServerStatusEnum} from "./src/enums";

type ServerSuccessType<D = any> = {
    status: ServerStatusEnum.SUCCESS
    data?: D
}
type ServerErrorType = {
    status: ServerStatusEnum.ERROR
}

export type ServerResponseType<D = any> = ServerSuccessType<D> | ServerErrorType


export type ToDoItemType = {
    id: number,
    task: string,
    completed: boolean
}