export const TYPES = {
    // repositories
    ArticleRepository: Symbol.for("ArticleRepository"),
    UserRepository: Symbol.for("UserRepository"),

    // services
    CreateArticleService: Symbol.for("CreateArticleService"),
    UpdateArticleService: Symbol.for("UpdateArticleService"),
    RemoveArticleService: Symbol.for("RemoveArticleService"),
    CreateUserService: Symbol.for("CreateUserService"),
    UserPasswordEncodeService: Symbol.for("UserPasswordEncodeService"),

    // security
    UserAuthenticationService: Symbol.for("UserAuthenticationService"),

    // utils
    MongoDBConnectionManager: Symbol.for("MongoDBConnectionManager"),
    JwtTokenService: Symbol.for("JwtTokenService"),
};
