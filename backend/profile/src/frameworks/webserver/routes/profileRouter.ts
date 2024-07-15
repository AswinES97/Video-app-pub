import { type Router } from 'express'
import { type expressType } from '../../../types/types'

import { userProfileRouter } from './userRouter'

export const profileRouter = (express: expressType): Router => {
  const router = express.Router()
  router.use('/user', userProfileRouter(express))

  return router
}
