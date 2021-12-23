export const TYPES = {
    // repositories
    ArticleRepository: Symbol.for("ArticleRepository"),

    // services
    CreateArticleService: Symbol.for("CreateArticleService"),
    UpdateArticleService: Symbol.for("UpdateArticleService"),
    RemoveArticleService: Symbol.for("RemoveArticleService"),

    // utils
    MongoDBConnectionManager: Symbol.for("MongoDBConnectionManager"),

    // middlewares
    AuthenticationMiddleware: Symbol.for("AuthenticationMiddleware"),
};
