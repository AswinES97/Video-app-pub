import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { UserCheckEmail } from '../../../frameworks/database/mongodb/repositories/user.common'

// import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'

export class UserLoginDBInterface {
  private readonly userChkEmail: UserCheckEmail

  constructor () {
    this.userChkEmail = new UserCheckEmail()
  }

  async userDetails (email: string): Promise<IUserDoc | null> {
    return await this.userChkEmail.doesEmailExist(email)
  }
}
