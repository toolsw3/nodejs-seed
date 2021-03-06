import "reflect-metadata";
import { ArticleRepository } from "../../../repository/ArticleRepository";
import { IMongoDBConnectionManager, MongoDBConnectionManager } from "../../../utils/mongodb/MongoDBConnectionManager";
import { article0 } from "../../Helpers";

jest.mock("../../../utils/mongodb/MongoDBConnectionManager", () => ({
    MongoDBConnectionManager: jest.fn().mockImplementation(() => ({
        getCollection: () => {
            findOne: () => article0;
        },
    })),
}));

describe("Create Article Service", () => {
    const connectionManager: IMongoDBConnectionManager = new MongoDBConnectionManager("", "");
    const repository: ArticleRepository = new ArticleRepository(connectionManager);

    it("Find One Article By UUID", async () => {
        const article = await repository.findOneByUuid("");

        expect(article?.title).toEqual(article0.title);
    });
});
