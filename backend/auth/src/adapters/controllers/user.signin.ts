import { type Request, type Response } from 'express'
import { type IJwtHsaSub, type IUserLoginParams } from '../../types/types'
import { emailLogin } from '../../user-cases/auth/user.signin'

export const userLoginController = (
  params: IUserLoginParams
): {
    userEmailLogin: (arg1: Request, arg2: Response) => Promise<void>
    newAccessToken: (arg1: Request, arg2: Response) => void
  } => {
  const userEmailLogin = async (req: Request, res: Response): Promise<void> => {
    const userNameAndUserId = await emailLogin(req.body, params)
    const userData: IJwtHsaSub = {
      userId: userNameAndUserId.userId,
      username: userNameAndUserId.username as string,
      role: 'user'
    }

    res.status(200).json({
      status: 'success',
      refreshToken: params.serviceCalls.refreshToken(userData),
      accessToken: params.serviceCalls.accessToken(userData)
    })
  }

  const newAccessToken = (req: Request, res: Response): void => {
    const { userId, username, role } = req.query
    const accessToken = params.serviceCalls.accessToken({
      userId: (userId as string),
      username: (username as string),
      role: (role as string)
    })

    res.status(200).json({
      status: 'success',
      accessToken
    })
  }
  return {
    userEmailLogin,
    newAccessToken
  }
}
