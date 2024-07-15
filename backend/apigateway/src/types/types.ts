// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type expressType = typeof import('express')

export interface responseError {
  error: [
    {
      message: string
    }
  ]
}

export interface IUserAttr {
  userId: string
  username?: string
  email?: string
  phone?: string
  password?: string
  isblocked?: boolean
  isPhoneVerified?: boolean
  isEmailVerified?: boolean
}

export interface IJwtHsaSub {
  username: string
  userId: string
  role: string
}

export interface ISigninToken {
  status: string
  refreshToken: string
  accessToken: string
}
