import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, response, request, httpPut } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { UserRole } from "../../entity/User";
import { IArticleRepository } from "../../repository/ArticleRepository";
import { authenticate } from "../../security/AuthenticationMiddleware";
import { IUpdateArticleService, UpdateArticleDto } from "../../service/article/UpdateArticleService";
import { validateArticle } from "../../validator/ArticleValidatiors";
import { validateParamUUID } from "../../validator/ParamValidator";

@controller("/articles")
export class PutArticleController extends BaseHttpController {
    @inject(TYPES.ArticleRepository) private readonly repository: IArticleRepository;
    @inject(TYPES.UpdateArticleService) private readonly service: IUpdateArticleService;

    @httpPut("/:uuid", authenticate(UserRole.user), ...validateParamUUID, ...validateArticle)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const article = await this.repository.findOneByUuid(request.params.uuid);

        if (article === null) {
            return response.status(404).send({ error: "Article not found" });
        }

        await this.service.update(article, request.body as UpdateArticleDto);

        return response.send(article);
    }
}
