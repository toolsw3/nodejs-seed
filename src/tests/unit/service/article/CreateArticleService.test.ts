import "reflect-metadata";
import { ArticleRepository } from "../../../../repository/ArticleRepository";
import { CreateArticleService } from "../../../../service/article/CreateArticleService";
import { IMongoDBConnectionManager } from "../../../../utils/mongodb/MongoDBConnectionManager";
import { createArticleDto } from "../../../Helpers";

jest.mock("../../../../repository/ArticleRepository");

describe("Create Article Service", () => {
    const repository: ArticleRepository = new ArticleRepository({} as IMongoDBConnectionManager);
    const service = new CreateArticleService(repository);

    it("Success", async () => {
        const now = (Date.now() / 1000) | 0;
        const article = await service.create(createArticleDto);

        expect(repository.persist).toHaveBeenCalledTimes(1);
        expect(article.title).toEqual(createArticleDto.title);
        expect(article.content).toEqual(createArticleDto.content);
        expect(article.tags).toEqual(createArticleDto.tags);
        expect(article.status).toEqual(createArticleDto.status);

        expect(article.createdAt).toBeGreaterThanOrEqual(now);
        expect(article.updatedAt).toBeGreaterThanOrEqual(now);
    });
});
