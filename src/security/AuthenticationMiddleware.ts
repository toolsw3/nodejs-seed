import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { PARAMETERS } from "../config/ioc/parameters";
import { TYPES } from "../config/ioc/types";
import { AuthenticationException } from "../exception/AuthenticationException";
import { provideSingleton } from "../utils/inversify/CustomProviders";

const authorizationHeader: string = "Authorization";

@provideSingleton(TYPES.AuthenticationMiddleware)
export class AuthenticationMiddleware extends BaseMiddleware {
    private readonly authToken: string;

    handler(request: Request, response: Response, next: NextFunction): void {
        if (!request.header(authorizationHeader)) {
            next(new AuthenticationException());
        }

        if (request.header(authorizationHeader) !== this.authToken) {
            next(new AuthenticationException("Invalid token"));
        }

        next();
    }
}
