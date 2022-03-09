import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, response } from "inversify-express-utils";
import { PARAMETERS } from "../config/ioc/parameters";

@controller("/")
export class HomeController extends BaseHttpController {
    @inject(PARAMETERS.env) private readonly env: string;

    @httpGet("/")
    public index(@response() response: Response): Response {
        return response.send({ message: "NodeJS Workshop " + this.env });
    }
}
