import axios from 'axios'
import {ToDoItemType} from "../src/store/slices/ToDo.slice";
import {ServerResponseType} from "../types";

const baseURL = "http://localhost:3000/api/"
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})


export const ToDoApi = {

    add: (task: string) => {
        return instance.post<ServerResponseType>('todo/', {
            task
        }).then(result => result.data)
    },

    update: (id: string, fields: Omit<ToDoItemType, 'id'>) => {
        return instance.put<ServerResponseType>(`todo/${id}/`, fields).then(result => result.data)
    },

    delete: (id: string) => {
        return instance.delete(`todo/${id}/`).then(result => result.data)
    },

    get_all: () => {
        return instance.get(`todo/`).then(result => result.data)
    }

}