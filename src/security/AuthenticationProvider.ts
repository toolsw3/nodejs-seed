import { Request, Response, NextFunction } from "express";
import { interfaces } from "inversify-express-utils";
import { Principal } from "./Principal";
import { authorizationHeader } from "./AuthenticationMiddleware";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc/types";
import { IUserAuthenticationService } from "./UserAuthenticationService";

@injectable()
export class AuthenticationProvider implements interfaces.AuthProvider {
    @inject(TYPES.UserAuthenticationService) private readonly service: IUserAuthenticationService;

    public async getUser(request: Request, response: Response, next: NextFunction): Promise<interfaces.Principal> {
        const principal = new Principal();

        try {
            if (request.header(authorizationHeader)) {
                const { uuid, role } = await this.service.authenticateToken(
                    request.header(authorizationHeader) as string
                );
                principal.details = {
                    uuid,
                    role,
                };
            }
        } catch (error: unknown) {
            next(error);
        }

        return principal;
    }
}
