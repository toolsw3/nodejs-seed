import { inject } from "inversify";
import { TYPES } from "../../../application/config/ioc/types";
import { User, UserRole } from "../../entity/User";
import { IUserPasswordEncodeService } from "./UserPasswordEncodeService";
import { IUserRepository } from "../../repository/UserRepository";
import { provideSingleton } from "../../../infrastructure/inversify/CustomProviders";
import { IUuidGenerator } from "../uuid/UuidGenerator";

export interface CreateUserDto {
    username: string;
    password: string;
}

export interface ICreateUserService {
    create(dto: CreateUserDto): Promise<User>;
}

@provideSingleton(TYPES.CreateUserService)
export class CreateUserService implements ICreateUserService {
    constructor(
        @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository,
        @inject(TYPES.UserPasswordEncodeService) private readonly userPasswordEncodeService: IUserPasswordEncodeService,
        @inject(TYPES.UuidGenerator) private readonly uuid: IUuidGenerator
    ) {}

    public async create({ username, password }: CreateUserDto): Promise<User> {
        const timestamp = (Date.now() / 1000) | 0;

        const user: User = {
            uuid: this.uuid.generate(),
            username,
            password: this.userPasswordEncodeService.encode(password),
            role: UserRole.user,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        await this.userRepository.persist(user);

        return user;
    }
}
