import { BadRequestError, ConfilctError } from '@ticket-common/common'
import { kafakEntities, user } from '../../entities/user'

import { type IUserSignupParmeters, type IUserAttr, type kafkaParams } from '../../types/types'
import { type IUserDoc } from '../../frameworks/database/mongodb/model/user'

export const kafkaUseCase = async (
  params: kafkaParams
): Promise<void> => {
  await params.kafaCalls.consume(
    params.kakfaMongDbCalls,
    params.consumerKeys,
    kafakEntities
  )
}

export const emailSignup = async (
  userData: IUserAttr,
  userSignup: IUserSignupParmeters
): Promise<IUserDoc> => {
  const hasEmail = await userSignup.userDbCalls.doesEmailExist(userData.email as string)

  if (hasEmail !== null) throw new BadRequestError('Email Already Exist')

  userData.userId = userSignup.serviceCalls.generateId()
  userData.password = await userSignup.serviceCalls.hashPass(userData.password as string)

  const newUser = user(userData)
  return await userSignup.userDbCalls.emailSignup(newUser)
}

export const emailVerify = async (
  userId: string | undefined,
  userSignup: IUserSignupParmeters
): Promise<boolean> => {
  const response = await userSignup.userDbCalls.isVerified(userId as string)
  if (response?.isEmailVerified === true) throw new ConfilctError('Already Verified')

  const isUpdated = await userSignup.userDbCalls.verifiedEmail(userId as string)
  if (isUpdated === null) throw new BadRequestError('No User Exist!')

  const keys = userSignup.kafkaCalls.getKeys().emailVerified
  await userSignup.kafkaCalls.produce(isUpdated, keys)

  return true
}
