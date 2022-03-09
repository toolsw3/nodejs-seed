import { Application } from "express";
import supertest from "supertest";
import { container } from "../../../application/config/bootstrap";
import { TYPES } from "../../../application/config/ioc/types";
import { MongoDBConnectionManager } from "../../../infrastructure/mongodb/MongoDBConnectionManager";
import { application } from "../../app";
import { dropCollection, loadTestArticles, article0, article1 } from "../../Helpers";

describe("Get Articles", () => {
    let app: Application;
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll(async () => {
        app = await application();
        request = supertest(app);

        await loadTestArticles();
    });

    afterAll(async () => {
        await dropCollection("article");
        await container.get<MongoDBConnectionManager>(TYPES.MongoDBConnectionManager).close();
    });

    it("Success", async () => {
        const response = await request.get("/articles");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].title).toEqual(article0.title);
        expect(response.body[0].status).toEqual(article0.status);
        expect(response.body[1].title).toEqual(article1.title);
        expect(response.body[1].status).toEqual(article1.status);
    });
});
