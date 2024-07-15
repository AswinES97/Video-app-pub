import morgan from 'morgan'
import 'express-async-errors'
import type { Application } from 'express'
import type { IJwtHsaSub, expressType } from '../../types/types'
import configKeys from '../../config/config'
declare module 'jsonwebtoken' {
  export interface JwtPayload {
    data: IJwtHsaSub
  }
}

const serverConfig = (
  app: Application,
  express: expressType
): void => {
  // logging
  if (configKeys.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}

export { serverConfig }
