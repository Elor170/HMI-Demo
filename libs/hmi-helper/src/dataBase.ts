import {
  MongoClient,
  Db,
  Document,
  InsertOneResult,
  UpdateResult,
  DeleteResult,
  Filter,
  InsertManyResult,
} from "mongodb";

export default class MongoDB {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private isWhileConnecting: boolean = false;
  private readonly dbName: string;
  private readonly uri: string;
  private readonly reconnectInterval: number;

  constructor(uri: string, dbName: string, reconnectInterval = 5000) {
    this.uri = uri;
    this.dbName = dbName;
    this.reconnectInterval = reconnectInterval;
  }

  async connect(): Promise<void> {
    this.isWhileConnecting = true;
    while (!this.client) {
      try {
        const newClient = new MongoClient(this.uri, {
          serverSelectionTimeoutMS: this.reconnectInterval,
        });
        const newDb = newClient.db(this.dbName);
        await newClient.connect();

        this.client = newClient;
        this.db = newDb;
        console.log("Connected to MongoDB");
        this.isWhileConnecting = false;
      } catch (error) {
        console.error(
          "Connection to DB failed, retrying in",
          this.reconnectInterval / 1000,
          "seconds...",
        );
      }
    }
  }

  async reconnect(): Promise<void> {
    console.log("Attempting to reconnect to MongoDB...");
    this.client = null;
    this.db = null;
    await this.connect();
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    } else {
      console.error("There no open connection to MongoDB");
    }
  }

  getIsWhileConnecting(): boolean {
    return this.isWhileConnecting;
  }

  async insertOne(
    collectionName: string,
    document: Document,
  ): Promise<InsertOneResult> {
    if (this.db)
      return await this.db.collection(collectionName).insertOne(document);
    throw new Error("There no open connection to MongoDB");
  }

  async insertMany(
    collectionName: string,
    documentsArr: Document[],
  ): Promise<InsertManyResult> {
    if (this.db)
      return await this.db.collection(collectionName).insertMany(documentsArr);
    throw new Error("There no open connection to MongoDB");
  }

  async find(
    collectionName: string,
    filter: Filter<Document> = {},
  ): Promise<Document[]> {
    if (this.db)
      return await this.db.collection(collectionName).find(filter).toArray();
    throw new Error("There no open connection to MongoDB");
  }

  async aggregate(
    collectionName: string,
    pipeline: Object[] = [],
  ): Promise<Document[]> {
    if (this.db)
      return await this.db
        .collection(collectionName)
        .aggregate(pipeline)
        .toArray();
    throw new Error("There no open connection to MongoDB");
  }

  async updateOne(
    collectionName: string,
    filter: Filter<Document>,
    update: Partial<Document>,
  ): Promise<UpdateResult> {
    if (this.db)
      return await this.db
        .collection(collectionName)
        .updateOne(filter, { $set: update });
    throw new Error("There no open connection to MongoDB");
  }

  async deleteOne(
    collectionName: string,
    filter: Filter<Document>,
  ): Promise<DeleteResult> {
    if (this.db)
      return await this.db.collection(collectionName).deleteOne(filter);
    throw new Error("There no open connection to MongoDB");
  }

  async countDocuments(collectionName: string): Promise<number> {
    if (this.db)
      return await this.db.collection(collectionName).countDocuments();
    throw new Error("There no open connection to MongoDB");
  }
}
