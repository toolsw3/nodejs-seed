import { Article, ArticleStatus } from "../../entity/Article";
import { v4 as uuidv4 } from "uuid";
import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { IArticleRepository } from "../../repository/ArticleRepository";
import { provideSingleton } from "../../utils/inversify/CustomProviders";

export interface CreateArticleDto {
    title: string;
    content: string;
    status: ArticleStatus;
    tags: string[];
}

export interface ICreateArticleService {
    create(dto: CreateArticleDto): Promise<Article>;
}

@provideSingleton(TYPES.CreateArticleService)
export class CreateArticleService implements ICreateArticleService {
    constructor(@inject(TYPES.ArticleRepository) private readonly repository: IArticleRepository) {}

    public async create({ title, content, status, tags }: CreateArticleDto): Promise<Article> {
        const timestamp = (Date.now() / 1000) | 0;

        const article: Article = {
            uuid: uuidv4(),
            title,
            content,
            status,
            tags,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        await this.repository.persist(article);

        return article;
    }
}
