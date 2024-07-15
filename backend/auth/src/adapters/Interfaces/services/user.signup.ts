import { type IUserSignup } from '../../../frameworks/services/user'
import { type JwtPayload } from 'jsonwebtoken'
import { Password, UserId } from '../../../frameworks/services/user'
import { MailToken } from '../../../frameworks/services/jwt'
import { Mailer } from '../../../frameworks/services/node-mailer'
export class UserSignupServiceI implements IUserSignup {
  private readonly password: Password
  private readonly userId: UserId
  private readonly mailToken: MailToken
  private readonly nodeMailer: Mailer

  constructor () {
    this.password = new Password()
    this.userId = new UserId()
    this.mailToken = new MailToken()
    this.nodeMailer = new Mailer()
  }

  async hashPass (userPassword: string): Promise<string> {
    return await this.password.hash(userPassword)
  }

  async comparePass (
    dbPassword: string,
    inputPassword: string
  ): Promise<boolean> {
    return await this.password.compare(dbPassword, inputPassword)
  }

  generateId (): string {
    return this.userId.create()
  }

  generateMailToken (userId: string): string {
    return this.mailToken.generate(userId)
  }

  verifyMailToken (token: string): string | JwtPayload | undefined {
    return this.mailToken.verify(token)
  }

  async sentMail (mail: string, token: string): Promise<undefined> {
    await this.nodeMailer.sentMail(mail, token)
  }
}
