import { inject } from "inversify";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { PARAMETERS } from "../../application/config/ioc/parameters";
import { TYPES } from "../../application/config/ioc/types";
import { Exception } from "../../domain/exception/Exception";
import { provideSingleton } from "../inversify/CustomProviders";

export type Payload = { [key: string]: unknown };

export interface IJwtTokenService {
    generateToken(payload: Payload, expiresIn?: number): string;
    decodeToken<T extends Payload>(token: string): T;
}

@provideSingleton(TYPES.JwtTokenService)
export class JwtTokenService implements IJwtTokenService {
    @inject(PARAMETERS.secret) private readonly secret: string;

    generateToken(payload: Payload, expiresIn?: number): string {
        const options = expiresIn ? { expiresIn } : {};
        return jwt.sign(payload, this.secret, options);
    }

    decodeToken<T extends Payload>(token: string): T {
        try {
            return jwt.verify(token, this.secret) as T;
        } catch (e: unknown) {
            if (e instanceof TokenExpiredError) {
                throw new Exception("Token expired", 400);
            }
            throw new Exception("Invalid token", 400);
        }
    }
}
