import { inject } from "inversify";
import { TYPES } from "../../application/config/ioc/types";
import { User } from "../../domain/entity/User";
import { IUserRepository } from "../../domain/repository/UserRepository";
import { provideSingleton } from "../inversify/CustomProviders";
import { IMongoDBConnectionManager } from "../mongodb/MongoDBConnectionManager";
import { MongoRepository } from "../mongodb/MongoRepository";

const COLLECTION = "user";

@provideSingleton(TYPES.UserRepository)
export class UserRepository extends MongoRepository implements IUserRepository {
    constructor(@inject(TYPES.MongoDBConnectionManager) connectionManager: IMongoDBConnectionManager) {
        super();

        this.collection = connectionManager.getCollection(COLLECTION);
    }

    public async findOneByUsername(username: string): Promise<User | null> {
        return await this.findOneBy<User>({ username });
    }

    public async findOneByUuid(uuid: string): Promise<User | null> {
        return await this.findOneBy<User>({ uuid });
    }
}
