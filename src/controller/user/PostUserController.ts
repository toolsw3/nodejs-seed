import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { ResponseUser } from "../../model/ResponseUser";
import { CreateUserDto, ICreateUserService } from "../../service/user/CreateUserService";

@controller("/users")
export class PostUserController extends BaseHttpController {
    @inject(TYPES.CreateUserService) private readonly service: ICreateUserService;

    @httpPost("/")
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const user = await this.service.create(request.body as CreateUserDto);

        return response.status(201).send(new ResponseUser(user));
    }
}
