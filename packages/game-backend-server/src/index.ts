import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

interface GameLog {
  date: Date;
  fps: number;
  cubesInSpace: number;
  SpheresInSpace: number;
}

const app = express();

app.use(express.json());
app.use(cors());

const { PORT, MONGO_URI } = process.env;

const DB_NAME = "game";
const COLLECTION_NAME = "logs";

app.get("/", (_, res) => {
  return res.send("Hello, World!");
});

// Fetch all logs from database
app.get("/logs", async (_, res) => {
  const client = await new MongoClient(MONGO_URI).connect();
  const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

  const gameLogs = await collection.find<GameLog[]>({}).toArray();

  res.status(200).send(gameLogs);
  await client.close();
});

// Post logs to database
app.post("/add-log", async (req, res) => {
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

app.delete("/logs", async (req, res) => {
  const client = await new MongoClient(MONGO_URI).connect();
  const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
  await collection.deleteMany({});

  await client.close();

  return res.send("Logs cleared");
});

app.listen(PORT, () => {
  console.log("Game backend server is running on port", PORT);
});
