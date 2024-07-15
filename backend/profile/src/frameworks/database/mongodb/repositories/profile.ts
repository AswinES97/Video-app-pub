import { type IUserAttr } from '../../../../types/types'
import { type IUserDoc, UserModel } from '../model/user'

export class User {
  async create (userData: IUserAttr): Promise<void> {
    const newUser = new UserModel({
      userId: userData.userId,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      img: userData.img,
      isBlocked: userData.isBlocked,
      isPhoneVerified: userData.isPhoneVerified,
      isEmailVerified: userData.isEmailVerified,
      createdAt: userData.createdAt,
      updatedAt: userData.updateAt
    })
    await newUser.save()
  }
}

export class Verify {
  async email (userId: string): Promise<IUserDoc | null> {
    return await UserModel.findOneAndUpdate({ userId }, { $set: { isEmailVerified: true } }, { returnNewDocument: true })
  }
}

export class UserInfo {
  async get (userId: string): Promise<IUserDoc | null> {
    return await UserModel.findOne({ userId })
  }

  async username (userId: string, username: string): Promise<IUserDoc | null> {
    return await UserModel.findOneAndUpdate({ userId }, { $set: { username } }, { returnNewDocument: true })
  }
}
