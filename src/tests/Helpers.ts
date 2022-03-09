import { ObjectId } from "mongodb";
import { container } from "../application/config/bootstrap";
import { TYPES } from "../application/config/ioc/types";
import { ArticleStatus } from "../domain/entity/Article";
import { CreateArticleDto } from "../domain/service/article/CreateArticleService";
import { UpdateArticleDto } from "../domain/service/article/UpdateArticleService";
import { MongoDBConnectionManager } from "../infrastructure/mongodb/MongoDBConnectionManager";

export const dropCollection = async (collection: string): Promise<void> => {
    try {
        await container.get<MongoDBConnectionManager>(TYPES.MongoDBConnectionManager).getCollection(collection).drop();
    } catch (error) {
        // do nothing
    }
};

export const closeConnection = async (): Promise<void> => {
    await container.get<MongoDBConnectionManager>(TYPES.MongoDBConnectionManager).close();
};

export const insertTestUser = async (): Promise<void> => {
    await container.get<MongoDBConnectionManager>(TYPES.MongoDBConnectionManager).getCollection("user").insertOne({
        uuid: "7f7398b6-9982-417c-a06a-2e0bc80085ca",
        username: "test",
        password: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
        role: "user",
        createdAt: 1643379954,
        updatedAt: 1643379954,
    });
};

export const article0 = {
    title: "Test Article 1",
    content: "Test content",
    tags: ["tag1", "tag2"],
    status: ArticleStatus.Published,
    createdAt: 1642173213,
    updatedAt: 1642173213,
    _id: new ObjectId("61e1931d9f02abeb2af19e47"),
    uuid: "616f3193-c66f-4ab6-bec5-72f3b863711a",
};

export const article1 = {
    title: "Test Article 2",
    content: "Test content",
    tags: ["tag1", "tag2"],
    status: ArticleStatus.Draft,
    createdAt: 1642173213,
    updatedAt: 1642173213,
    _id: new ObjectId("61e1931d9f02abeb2af19e48"),
    uuid: "616f3193-c66f-4ab6-bec5-72f3b863711b",
};

export const createArticleDto: CreateArticleDto = {
    title: "Test Article",
    content: "Test content",
    tags: ["tag1", "tag2"],
    status: ArticleStatus.Published,
};

export const updateArticleDto: UpdateArticleDto = {
    title: "Test Article Updated",
    content: "Test content updated",
    tags: ["tag1", "tag2", "tag3"],
    status: ArticleStatus.Draft,
};

export const loadTestArticles = async (): Promise<void> => {
    const collection = container.get<MongoDBConnectionManager>(TYPES.MongoDBConnectionManager).getCollection("article");
    await collection.insertMany([article0, article1]);
};
