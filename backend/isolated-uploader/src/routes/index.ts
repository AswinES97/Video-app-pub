import { Router } from "express";
import { uploadVidoController } from "../controller/upload.video";
import multer from "multer";
// import { authentication } from "../middlewares/authenticate";
const upload = multer();

const mainRouter = Router();

mainRouter.post("/upload", upload.single("chunk"), uploadVidoController);

export default mainRouter;
