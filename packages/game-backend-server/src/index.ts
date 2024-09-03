import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

interface GameLog {
  date: Date;
  fps: number;
  cubesInSpace: number;
  SpheresInSpace: number;
}

const app = express();

const { PORT, MONGO_URI } = process.env;

const DB_NAME = "game";
const COLLECTION_NAME = "logs";

app.get("/", (_, res) => {
  return res.send("Hello, World!");
});

// Fetch all logs from database
app.get("/logs", async (_, res) => {
  const client = new MongoClient(MONGO_URI!);
  try {
    await client.connect();
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

    res.status(200).send(collection.find<GameLog[]>({}).toArray());
  } catch {
    res.status(500).send(res.errored);
  } finally {
    await client.close();
  }
});

// Post logs to database
app.post("/logs", async (req, res) => {
  const gameLog: GameLog = req.body;

  const client = new MongoClient(MONGO_URI!);

  try {
    await client.connect();
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

    await collection.insertOne(gameLog);
    res.status(200).send("Data inserted to database");
  } catch {
    res.status(500).send(res.errored);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log("Game backend server is running on port", PORT);
});
