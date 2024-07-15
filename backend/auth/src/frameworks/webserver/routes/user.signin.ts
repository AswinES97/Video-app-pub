/* eslint-disable @typescript-eslint/no-misused-promises */
import reqValidator from '../../services/reqValidator'
import { userLoginController } from '../../../adapters/controllers/user.signin'
import { UserLoginServiceI } from '../../../adapters/Interfaces/services/user.login'
import { UserLoginDBInterface } from '../../../adapters/Interfaces/repositories/userLoginDBInterface'
import { type Router } from 'express'
import { type expressType } from '../../../types/types'

export const userLoginRouter = (express: expressType): Router => {
  const router = express.Router()

  const controller = userLoginController({
    userDbCalls: new UserLoginDBInterface(),
    serviceCalls: new UserLoginServiceI()
  })

  router.post('/email', [
    reqValidator.emailValidator(),
    reqValidator.passwordValidator(),
    reqValidator.validatorFn
  ], controller.userEmailLogin)

  router.get('/newAccessToken', controller.newAccessToken)

  return router
}
