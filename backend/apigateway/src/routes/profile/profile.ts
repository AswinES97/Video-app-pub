import { Router } from 'express'
import profileUserRouter from './profile.user'
import { authentication } from '../../middlewares/authentication'

const profileRouter = Router()

profileRouter.use('/user', authentication, profileUserRouter)

export default profileRouter
