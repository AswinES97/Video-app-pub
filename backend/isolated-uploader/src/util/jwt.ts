import jwt, { type JwtPayload } from 'jsonwebtoken'
import { configKeys } from '../config/configKeys'

// jwt is made with RS256
export class JwtHsaRsa {
  verify(token: string): JwtPayload | undefined | string {
    try {
      return jwt.verify(token, configKeys.JWT_PUBLIC_KEY)
    } catch (err) {
      console.log(err)
      return undefined
    }
  }
}
