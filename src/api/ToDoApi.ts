import axios from 'axios'
import {ServerResponseType, ToDoItemType} from "../../types";

const baseURL = "http://localhost:3000/api/"
const instance = axios.create({
    baseURL: baseURL,
})


export const ToDoApi = {

    add: (task: string) => {
        return instance.post<ServerResponseType>('todo/', {
            task
        }).then(result => result.data)
    },

    update: (id: number, fields: Partial<Omit<ToDoItemType, 'id'>>) => {
        return instance.put<ServerResponseType>(`todo/${id}/`, fields).then(result => result.data)
    },

    delete: (id: number) => {
        return instance.delete(`todo/${id}/`).then(result => result.data)
    },

    get_all: () => {
        return instance.get(`todo/`).then(result => result.data)
    }

}