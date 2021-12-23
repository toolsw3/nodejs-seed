import { param } from "express-validator";
import { validationHandlerMiddleware } from "./ValidationHandlerMiddleware";

export const validateParamUUID = [param("uuid").isUUID(), validationHandlerMiddleware];
