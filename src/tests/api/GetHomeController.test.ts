import { Application } from "express";
import supertest from "supertest";
import { container } from "../../application/config/bootstrap";
import { TYPES } from "../../application/config/ioc/types";
import { MongoDBConnectionManager } from "../../infrastructure/mongodb/MongoDBConnectionManager";
import { application } from "../app";

describe("Get Home", () => {
    let app: Application;
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll(async () => {
        app = await application();
        request = supertest(app);
    });

    afterAll(async () => {
        container.get<MongoDBConnectionManager>(TYPES.MongoDBConnectionManager).close();
    });

    it("Success", async () => {
        const response = await request.get("/");

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("NodeJS Workshop test");
    });
});
