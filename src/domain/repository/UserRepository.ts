import { User } from "../../domain/entity/User";

export interface IUserRepository {
    findOneByUsername(username: string): Promise<User | null>;
    findOneByUuid(uuid: string): Promise<User | null>;
    persist(article: User): Promise<void>;
}
