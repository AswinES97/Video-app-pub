import { type IUserEntity, type IUserAttr } from '../types/types'

const user = (data: IUserAttr): IUserEntity => {
  return {
    userId: () => data.userId,
    username: () => data.username,
    email: () => data.email,
    password: () => data.password,
    phone: () => data.phone,
    isBlocked: () => data.isBlocked,
    isPhoneVerified: () => data.isEmailVerified,
    isEmailVerified: () => data.isEmailVerified,
    dob: () => data.dob,
    gender: () => data.gender,
    img: () => data.img
  }
}

export const kafakEntities = {
  user
}

export type kafakEntitiesType = typeof kafakEntities
