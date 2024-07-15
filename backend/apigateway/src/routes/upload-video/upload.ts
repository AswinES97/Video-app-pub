/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { authentication } from '../../middlewares/authentication'
import {
  initializeVideoUploadController,
  uploadVideoComplete
} from '../../controller/video/video.upload'
import multer from 'multer'
const upload = multer()

const uploadVideoRouter = Router()

uploadVideoRouter.use(
  '/initialize',
  authentication,
  upload.none(),
  initializeVideoUploadController
)

uploadVideoRouter.use('/complete', authentication, uploadVideoComplete)

export default uploadVideoRouter

// The upload route is going to be a tricky one. It has 3 routes.
// Initialize, send-chunks, finish.
// Initialize and finish will be handled by the video service.
// Chunks will be handled by and isolated, independed deployment.
// Since send-chunks will have its own ingress and namespace, chunks will not pass throught here.
// The subdomain of the chunk will be generated random with the required k8s name policy.
// upload will we the namespace for the upload route.
// The spun up deploymnet will be deleted when completed route is called or if any error happens.
