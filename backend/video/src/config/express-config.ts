import morgan from "morgan";
import { configKeys } from "./configKeys";
import { type Application } from "express";
import { expressType } from "../types/types";

export const expressConfig = (app: Application, express: expressType): void => {
  if (configKeys.NODE_ENV !== "test ") {
    app.use(morgan("dev"));
  }
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
};
