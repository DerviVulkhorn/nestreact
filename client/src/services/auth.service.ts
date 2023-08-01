import { instance } from "../api/axios.api";
import { IResponceData, IUser, IUserData } from "../types/types";

export const AuthService = {
    //Принимаем объект userData, типа IUserData
    //Возвращает Promise типа IResponceData
    async registration(userData : IUserData): Promise<IResponceData | undefined> {
        const {data} = await instance.post<IResponceData>('user', userData)
        return data
    },
    async login(userData: IUserData): Promise<IUser | undefined> {
        const {data} = await instance.post<IUser>('auth/login',userData)
        return data
    },
    async getMe(): Promise<IUser | undefined> {
        const {data} = await instance.get<IUser>('auth/profile')
        if (data) return data
    },
}