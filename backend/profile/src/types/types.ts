import { type KafkaConsumerInterface } from '../adapters/Interfaces/queue/kafkaConsumer'
import { type KafkaMongDbInterface } from '../adapters/Interfaces/repositories/kafkaDbInterface'
import { type UserProfile } from '../adapters/Interfaces/repositories/profile'
import { type kafakEntitiesType } from '../entities/user'
import { type IUserDoc } from '../frameworks/database/mongodb/model/user'
import { type consumerKeys } from '../frameworks/queue/kafka/topics'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type expressType = typeof import('express')

export interface IUserAttr {
  userId: string
  username?: string
  email?: string
  phone?: string
  password?: string
  dob?: Date
  gender?: string
  img?: [string]
  isBlocked?: boolean
  isPhoneVerified?: boolean
  isEmailVerified?: boolean
  createdAt: Date
  updateAt: Date
}

// User Entity
export interface IUserEntity {
  userId: () => string
  username: () => string | undefined
  password: () => string | undefined
  email: () => string | undefined
  phone: () => string | undefined
  gender: () => string | undefined
  dob: () => Date | undefined
  img: () => [string] | undefined
  isBlocked: () => boolean | undefined
  isPhoneVerified: () => boolean | undefined
  isEmailVerified: () => boolean | undefined
}

// kafka interface
export interface IKafkaConsumer {
  // newtopic: (arg1: string) => Promise<void>
  consume: (arg1: KafkaMongDbInterface, arg2: consumerKeys, arg3: kafakEntitiesType) => Promise<void>
}

export interface IKafkaDbMongo {
  createUser: (arg1: IUserAttr) => Promise<void>
  verifyEmail: (arg1: string) => Promise<void>
}

export interface kafkaParams {
  kafaCalls: KafkaConsumerInterface
  kakfaMongDbCalls: KafkaMongDbInterface
  consumerKeys: consumerKeys
}

export interface IProfileDbRepositary {
  porfileData: (arg1: string) => Promise<IUserDoc | null>
}

export interface IProfileControllerParams {
  userDbCalls: UserProfile
}
