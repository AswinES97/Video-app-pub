import { JwtPayload } from "jwt-decode";

export interface userStore extends JwtPayload{
    data:{
        userId: string,
        role: string,
        username: string
    } 
}

export interface userData{
    userId: string,
    role: string,
    username: string
} 

export interface IStoreUser{
    user: userData
}