import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { JwtHsaRsa } from '../../services/jwt'
import { BadRequestError } from '@ticket-common/common'
import { type Request, type Response } from 'express'
import { type JwtPayload } from 'jsonwebtoken'
import { type responseError, type IJwtHsaSub } from '../../types/types'

export const newAccessTokenController = async (req: Request, res: Response): Promise<Response> => {
  const refreshToken = req.session.refreshToken

  if (refreshToken === undefined) {
    throw new BadRequestError('refresh token Expired')
  }

  const JwtHsa = new JwtHsaRsa()
  const payload = JwtHsa.verify(refreshToken) as JwtPayload

  if (payload === undefined) {
    throw new BadRequestError('refresh token expired')
  }
  const jwtData: IJwtHsaSub = JSON.parse(JSON.stringify(payload.data))

  return await axios
    .get(`http://${process.env.AUTH_SRV}/v1/auth/user/signin/newAccessToken?userId=${jwtData.userId}&role=${jwtData.role}&username=${jwtData.username}`)
    .then((response: AxiosResponse) => {
      return res.status(response.status).json(response.data)
    })
    .catch((err: AxiosError) => {
      const message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}
