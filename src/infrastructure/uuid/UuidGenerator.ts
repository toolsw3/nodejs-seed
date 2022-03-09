import { v4 as uuidv4 } from "uuid";
import { TYPES } from "../../application/config/ioc/types";
import { IUuidGenerator } from "../../domain/service/uuid/UuidGenerator";
import { provideSingleton } from "../inversify/CustomProviders";

@provideSingleton(TYPES.UuidGenerator)
export class UuidGenerator implements IUuidGenerator {
    public generate(): string {
        return uuidv4();
    }
}
