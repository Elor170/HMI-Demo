import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
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
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("public"));

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
  console.dir(req.body);
  const newLogs: GameLog = req.body;

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

app.listen(80, () => {
  console.log("Server started on port 80");
});
