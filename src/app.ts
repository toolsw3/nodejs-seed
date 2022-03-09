import { bootstrap } from "./application/config/bootstrap";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const run = async (): Promise<void> => {
    if (!fs.existsSync(path.join(__dirname, "../.env"))) {
        console.log("Error: Missing .env file.");
        process.exit(1);
    }

    console.log(`Loading configuration from .env file.`);
    dotenv.config({ path: path.resolve(__dirname + "/../.env") });

    const app = await bootstrap();

    app.listen(process.env.HTTP_PORT, () => {
        console.log("Server is running");
    });
};

run();
