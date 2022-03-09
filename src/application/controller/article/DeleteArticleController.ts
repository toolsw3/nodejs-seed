import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, response, request, httpDelete } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { UserRole } from "../../../domain/entity/User";
import { authenticate } from "../../security/AuthenticationMiddleware";
import { IRemoveArticleService } from "../../../domain/service/article/RemoveArticleService";
import { validateParamUUID } from "../../validator/ParamValidator";
import { IArticleRepository } from "../../../domain/repository/ArticleRepository";

@controller("/articles")
export class DeleteArticleController extends BaseHttpController {
    @inject(TYPES.ArticleRepository) private readonly repository: IArticleRepository;
    @inject(TYPES.RemoveArticleService) private readonly service: IRemoveArticleService;

    @httpDelete("/:uuid", authenticate(UserRole.user), ...validateParamUUID)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const article = await this.repository.findOneByUuid(request.params.uuid);

        if (article === null) {
            return response.status(404).send({ error: "Article not found" });
        }

        await this.service.remove(article);

        return response.status(204).send();
    }
}
