import { interfaces } from "inversify-express-utils";

export class Principal implements interfaces.Principal {
    details: { uuid: string; role: string };

    public async isAuthenticated(): Promise<boolean> {
        return this.details !== undefined && this.details.uuid !== undefined;
    }

    public async isResourceOwner(resourceId: any): Promise<boolean> {
        return true;
    }

    public async isInRole(role: string): Promise<boolean> {
        return this.details.role === role;
    }
}
