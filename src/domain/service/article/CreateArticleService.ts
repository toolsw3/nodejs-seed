import { Article, ArticleStatus } from "../../entity/Article";
import { inject } from "inversify";
import { IArticleRepository } from "../../repository/ArticleRepository";
import { provideSingleton } from "../../../infrastructure/inversify/CustomProviders";
import { IUuidGenerator } from "../uuid/UuidGenerator";
import { TYPES } from "../../../application/config/ioc/types";

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
    constructor(
        @inject(TYPES.ArticleRepository) private readonly repository: IArticleRepository,
        @inject(TYPES.UuidGenerator) private readonly uuid: IUuidGenerator
    ) {}

    public async create({ title, content, status, tags }: CreateArticleDto): Promise<Article> {
        const timestamp = (Date.now() / 1000) | 0;

        const article: Article = {
            uuid: this.uuid.generate(),
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
