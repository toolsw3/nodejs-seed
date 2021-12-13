import { container } from "../bootstrap";

export const PARAMETERS = {
    env: Symbol.for("env"),
    mongodbUrl: Symbol.for("mongodbUrl"),
    mongodbDatabase: Symbol.for("mongodbDatabase"),
};

export const loadParameters = (): void => {
    container.bind(PARAMETERS.env).toConstantValue(process.env.ENV);
    container.bind(PARAMETERS.mongodbUrl).toConstantValue(process.env.MONGODB_URL);
    container.bind(PARAMETERS.mongodbDatabase).toConstantValue(process.env.MONGODB_DATABASE);
};
