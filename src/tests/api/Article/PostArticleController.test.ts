import { Application } from "express";
import supertest from "supertest";
import { container } from "../../../config/bootstrap";
import { TYPES } from "../../../config/ioc/types";
import { MongoDBConnectionManager } from "../../../utils/mongodb/MongoDBConnectionManager";
import { application } from "../../app";
import { dropCollection } from "../../Helpers";

describe("Post Article", () => {
    let app: Application;
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll(async () => {
        app = await application();
        request = supertest(app);
    });

    afterEach(async () => {
        await dropCollection("article");
    });

    afterAll(async () => {
        await container.get<MongoDBConnectionManager>(TYPES.MongoDBConnectionManager).close();
    });

    it("Success", async () => {
        const body = {
            title: "Test Article",
            content: "Test content",
            tags: ["tag1", "tag2"],
            status: "published",
        };
        const response = await request.post("/articles").set({ Authorization: "4utht0k3n" }).send(body);

        expect(response.status).toBe(201);
        expect(response.body.title).toEqual(body.title);
        expect(response.body.content).toEqual(body.content);
        expect(response.body.tags).toEqual(body.tags);
        expect(response.body.status).toEqual(body.status);
    });

    it("Error: missing title", async () => {
        const body = {
            content: "Test content",
            tags: ["tag1", "tag2"],
            status: "published",
        };
        const response = await request.post("/articles").set({ Authorization: "4utht0k3n" }).send(body);

        expect(response.status).toBe(400);
    });
});
