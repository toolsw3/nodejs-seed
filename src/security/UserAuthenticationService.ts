import { inject } from "inversify";
import { PARAMETERS } from "../config/ioc/parameters";
import { TYPES } from "../config/ioc/types";
import { User } from "../entity/User";
import { AuthenticationException } from "../exception/AuthenticationException";
import { Exception } from "../exception/Exception";
import { IUserRepository } from "../repository/UserRepository";
import { IUserPasswordEncodeService } from "../service/user/UserPasswordEncodeService";
import { provideSingleton } from "../utils/inversify/CustomProviders";
import { IJwtTokenService } from "../utils/jwt/JwtTokenService";

type TokenPayload = {
    uuid: string;
    role: string;
};

export interface CreateTokenDto {
    username: string;
    password: string;
}

export interface UserToken {
    token: string;
    refreshToken: string;
    expiresAt: number;
}

export interface IUserAuthenticationService {
    createToken(dto: CreateTokenDto): Promise<UserToken>;
    refreshToken(refreshToken: string): Promise<UserToken>;
    authenticateToken(token: string): Promise<User>;
}

@provideSingleton(TYPES.UserAuthenticationService)
export class UserAuthenticationService implements IUserAuthenticationService {
    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;
    @inject(TYPES.UserPasswordEncodeService) private readonly userPasswordEncodeService: IUserPasswordEncodeService;
    @inject(TYPES.JwtTokenService) private readonly jwttokenService: IJwtTokenService;
    @inject(PARAMETERS.tokenLifetime) private readonly tokenLifetime: number;

    public async createToken({ username, password }: CreateTokenDto): Promise<UserToken> {
        const user = await this.userRepository.findOneByUsername(username);
        if (!user) {
            throw new Exception("Invalid username", 400);
        }

        if (user.password !== this.userPasswordEncodeService.encode(password)) {
            throw new Exception("Invalid password", 400);
        }

        return this.generateToken(user);
    }

    public async refreshToken(refreshToken: string): Promise<UserToken> {
        const payload = this.jwttokenService.decodeToken<TokenPayload>(refreshToken);
        const user = await this.userRepository.findOneByUuid(payload.uuid);

        if (!user) {
            throw new Exception("Invalid refresh token", 400);
        }

        return this.generateToken(user);
    }

    private generateToken({ uuid, role }: User): UserToken {
        const expiresAt = ((Date.now() / 1000) | 0) + this.tokenLifetime;
        const payload = { uuid, role };

        return {
            token: this.jwttokenService.generateToken(payload, expiresAt),
            refreshToken: this.jwttokenService.generateToken(payload),
            expiresAt,
        };
    }

    public async authenticateToken(token: string): Promise<User> {
        const payload = this.jwttokenService.decodeToken<TokenPayload>(token);
        const user = await this.userRepository.findOneByUuid(payload.uuid);

        if (user === null) {
            throw new AuthenticationException("Invalid token");
        }

        return user;
    }
}
