import { SHA256 } from "crypto-js";
import { TYPES } from "../../config/ioc/types";
import { provideSingleton } from "../../utils/inversify/CustomProviders";

export interface IUserPasswordEncodeService {
    encode(password: string): string;
}

@provideSingleton(TYPES.UserPasswordEncodeService)
export class UserPasswordEncodeService implements IUserPasswordEncodeService {
    public encode(password: string): string {
        return SHA256(password).toString();
    }
}
