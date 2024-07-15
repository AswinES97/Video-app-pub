import jwt, { type JwtPayload } from 'jsonwebtoken'
import configKeys from '../../config/config'
import { type IJwtHsaSub } from '../../types/types'

export class MailToken {
  generate (data: string): string | any {
    // Todo error for not generating token
    return jwt.sign({ sub: data }, configKeys.JWT_SECRET, { expiresIn: '1h' })
  }

  verify (token: string): string | JwtPayload | undefined {
    try {
      return jwt.verify(token, configKeys.JWT_SECRET)
    } catch (err) {
      // todo - error for verify
      console.log('jwt verify error')
      throw new Error('Token Expired')
    }
  }
}

export class JwtHsaRsa {
  accessToken (data: IJwtHsaSub): string {
    return jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + 60 * 15, // 15 min
        iat: Math.floor(Date.now() / 1000)
      },
      configKeys.JWT_PRIVATE_KEY,
      { algorithm: 'RS256' }
    )
  }

  refreshToken (data: IJwtHsaSub): string {
    return jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15, // 15 days
        iat: Math.floor(Date.now() / 1000)
      },
      configKeys.JWT_PRIVATE_KEY,
      { algorithm: 'RS256' }
    )
  }

  verify (token: string): JwtPayload | undefined | string {
    try {
      return jwt.verify(token, configKeys.JWT_PUBLIC_KEY)
    } catch (err) {
      console.log(err)
      return undefined
    }
  }
}
