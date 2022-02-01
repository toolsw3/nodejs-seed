import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { User, UserRole } from "../../entity/User";
import { IUserRepository } from "../../repository/UserRepository";
import { v4 as uuidv4 } from "uuid";
import { IUserPasswordEncodeService } from "./UserPasswordEncodeService";
import { provideSingleton } from "../../utils/inversify/CustomProviders";

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
        @inject(TYPES.UserPasswordEncodeService) private readonly userPasswordEncodeService: IUserPasswordEncodeService
    ) {}

    public async create({ username, password }: CreateUserDto): Promise<User> {
        const timestamp = (Date.now() / 1000) | 0;

        const user: User = {
            uuid: uuidv4(),
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
