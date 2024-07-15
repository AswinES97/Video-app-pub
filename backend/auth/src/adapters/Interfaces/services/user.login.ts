import { JwtHsaRsa } from '../../../frameworks/services/jwt'
import { Password } from '../../../frameworks/services/user'
import { type IJwtHsaSub } from '../../../types/types'

export class UserLoginServiceI {
  private readonly password: Password
  private readonly jwtHsaRsa: JwtHsaRsa

  constructor () {
    this.password = new Password()
    this.jwtHsaRsa = new JwtHsaRsa()
  }

  async comparePassword (storedPassword: string, userInputPassword: string): Promise<boolean> {
    return await this.password.compare(storedPassword, userInputPassword)
  }

  refreshToken (data: IJwtHsaSub): string {
    return this.jwtHsaRsa.refreshToken(data)
  }

  accessToken (data: IJwtHsaSub): string {
    return this.jwtHsaRsa.accessToken(data)
  }
}
