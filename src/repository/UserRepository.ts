import { inject } from "inversify";
import { TYPES } from "../config/ioc/types";
import { User } from "../entity/User";
import { provideSingleton } from "../utils/inversify/CustomProviders";
import { IMongoDBConnectionManager } from "../utils/mongodb/MongoDBConnectionManager";
import { IMongoRepository, MongoRepository } from "../utils/mongodb/MongoRepository";

export interface IUserRepository extends IMongoRepository {
    findOneByUsername(username: string): Promise<User | null>;
    findOneByUuid(uuid: string): Promise<User | null>;
}

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
