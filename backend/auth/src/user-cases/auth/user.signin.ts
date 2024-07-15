import { BadRequestError, UnauthorizedError } from '@ticket-common/common'
import { type IUserAttr, type IUserLoginParams } from '../../types/types'

export const emailLogin = async (
  userData: IUserAttr,
  dbAndServiceCalls: IUserLoginParams
): Promise< IUserAttr> => {
  const hasUser = await dbAndServiceCalls.userDbCalls.userDetails(userData.email as string)

  if (hasUser === null) {
    throw new BadRequestError('No User Found')
  }

  if (!(hasUser?.isEmailVerified as boolean)) {
    throw new UnauthorizedError('Email not Verified')
  }

  if (hasUser.isBlocked as boolean) {
    throw new UnauthorizedError('User is blocked')
  }

  const isValidPassword = await dbAndServiceCalls.serviceCalls.comparePassword(hasUser?.password as string, userData.password as string)

  if (!isValidPassword) {
    throw new BadRequestError('Invalid Value')
  }

  return {
    username: hasUser.username,
    userId: hasUser.userId
  }
}
