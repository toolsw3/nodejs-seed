import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { CreateArticleDto, ICreateArticleService } from "../../service/article/CreateArticleService";

@controller("/articles")
export class PostArticleController extends BaseHttpController {
    @inject(TYPES.CreateArticleService) private readonly service: ICreateArticleService;

    @httpPost("/")
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const article = await this.service.create(request.body as CreateArticleDto);

        return response.status(201).send(article);
    }
}
