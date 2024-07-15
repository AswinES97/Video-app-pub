import { type Response, type Application, type Request } from 'express'
import { type expressType } from '../../../types/types'

import { profileRouter } from './profileRouter'
import { NotFoundError } from '@ticket-common/common'

const router = (app: Application, express: expressType): void => {
  app.use('/api/v1/profile', profileRouter(express))

  app.use('/*', (req: Request, res: Response) => {
    throw new NotFoundError()
  })
}

export default router
