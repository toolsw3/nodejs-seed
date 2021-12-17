import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, response, request } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { IArticleRepository } from "../../repository/ArticleRepository";

@controller("/articles")
export class GetArticlesController extends BaseHttpController {
    @inject(TYPES.ArticleRepository) private readonly repository: IArticleRepository;

    @httpGet("/")
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const articles = await this.repository.findAll();

        return response.send(articles);
    }
}
