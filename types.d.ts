declare module '*.scss............' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}


export enum ServerStatusEnum {
    SUCCESS= 1,
    ERROR = 0
}
export type ServerResponseType<D = any> = {
    status: ServerStatusEnum
    data?: D
}