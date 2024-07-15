/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { userSignupController } from '../../controller/user/user.signup'
import { userEmailVerifyController } from '../../controller/user/user.email-verify'
import { userSigninEmailController } from '../../controller/user/user.signin'
import { newAccessTokenController } from '../../controller/token/user.newAccessToken'

const authUserRouter = Router()

authUserRouter.post('/signup/email', userSignupController)
authUserRouter.get('/signup/email/:token', userEmailVerifyController)

authUserRouter.post('/signin/email', userSigninEmailController)
// for generating new access token wehn it expires in 15mints
authUserRouter.get('/newAccessToken', newAccessTokenController)

export default authUserRouter
