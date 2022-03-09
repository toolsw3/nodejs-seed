import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { IUserAuthenticationService } from "../../security/UserAuthenticationService";

@controller("/authentication")
export class PostRefreshTokenController extends BaseHttpController {
    @inject(TYPES.UserAuthenticationService) private readonly service: IUserAuthenticationService;

    @httpPost("/refresh-token")
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const token = await this.service.refreshToken(request.body.refreshToken);

        return response.status(201).send(token);
    }
}
