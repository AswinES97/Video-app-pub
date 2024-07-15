import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { BadRequestError } from '@ticket-common/common'
import { type Request, type Response } from 'express'
import { type ISigninToken, type responseError } from '../../types/types'

export const userSigninEmailController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return await axios
    .post(
      `http://${process.env.AUTH_SRV}/v1/auth/user/signin/email`,
      req.body
    )
    .then((response: AxiosResponse) => {
      const resData = response.data as ISigninToken
      // setting refresh token in session. session config is in config file.
      req.session.refreshToken = resData.refreshToken
      return res.status(response.status).json({ accessToken: resData.accessToken })
    })
    .catch((err: AxiosError) => {
      const message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}
