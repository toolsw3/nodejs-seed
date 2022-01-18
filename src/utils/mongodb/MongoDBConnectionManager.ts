import { inject } from "inversify";
import { Collection, Db, MongoClient } from "mongodb";
import { PARAMETERS } from "../../config/ioc/parameters";
import { TYPES } from "../../config/ioc/types";
import { provideSingleton } from "../inversify/CustomProviders";

export interface IMongoDBConnectionManager {
    connect(): Promise<void>;
    getCollection(name: string): Collection;
}

export class MongoDBConnectionManager implements IMongoDBConnectionManager {
    private readonly client: MongoClient;
    private readonly dbName: string;
    private db: Db;

    constructor(@inject(PARAMETERS.mongodbUrl) url: string, @inject(PARAMETERS.mongodbDatabase) dbName: string) {
        this.client = new MongoClient(url);
        this.dbName = dbName;
    }

    public async connect(): Promise<void> {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
    }

    public getCollection(name: string): Collection {
        return this.db.collection(name);
    }

    public async close(): Promise<void> {
        await this.client.close();
    }
}
