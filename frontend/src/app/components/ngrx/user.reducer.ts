import { createReducer, on } from "@ngrx/store"
import { saveUser } from "./user.action"
import { userStore } from "src/types/types"

const initialState = {}

export const userReducer = createReducer(
    initialState,
    on(saveUser,(state,{user})=>({...state , user}))
)