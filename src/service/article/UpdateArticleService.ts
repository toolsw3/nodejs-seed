import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { Article, ArticleStatus } from "../../entity/Article";
import { IArticleRepository } from "../../repository/ArticleRepository";
import { provideSingleton } from "../../utils/inversify/CustomProviders";

export interface UpdateArticleDto {
    title: string;
    content: string;
    status: ArticleStatus;
    tags: string[];
}

export interface IUpdateArticleService {
    update(article: Article, dto: UpdateArticleDto): Promise<Article>;
}

@provideSingleton(TYPES.UpdateArticleService)
export class UpdateArticleService implements IUpdateArticleService {
    constructor(@inject(TYPES.ArticleRepository) private readonly articleRepository: IArticleRepository) {}

    public async update(article: Article, { title, content, status, tags }: UpdateArticleDto): Promise<Article> {
        article.title = title;
        article.content = content;
        article.status = status;
        article.tags = tags;
        article.updatedAt = (Date.now() / 1000) | 0;

        await this.articleRepository.persist(article);

        return article;
    }
}
