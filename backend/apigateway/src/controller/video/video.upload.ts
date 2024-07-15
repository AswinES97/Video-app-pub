import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { type Request, type Response } from 'express'
import { configKeys } from '../../config/configKeys'
import { type responseError } from '../../types/types'
import { BadRequestError } from '@ticket-common/common'

export const initializeVideoUploadController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return await axios
    .post(`http://${configKeys.VIDEO_SRV}/video/initialize`, {
      filename: req.body.filename,
      user: req.user
    })
    .then((response: AxiosResponse) => {
      return res.status(response.status).json(response.data)
    })
    .catch((err: AxiosError) => {
      const message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}

export const uploadVideoComplete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  req.body.userId = req.user?.userId
  return await axios
    .post(`http://${configKeys.VIDEO_SRV}/video/complete`, req.body)
    .then((response: AxiosResponse) => {
      return res.status(response.status).json(response.data)
    })
    .catch((err: AxiosError) => {
      const message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}
