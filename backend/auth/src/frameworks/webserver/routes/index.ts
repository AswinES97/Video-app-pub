import { type Application } from 'express'
import { type expressType } from '../../../types/types'

import { userRouter } from './userRouter'

const router = (app: Application, express: expressType): void => {
  app.use('/v1/auth/user', userRouter(express))
}

export default router
