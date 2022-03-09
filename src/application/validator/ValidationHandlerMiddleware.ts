import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationHandlerMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    errors.isEmpty() ? next() : response.status(400).send({ errors: errors.array({ onlyFirstError: true }) });
};
