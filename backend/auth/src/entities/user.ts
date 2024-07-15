import { type IUserEntity, type IUserAttr } from '../types/types'

export const user = (data: IUserAttr): IUserEntity => {
  return {
    userId: () => data.userId,
    username: () => data.username,
    email: () => data.email,
    password: () => data.password,
    phone: () => data.phone,
    isBlocked: () => data.isblocked,
    isPhoneVerified: () => data.isEmailVerified,
    isEmailVerified: () => data.isEmailVerified
  }
}

export const kafakEntities = {
  user
}

export type kafakEntitiesType = typeof kafakEntities
