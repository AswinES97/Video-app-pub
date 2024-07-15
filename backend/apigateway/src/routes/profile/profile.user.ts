/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getUserProfileController, updateUsernameController } from '../../controller/profile/profile.controller'

const profileUserRouter = Router()

profileUserRouter.get('/', getUserProfileController)
profileUserRouter.patch('/username', updateUsernameController)

export default profileUserRouter
