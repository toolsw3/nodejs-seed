import { body } from "express-validator";
import { ArticleStatus } from "../../domain/entity/Article";
import { validationHandlerMiddleware } from "./ValidationHandlerMiddleware";

export const validateArticle = [
    body("title").notEmpty().isLength({ min: 1, max: 256 }),
    body("content").notEmpty().isLength({ min: 1 }),
    body("tags").optional().isArray({ min: 1 }),
    body("status")
        .notEmpty()
        .custom((value) => Object.values(ArticleStatus).includes(value)),
    validationHandlerMiddleware,
];
