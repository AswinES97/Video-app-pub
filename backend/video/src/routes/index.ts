import { Router } from "express";
import {
  uploadComplete,
  initializerController,
} from "../controller/upload.video";

const mainRouter = Router();

mainRouter.post("/initialize", initializerController);
mainRouter.post("/complete", uploadComplete);

export default mainRouter;

// Chek apigateway for more info about the routes
