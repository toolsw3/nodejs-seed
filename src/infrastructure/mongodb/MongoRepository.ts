import { injectable } from "inversify";
import { Collection, ObjectId, FindCursor, Sort, Filter } from "mongodb";

export interface IDocument {
    _id?: ObjectId;
}

export type MongoFilter = { [key: string]: unknown };

export interface IMongoRepository {
    find<T extends IDocument>(id: string): Promise<T | null>;
    findOneBy<T extends IDocument>(filter: MongoFilter): Promise<T | null>;
    findBy<T extends IDocument>(
        filter: MongoFilter,
        sort?: Sort | null,
        offset?: number | null,
        limit?: number | null
    ): Promise<T[]>;
    findAll<T extends IDocument>(sort?: Sort | null, offset?: number | null, limit?: number | null): Promise<T[]>;
    persist<T extends IDocument>(document: T): Promise<void>;
    remove<T extends IDocument>(document: T): Promise<void>;
}

@injectable()
export class MongoRepository implements IMongoRepository {
    protected collection: Collection;

    public async find<T extends IDocument>(id: string): Promise<T | null> {
        return await this.collection.findOne<T>({ _id: new ObjectId(id) });
    }

    public async findOneBy<T extends IDocument>(filter: MongoFilter): Promise<T | null> {
        return await this.collection.findOne<T>(filter);
    }

    public async findBy<T extends IDocument>(
        filter: MongoFilter,
        sort?: Sort | null,
        offset?: number | null,
        limit?: number | null
    ): Promise<T[]> {
        const cursor: FindCursor = this.collection.find(filter);

        sort ? cursor.sort(sort) : null;
        offset ? cursor.skip(offset) : null;
        limit ? cursor.limit(limit) : null;

        return (await cursor.toArray()) as T[];
    }

    public async findAll<T extends IDocument>(
        sort?: Sort | null,
        offset?: number | null,
        limit?: number | null
    ): Promise<T[]> {
        return await this.findBy({}, sort, offset, limit);
    }

    public async persist<T extends IDocument>(document: T): Promise<void> {
        document._id
            ? await this.collection.replaceOne({ _id: document._id }, document, { upsert: true })
            : await this.collection.insertOne(document);
    }

    public async remove<T extends IDocument>(document: T): Promise<void> {
        await this.collection.deleteOne({ _id: document._id });
    }
}
