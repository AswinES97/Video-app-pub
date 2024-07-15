import { type NextFunction, type Request, type Response } from 'express'

import { ReqValidationError } from '@ticket-common/common'
import { body, validationResult } from 'express-validator'

const reqValidator = {
  usernameValidator: () => {
    return body('username').trim().notEmpty().isLength({ min: 5, max: 15 })
  },
  emailValidator: () => {
    return body('email').isEmail()
  },
  phoneValidator: () => {
    return body('phone').optional().isMobilePhone('en-IN')
  },
  passwordValidator: () => {
    return body('password')
      .trim()
      .notEmpty()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/)
  },
  validatorFn: (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw new ReqValidationError(errors.array())
    next()
  }
}

export default reqValidator
