import { Router } from 'express'
import authUserRouter from './auth.user'

const authRouter = Router()

authRouter.use('/user', authUserRouter)

export default authRouter
