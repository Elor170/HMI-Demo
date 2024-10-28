import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;
const DB_NAME = "game";
const COLLECTION_NAME = "logs";

if (!MONGO_URI) {
  console.error("Couldn't find MONGO_URI");
  process.exit();
}

const app = express();

app.use(cors());

app.get("/logs", async (_, res) => {
  const client = await MongoClient.connect(MONGO_URI);

  const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

  const data = await collection.find<GameLog>({}).toArray();

  if (!data) {
    return res.sendStatus(404);
  }

  return res.json(data);
});

app.post("/logs", async (req, res) => {
  const newLogs: GameLog = req.body.logs;

  if (!newLogs) {
    return res.sendStatus(400);
  }

  const client = await MongoClient.connect(MONGO_URI);
  const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

  const response = await collection.insertOne(newLogs);

  if (!response.acknowledged) {
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
