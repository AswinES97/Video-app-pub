import { type IUserDoc, UserModel } from '../model/user'

import { type IUserEntity } from '../../../../types/types'

export class UserSignupEmail {
  async email (userData: IUserEntity): Promise<IUserDoc> {
    const user = new UserModel({
      userId: userData.userId(),
      username: userData.username(),
      email: userData.email(),
      password: userData.password()
    })

    return await user.save()
  }
}

export class Verified {
  async email (userId: string): Promise<IUserDoc | null> {
    return await UserModel.findOneAndUpdate({ userId }, { $set: { isEmailVerified: true } }, { new: true })
  }

  async hasVerified (userId: string): Promise<IUserDoc | null > {
    return await UserModel.findOne({ userId }, { isEmailVerified: 1 })
  }
}

export interface IUserDBCalls {
  emailSignup: (arg1: IUserEntity) => Promise<IUserDoc>
  doesEmailExist: (arg1: string) => Promise<IUserDoc | null>
  verifiedEmail: (arg1: string) => Promise<IUserDoc | null>
}
