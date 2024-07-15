/* eslint-disable @typescript-eslint/no-misused-promises */
import reqValidator from '../../services/reqValidator'
import { KafkaInterface } from '../../../adapters/Interfaces/queue/kafka'
import { userSignupController } from '../../../adapters/controllers/user.signup'
import { UserSignupDbInterface } from '../../../adapters/Interfaces/repositories/userSignupDBInterface'
import { UserSignupServiceI } from '../../../adapters/Interfaces/services/user.signup'
import { type Router } from 'express'
import { type expressType } from '../../../types/types'

export const userSignupRouter = (express: expressType): Router => {
  const router = express.Router()

  const controller = userSignupController({
    userDbCalls: new UserSignupDbInterface(),
    serviceCalls: new UserSignupServiceI(),
    kafkaCalls: new KafkaInterface()
  })

  router
    .route('/email')
    .get(controller.userEmailVerify)
    .post(
      [
        reqValidator.usernameValidator(),
        reqValidator.emailValidator(),
        reqValidator.passwordValidator(),
        reqValidator.validatorFn
      ],
      controller.userEmailSignup
    )

  return router
}
