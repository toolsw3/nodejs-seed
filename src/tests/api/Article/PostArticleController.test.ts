import { Application } from "express";
import supertest from "supertest";
import { container } from "../../../application/config/bootstrap";
import { TYPES } from "../../../application/config/ioc/types";
import { MongoDBConnectionManager } from "../../../infrastructure/mongodb/MongoDBConnectionManager";
import { application } from "../../app";
import { closeConnection, dropCollection, insertTestUser } from "../../Helpers";

describe("Post Article", () => {
    let app: Application;
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll(async () => {
        app = await application();
        request = supertest(app);
        await insertTestUser();
    });

    afterEach(async () => {
        await dropCollection("article");
    });

    afterAll(async () => {
        await closeConnection();
    });

    it("Success", async () => {
        const loginResponse = await request.post("/authentication/token").send({
            username: "test",
            password: "test",
        });

        const body = {
            title: "Test Article",
            content: "Test content",
            tags: ["tag1", "tag2"],
            status: "published",
        };
        const response = await request.post("/articles").set({ Authorization: loginResponse.body.token }).send(body);

        expect(response.status).toBe(201);
        expect(response.body.title).toEqual(body.title);
        expect(response.body.content).toEqual(body.content);
        expect(response.body.tags).toEqual(body.tags);
        expect(response.body.status).toEqual(body.status);
    });

    it("Error: missing title", async () => {
        const loginResponse = await request.post("/authentication/token").send({
            username: "test",
            password: "test",
        });

        const body = {
            content: "Test content",
            tags: ["tag1", "tag2"],
            status: "published",
        };
        const response = await request.post("/articles").set({ Authorization: loginResponse.body.token }).send(body);

        expect(response.status).toBe(400);
    });
});
