import { createAction, props } from "@ngrx/store";
import { userData } from "src/types/types";

export const saveUser = createAction('save user data',props<{user: userData}>())