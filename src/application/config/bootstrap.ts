import "reflect-metadata";
import { Application, NextFunction, Request, Response } from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import express from "express";
import cors from "cors";

import "./ioc/loader";
import { loadParameters, PARAMETERS } from "./ioc/parameters";
import { buildProviderModule } from "inversify-binding-decorators";
import { MongoDBConnectionManager } from "../../infrastructure/mongodb/MongoDBConnectionManager";
import { TYPES } from "./ioc/types";
import { Exception } from "../../domain/exception/Exception";
import { AuthenticationProvider } from "../security/AuthenticationProvider";

const container: Container = new Container();

const bootstrap = async (): Promise<Application> => {
    const server = new InversifyExpressServer(container, null, null, null, AuthenticationProvider);

    server.setConfig((app) => {
        app.use(
            express.urlencoded({
                extended: true,
            })
        );
        app.use(express.json());
        app.use(
            cors({
                origin: process.env.CORS_ALLOWED_ORIGIN,
                methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "PATCH"],
            })
        );
    });

    loadParameters();

    server.setErrorConfig((app: Application) => {
        app.use((error: unknown, request: Request, response: Response, next: NextFunction) => {
            if (error instanceof Exception) {
                return response.status(error.code).send({ error: error.message });
            }

            return response.status(500).send({
                error:
                    container.get<string>(PARAMETERS.env) === "dev"
                        ? (error as Error).toString()
                        : "Internal server error",
            });
        });
    });

    // mongodb initialization
    const connectionManager = new MongoDBConnectionManager(
        container.get<string>(PARAMETERS.mongodbUrl),
        container.get<string>(PARAMETERS.mongodbDatabase)
    );
    await connectionManager.connect();
    container.bind(TYPES.MongoDBConnectionManager).toConstantValue(connectionManager);
    if (container.get(PARAMETERS.env) !== "test") {
        console.log("[MongoDBConnectionManager]: Connected");
    }

    container.load(buildProviderModule());

    return server.build();
};

export { bootstrap, container };
