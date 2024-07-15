import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { UserCheckEmail } from '../../../frameworks/database/mongodb/repositories/user.common'
import { type IUserDBCalls, UserSignupEmail, Verified } from '../../../frameworks/database/mongodb/repositories/user.signup'
import { type IUserEntity } from '../../../types/types'

export class UserSignupDbInterface implements IUserDBCalls {
  private readonly signupEmail: UserSignupEmail
  private readonly checkEmil: UserCheckEmail
  private readonly updateVerifid: Verified

  constructor () {
    this.signupEmail = new UserSignupEmail()
    this.checkEmil = new UserCheckEmail()
    this.updateVerifid = new Verified()
  }

  async emailSignup (userData: IUserEntity): Promise<IUserDoc> {
    return await this.signupEmail.email(userData)
  }

  async doesEmailExist (email: string): Promise<IUserDoc | null> {
    return await this.checkEmil.doesEmailExist(email)
  }

  async verifiedEmail (userId: string): Promise<IUserDoc | null> {
    return await this.updateVerifid.email(userId)
  }

  async isVerified (userId: string): Promise<IUserDoc | null> {
    return await this.updateVerifid.hasVerified(userId)
  }
}
