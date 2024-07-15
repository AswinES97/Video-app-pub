import axios, { type AxiosError } from 'axios'
import { BadRequestError } from '@ticket-common/common'
import { configKeys } from '../../config/configKeys'
import { type Request, type Response } from 'express'
import { type responseError } from '../../types/types'

const userSignupController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return await axios
    .post(
      `http://${configKeys.AUTH_SRV}/v1/auth/user/signup/email`,
      req.body
    )
    .then(async (data) => {
      return res.status(data.status).json({
        status: 'success'
      })
    })
    .catch((err: AxiosError) => {
      const message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}

export { userSignupController }
