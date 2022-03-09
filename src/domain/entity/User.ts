import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    uuid: string;
    username: string;
    password: string;
    role: UserRole;
    createdAt: number;
    updatedAt: number;
}

export enum UserRole {
    user = "user",
}
