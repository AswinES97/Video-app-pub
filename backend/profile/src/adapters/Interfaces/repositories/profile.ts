import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { type IProfileDbRepositary } from '../../../types/types'

import { UserInfo } from '../../../frameworks/database/mongodb/repositories/profile'

export class UserProfile implements IProfileDbRepositary {
  private readonly userInfo: UserInfo

  constructor () {
    this.userInfo = new UserInfo()
  }

  async porfileData (userId: string): Promise<IUserDoc | null> {
    return await this.userInfo.get(userId)
  }

  async updateUsername (userId: string, username: string): Promise<IUserDoc | null> {
    return await this.userInfo.username(userId, username)
  }
}
