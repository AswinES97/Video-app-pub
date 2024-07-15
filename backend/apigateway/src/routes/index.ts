import { Router } from 'express'
import authRouter from './auth/auth'
import profileRouter from './profile/profile'
import uploadVideoRouter from './upload-video/upload'

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/profile', profileRouter)
mainRouter.use('/upload-video', uploadVideoRouter)

export default mainRouter
