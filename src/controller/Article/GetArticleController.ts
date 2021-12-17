import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, response, request } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { IArticleRepository } from "../../repository/ArticleRepository";

@controller("/articles")
export class GetArticleController extends BaseHttpController {
    @inject(TYPES.ArticleRepository) private readonly repository: IArticleRepository;

    @httpGet("/:uuid")
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const article = await this.repository.find(request.params.uuid);

        if (article === null) {
            return response.status(404).send({ error: "Article not found" });
        }

        return response.send(article);
    }
}
