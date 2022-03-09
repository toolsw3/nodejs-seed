import "reflect-metadata";
import { ArticleRepository } from "../../../../infrastructure/repository/ArticleRepository";
import { UpdateArticleService } from "../../../../domain/service/article/UpdateArticleService";
import { IMongoDBConnectionManager } from "../../../../infrastructure/mongodb/MongoDBConnectionManager";
import { article0, updateArticleDto } from "../../../Helpers";

jest.mock("../../../../infrastructure/repository/ArticleRepository");

describe("Update Article Service", () => {
    const repository: ArticleRepository = new ArticleRepository({} as IMongoDBConnectionManager);
    const service = new UpdateArticleService(repository);

    it("Success", async () => {
        const { createdAt } = article0;
        const now = (Date.now() / 1000) | 0;
        const article = await service.update(article0, updateArticleDto);

        expect(repository.persist).toHaveBeenCalledTimes(1);
        expect(article.title).toEqual(updateArticleDto.title);
        expect(article.content).toEqual(updateArticleDto.content);
        expect(article.tags).toEqual(updateArticleDto.tags);
        expect(article.status).toEqual(updateArticleDto.status);

        expect(article.createdAt).toEqual(createdAt);
        expect(article.updatedAt).toBeGreaterThanOrEqual(now);
    });
});
