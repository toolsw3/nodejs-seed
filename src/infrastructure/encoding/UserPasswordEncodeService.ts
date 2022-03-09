import { SHA256 } from "crypto-js";
import { TYPES } from "../../application/config/ioc/types";
import { IUserPasswordEncodeService } from "../../domain/service/user/UserPasswordEncodeService";
import { provideSingleton } from "../inversify/CustomProviders";

@provideSingleton(TYPES.UserPasswordEncodeService)
export class UserPasswordEncodeService implements IUserPasswordEncodeService {
    public encode(password: string): string {
        return SHA256(password).toString();
    }
}
