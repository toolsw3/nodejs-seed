import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { PARAMETERS } from "../config/ioc/parameters";
import { TYPES } from "../config/ioc/types";
import { AuthenticationException } from "../exception/AuthenticationException";
import { provideSingleton } from "../utils/inversify/CustomProviders";
import { interfaces, Principal } from "inversify-express-utils";
import { userInfo } from "os";
import { AuthorizationException } from "../exception/AuthorizationException";

export const authorizationHeader: string = "Authorization";

export const authenticate =
    (role: string) =>
    async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        if (!request.header(authorizationHeader)) {
            next(new AuthenticationException());
        }

        const principal: Principal = (
            Reflect.getMetadata("inversify-express-utils:httpcontext", request) as interfaces.HttpContext
        ).user;

        if (!(await principal.isAuthenticated())) {
            next(new AuthenticationException());
        } else if (!(await principal.isInRole(role))) {
            next(new AuthorizationException());
        } else {
            next();
        }
    };
