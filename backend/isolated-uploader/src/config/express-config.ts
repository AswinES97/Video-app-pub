import morgan from "morgan";
import { configKeys } from "./configKeys";
import { type Application } from "express";
import { expressType } from "../types/types";
import cors from "cors";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      role: string;
      username: string;
    };
  }
}

export const expressConfig = (app: Application, express: expressType): void => {
  if (configKeys.NODE_ENV !== "test ") {
    app.use(morgan("dev"));
  }
  app.use(
    cors({
      origin: ["http://localhost:4200", "http://ticketing.localdev.me:4200"],
      credentials: true,
    }),
  );
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
};
