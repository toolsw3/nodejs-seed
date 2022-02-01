import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { CreateTokenDto, IUserAuthenticationService } from "../../security/UserAuthenticationService";

@controller("/authentication")
export class PostTokenController extends BaseHttpController {
    @inject(TYPES.UserAuthenticationService) private readonly service: IUserAuthenticationService;

    @httpPost("/token")
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const token = await this.service.createToken(request.body as CreateTokenDto);

        return response.status(201).send(token);
    }
}
