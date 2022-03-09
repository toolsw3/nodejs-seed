import { bootstrap } from "../application/config/bootstrap";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Application } from "express";

export const application = async (): Promise<Application> => {
    if (!fs.existsSync(path.join(__dirname, "/../../.env.test"))) {
        console.log("Error: Missing .env.test file.");
        process.exit(1);
    }

    dotenv.config({ path: path.resolve(__dirname + "/../../.env.test") });

    return await bootstrap();
};
