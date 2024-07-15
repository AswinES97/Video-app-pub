import morgan from 'morgan'
import 'express-async-errors'
import type { Application } from 'express'
import type { expressType } from '../../types/types'
import configKeys from '../../config/config'

const serverConfig = (
  app: Application,
  express: expressType
): void => {
  // app.set('trust-proxy', 1)
  // logging
  if (configKeys.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}

export { serverConfig }
