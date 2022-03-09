import { inject } from "inversify";
import { TYPES } from "../../../application/config/ioc/types";
import { Article } from "../../entity/Article";
import { provideSingleton } from "../../../infrastructure/inversify/CustomProviders";
import { IArticleRepository } from "../../repository/ArticleRepository";

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
