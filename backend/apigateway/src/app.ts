import express, { type Request, type Response } from 'express'
import { expressConfig } from './config/express-config'
import { NotFoundError, errorHandlingMiddleware } from '@ticket-common/common'
import mainRouter from './routes'

const app = express()
expressConfig(app, express)

app.use('/api/v1/', mainRouter)
app.use('/*', (req: Request, res: Response) => {
  throw new NotFoundError()
})
// custom error handling function from package manually created.
app.use(errorHandlingMiddleware)

export default app

// all error's thrown are manually created and handled by the errorhandler.
// all major validation are done in respective services.
// maybe minor validation will be done in the apigateway if i have time.
// access token is setted in the localstorage in the browser.
// refresh token is transported with session and in httpOnly and secure when in production.
