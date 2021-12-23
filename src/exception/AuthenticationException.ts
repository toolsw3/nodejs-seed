import { Exception } from "./Exception";

export class AuthenticationException extends Exception {
    constructor(message: string = "Authentication required") {
        super(message, 401);
    }
}
