import { inject } from "inversify";
import { Collection, Sort } from "mongodb";
import { TYPES } from "../config/ioc/types";
import { Article } from "../entity/Article";
import { provideSingleton } from "../utils/inversify/CustomProviders";
import { IMongoDBConnectionManager } from "../utils/mongodb/MongoDBConnectionManager";
import { IMongoRepository, MongoRepository } from "../utils/mongodb/MongoRepository";

export interface IArticleRepository extends IMongoRepository {
    findOneByUuid(uuid: string): Promise<Article | null>;
}

const COLLECTION = "article";

@provideSingleton(TYPES.ArticleRepository)
export class ArticleRepository extends MongoRepository implements IArticleRepository {
    constructor(@inject(TYPES.MongoDBConnectionManager) connectionManager: IMongoDBConnectionManager) {
        super();

        this.collection = connectionManager.getCollection(COLLECTION);
    }

    public async findOneByUuid(uuid: string): Promise<Article | null> {
        return await this.findOneBy({ uuid });
    }
}
