import { ObjectId } from "mongodb";

export interface Article {
    _id?: ObjectId;
    uuid: string;
    title: string;
    content: string;
    status: ArticleStatus;
    tags: string[];
    createdAt: number;
    updatedAt: number;
}

export enum ArticleStatus {
    Draft = "draft",
    Published = "published",
}
