import { inject } from "inversify";
import { TYPES } from "../../application/config/ioc/types";
import { Article } from "../../domain/entity/Article";
import { IArticleRepository } from "../../domain/repository/ArticleRepository";
import { provideSingleton } from "../inversify/CustomProviders";
import { IMongoDBConnectionManager } from "../mongodb/MongoDBConnectionManager";
import { MongoRepository } from "../mongodb/MongoRepository";

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
