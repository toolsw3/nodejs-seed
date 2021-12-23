import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { Article } from "../../entity/Article";
import { IArticleRepository } from "../../repository/ArticleRepository";
import { provideSingleton } from "../../utils/inversify/CustomProviders";

export interface IRemoveArticleService {
    remove(article: Article): Promise<void>;
}

@provideSingleton(TYPES.RemoveArticleService)
export class RemoveArticleService implements IRemoveArticleService {
    constructor(@inject(TYPES.ArticleRepository) private readonly articleRepository: IArticleRepository) {}

    public async remove(article: Article): Promise<void> {
        await this.articleRepository.remove(article);
    }
}
