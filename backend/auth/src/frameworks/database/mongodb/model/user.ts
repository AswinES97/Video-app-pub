import mongoose from 'mongoose'

import { type IUserAttr } from '../../../../types/types'

// interface for user model
interface IUserModel extends mongoose.Model<IUserDoc> {
  build: (attrs: IUserAttr) => IUserDoc
}

// interface for return user model/document
export interface IUserDoc extends mongoose.Document {
  userId: string
  username?: string
  email?: string
  phone?: string
  password?: string
  isBlocked?: boolean
  isPhoneVerified?: boolean
  isEmailVerified?: boolean
}

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true,
  // to delete _id, _v, password from return document
  toJSON: {
    transform (doc, ret) {
      delete ret._id
      delete ret.__v
      delete ret.password
    }
  }
})

userSchema.statics.build = (attrs: IUserAttr) => {
  return new User(attrs)
}

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema)

export { User as UserModel }
