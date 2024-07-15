import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { configKeys } from '../../config/configKeys'
import { BadRequestError } from '@ticket-common/common'
import { type Request, type Response } from 'express'
import { type responseError, type IJwtHsaSub } from '../../types/types'

export const getUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let message: responseError
  const userData = req.user as IJwtHsaSub

  return await axios
    .get(`http://${configKeys.PROFILE_SRV}/api/v1/profile/user/${userData.userId}`)
    .then((response: AxiosResponse) => {
      return res.status(response.status).send(response.data)
    })
    .catch((err: AxiosError) => {
      message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}

export const updateUsernameController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let message: responseError
  const userData = req.user as IJwtHsaSub

  return await axios
    .patch(`http://${configKeys.PROFILE_SRV}/api/v1/profile/user/username/${userData.userId}`, { username: req.body.username })
    .then((response: AxiosResponse) => {
      return res.status(response.status).send(response.data)
    })
    .catch((err: AxiosError) => {
      message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}
