//Будет объект IUser 
//При логине мы не будем возвращать пароль
//Нужно для формирования JWT токена
export interface IUser{
    id:string
    email:string
}