import { emailSignup, emailVerify } from '../../user-cases/auth/user.signup'
import { type Request, type Response } from 'express'
import { type IUserSignupParmeters } from '../../types/types'
import { NotFoundError } from '@ticket-common/common'

export const userSignupController = (
  params: IUserSignupParmeters
): {
    userEmailSignup: (arg1: Request, arg2: Response) => Promise<Response>
    userEmailVerify: (arg1: Request, arg2: Response) => Promise<Response>
  } => {
  const userEmailSignup = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userData = await emailSignup(req.body, params)
    const mailToken = params.serviceCalls.generateMailToken(userData.userId)
    await params.serviceCalls.sentMail(userData.email as string, mailToken)

    return res.status(201).send({
      status: 'Success'
    })
  }

  const userEmailVerify = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const token: string = req.query?.token as string
    const userId: string = params.serviceCalls.verifyMailToken(token)?.sub as string
    const isEmailVerified = await emailVerify(userId, params)

    if (isEmailVerified) {
      return res.status(200).send({ status: 'Success' })
    }
    throw new NotFoundError('Unable to Verify Email')
  }

  return {
    userEmailSignup,
    userEmailVerify
  }
}
