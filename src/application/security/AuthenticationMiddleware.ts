import { Request, Response, NextFunction } from "express";
import { AuthenticationException } from "./AuthenticationException";
import { interfaces, Principal } from "inversify-express-utils";
import { AuthorizationException } from "./AuthorizationException";

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
