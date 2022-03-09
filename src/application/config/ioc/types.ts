export const TYPES = {
    // repositories
    ArticleRepository: Symbol.for("ArticleRepository"),
    UserRepository: Symbol.for("UserRepository"),

    // services
    CreateArticleService: Symbol.for("CreateArticleService"),
    UpdateArticleService: Symbol.for("UpdateArticleService"),
    RemoveArticleService: Symbol.for("RemoveArticleService"),
    CreateUserService: Symbol.for("CreateUserService"),

    // security
    UserAuthenticationService: Symbol.for("UserAuthenticationService"),

    // infrastructure
    MongoDBConnectionManager: Symbol.for("MongoDBConnectionManager"),
    JwtTokenService: Symbol.for("JwtTokenService"),
    UserPasswordEncodeService: Symbol.for("UserPasswordEncodeService"),
    UuidGenerator: Symbol.for("UuidGenerator"),
};
