import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { UserRole } from "../../entity/User";
import { authenticate } from "../../security/AuthenticationMiddleware";
import { CreateArticleDto, ICreateArticleService } from "../../service/article/CreateArticleService";
import { validateArticle } from "../../validator/ArticleValidatiors";

@controller("/articles")
export class PostArticleController extends BaseHttpController {
    @inject(TYPES.CreateArticleService) private readonly service: ICreateArticleService;

    @httpPost("/", authenticate(UserRole.user), ...validateArticle)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const article = await this.service.create(request.body as CreateArticleDto);

        return response.status(201).send(article);
    }
}
