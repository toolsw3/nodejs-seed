import { fluentProvide } from "inversify-binding-decorators";

export const provideSingleton = (identifier: symbol): any => {
    return fluentProvide(identifier).inSingletonScope().done();
};
