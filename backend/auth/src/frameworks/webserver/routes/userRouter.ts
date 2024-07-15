import { type Router } from 'express'
import { type expressType } from '../../../types/types'

import { userSignupRouter } from './user.signup'
import { userLoginRouter } from './user.signin'

export const userRouter = (express: expressType): Router => {
  const router = express.Router()

  router.use('/signup', userSignupRouter(express))
  router.use('/signin', userLoginRouter(express))

  return router
}
