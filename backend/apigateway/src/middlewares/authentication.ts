import { JwtHsaRsa } from '../services/jwt'
import { UnauthorizedError } from '@ticket-common/common'
import { type JwtPayload } from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1]
  const tokenHsa = new JwtHsaRsa()
  const payload = tokenHsa.verify(token as string) as JwtPayload

  if (payload === undefined) {
    throw new UnauthorizedError('access token expired')
  }

  if (payload.data.role === 'user') {
    req.user = payload.data
    next()
  }
}
