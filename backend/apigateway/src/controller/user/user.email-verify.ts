import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { BadRequestError, ConfilctError } from '@ticket-common/common'
import { type Request, type Response } from 'express'
import { type responseError } from '../../types/types'

export const userEmailVerifyController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let message: responseError
  const token = req.params.token

  return await axios
    .get(
      `http://${process.env.AUTH_SRV}/v1/auth/user/signup/email?token=${token}`
    )
    .then((data: AxiosResponse) => {
      return res.status(data.status).json(data.data)
    })
    .catch((err: AxiosError) => {
      message = err.response?.data as responseError
      if ((err.response?.status === 409)) {
        throw new ConfilctError(message.error[0].message)
      }
      throw new BadRequestError(message.error[0].message)
    })
}
