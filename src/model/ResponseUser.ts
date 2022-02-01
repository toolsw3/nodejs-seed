import { User, UserRole } from "../entity/User";

export class ResponseUser {
    public readonly username: string;
    public readonly uuid: string;
    public readonly role: UserRole;

    constructor({ username, uuid, role }: User) {
        this.username = username;
        this.uuid = uuid;
        this.role = role;
    }
}
