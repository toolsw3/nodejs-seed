import "reflect-metadata";
import { ArticleRepository } from "../../../../infrastructure/repository/ArticleRepository";
import { CreateArticleService } from "../../../../domain/service/article/CreateArticleService";
import { IMongoDBConnectionManager } from "../../../../infrastructure/mongodb/MongoDBConnectionManager";
import { createArticleDto } from "../../../Helpers";
import { IUuidGenerator } from "../../../../domain/service/uuid/UuidGenerator";

jest.mock("../../../../infrastructure/repository/ArticleRepository");
const uuid = "7fdbfe0d-737d-49c1-a205-59fc5fab0171";

describe("Create Article Service", () => {
    const repository: ArticleRepository = new ArticleRepository({} as IMongoDBConnectionManager);
    const uuidGenerator: IUuidGenerator = { generate: () => uuid };

    const service = new CreateArticleService(repository, uuidGenerator);

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
