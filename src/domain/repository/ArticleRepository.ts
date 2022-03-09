import { Article } from "../../domain/entity/Article";

export interface IArticleRepository {
    findOneByUuid(uuid: string): Promise<Article | null>;
    findAll(): Promise<Article[]>;
    persist(article: Article): Promise<void>;
    remove(article: Article): Promise<void>;
}
