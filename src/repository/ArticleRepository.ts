import { inject } from "inversify";
import { Collection } from "mongodb";
import { TYPES } from "../config/ioc/types";
import { Article } from "../entity/Article";
import { provideSingleton } from "../utils/inversify/CustomProviders";
import { IMongoDBConnectionManager } from "../utils/mongodb/MongoDBConnectionManager";

export interface IArticleRepository {
    persist(article: Article): Promise<void>;
    find(uuid: string): Promise<Article | null>;
    findAll(offset?: number, limit?: number): Promise<Article[]>;
}

const COLLECTION = "article";

@provideSingleton(TYPES.ArticleRepository)
export class ArticleRepository implements IArticleRepository {
    private readonly collection: Collection;

    constructor(@inject(TYPES.MongoDBConnectionManager) connectionManager: IMongoDBConnectionManager) {
        this.collection = connectionManager.getCollection(COLLECTION);
    }

    public async persist(article: Article): Promise<void> {
        article._id
            ? await this.collection.replaceOne({ _id: article._id }, article, { upsert: true })
            : await this.collection.insertOne(article);
    }

    public async find(uuid: string): Promise<Article | null> {
        return await this.collection.findOne<Article>({ uuid });
    }

    public async findAll(offset: number = 0, limit: number = 20): Promise<Article[]> {
        const cursor = this.collection.find({}).skip(offset).limit(limit);

        return (await cursor.toArray()) as Article[];
    }
}
