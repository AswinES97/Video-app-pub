// import { KafkaConsumerInterface, type KafkaInterface } from '../adapters/Interfaces/queue/kafka'
// import { KafkaMongDbInterface } from '../adapters/Interfaces/repositories/kafkaDbInterface'
import { type KafkaInterface } from '../adapters/Interfaces/queue/kafka'
import { type UserLoginDBInterface } from '../adapters/Interfaces/repositories/userLoginDBInterface'
import { type UserSignupDbInterface } from '../adapters/Interfaces/repositories/userSignupDBInterface'
import { type UserLoginServiceI } from '../adapters/Interfaces/services/user.login'
import { type UserSignupServiceI } from '../adapters/Interfaces/services/user.signup'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type expressType = typeof import('express')

export interface IUserAttr {
  userId: string
  username?: string
  email?: string
  phone?: string
  password?: string
  isblocked?: boolean
  isPhoneVerified?: boolean
  isEmailVerified?: boolean
}

// Interface for signup controller parameters/argument objects
export interface IUserSignupParmeters {
  userDbCalls: UserSignupDbInterface
  serviceCalls: UserSignupServiceI
  kafkaCalls: KafkaInterface
}

// interface for login controller
export interface IUserLoginParams {
  userDbCalls: UserLoginDBInterface
  serviceCalls: UserLoginServiceI
}

// User Entity
export interface IUserEntity {
  userId: () => string
  username: () => string | undefined
  password: () => string | undefined
  email: () => string | undefined
  phone: () => string | undefined
  isBlocked: () => boolean | undefined
  isPhoneVerified: () => boolean | undefined
  isEmailVerified: () => boolean | undefined
}

// kafka interface
export interface IKafkaProducer {
  // newtopic: (arg1: string) => Promise<void>
  produce: (arg1: IUserAttr, agr2: string) => Promise<void>
}

export interface kafkaParams {
  kafaCalls: KafkaConsumerInterface
  kakfaMongDbCalls: KafkaMongDbInterface
  consumerKeys: consumerKeys
}

export interface IKafkaConsumer {
  // newtopic: (arg1: string) => Promise<void>
  consume: (arg1: KafkaMongDbInterface, arg2: consumerKeys, arg3: kafakEntitiesType) => Promise<void>
}

export interface IJwtHsaSub {
  username: string
  userId: string
  role: string
}

export interface IPayloadData {
  userId: string
}
