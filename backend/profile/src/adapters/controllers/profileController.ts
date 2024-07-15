import { type Request, type Response } from 'express'
import { type IProfileControllerParams } from '../../types/types'
import { getUserInfo, usernameUpdate } from '../../application/user-cases/user'
import { BadRequestError } from '@ticket-common/common'

export const userProfileController = (
  params: IProfileControllerParams
): {
    getUserProfileData: (agr1: Request, arg2: Response) => Promise<Response>
    updateUsername: (agr1: Request, arg2: Response) => Promise<Response>
  } => {
  const getUserProfileData = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    console.log('here in get user')
    if (req.params.userId === undefined) {
      throw new BadRequestError('UserId not found')
    }
    const userData = await getUserInfo(req.params.userId, params.userDbCalls)
    return res.status(200).send(JSON.parse(JSON.stringify(userData)))
  }

  const updateUsername = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (req.params.userId === undefined) {
      throw new BadRequestError('UserId not found')
    }
    await usernameUpdate(
      req.params.userId,
      req.body.username,
      params.userDbCalls
    )
    return res.status(204).send({ status: 'username updated' })
  }

  return {
    getUserProfileData,
    updateUsername
  }
}
