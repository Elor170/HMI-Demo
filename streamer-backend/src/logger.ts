import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;

export async function addLog(newLog: StreamLogData): Promise<void> {
  try {
    const client = await new MongoClient(MONGO_URI).connect();

    await client.db("streamer").collection("logs").insertOne(newLog);

    client.close();
  } catch (e) {
    console.error(e);
  }
}

export async function getLogs(): Promise<StreamLogData[]> {
  const client = await new MongoClient(MONGO_URI).connect();

  const logs = await client
    .db("streamer")
    .collection("logs")
    .find<StreamLogData>({})
    .toArray();
  client.close();

  return logs;
}
