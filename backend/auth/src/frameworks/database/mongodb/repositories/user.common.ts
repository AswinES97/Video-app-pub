import { type IUserDoc, UserModel } from '../model/user'

export class UserCheckEmail {
  async doesEmailExist (email: string): Promise<IUserDoc | null> {
    return await UserModel.findOne({ email })
  }
}
