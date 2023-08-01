//Для типизации данных (Особености type script)
export interface IUserData{
    full_name:string,
    email:string,
    password:string,
}

//Для интерфейса IResponceData
export interface IResponceUser{
    full_name:string,
    email:string,
    id:number,
    createdAt:string,
    updatedAt:string,
    password:string
}

//Для получения ответов
export interface IResponceData{
    token:string
    user : IResponceUser
}

//Для userSlicer
export interface IUser{
    id:number,
    full_name:string,
    email:string,
    token:string,
}