import { Exception } from "./Exception";

export class AuthorizationException extends Exception {
    constructor(message: string = "User is not authorized") {
        super(message, 403);
    }
}
