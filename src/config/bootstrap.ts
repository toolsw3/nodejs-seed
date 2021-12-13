import "reflect-metadata";
import { Application } from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import express from "express";
import cors from "cors";

import "./ioc/loader";
import { loadParameters } from "./ioc/parameters";

const container: Container = new Container();

const bootstrap = (): Application => {
    const server = new InversifyExpressServer(container);

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

    return server.build();
};

export { bootstrap, container };
