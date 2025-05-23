import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import https from "https";
import dotenv from "dotenv";
import pem from "pem";
dotenv.config();

const { MONGO_URI } = process.env;
const DB_NAME = "game";
const COLLECTION_NAME = "logs";

if (!MONGO_URI) {
  console.error("Couldn't find MONGO_URI");
  process.exit();
}

pem.createCertificate({ days: 365, selfSigned: true }, (err, keys) => {
  if (err) {
    console.error(err);
  }

  const app = express();
  app.use(bodyParser.json());

  app.use(
    cors({
      allowedHeaders: "*",
      origin: "*",
    }),
  );

  app.use(function (_, res, next) {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
  });

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

  app.delete("/logs", async (_, res) => {
    const client = await MongoClient.connect(MONGO_URI);
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    const response = await collection.deleteMany({});

    if (response.acknowledged) {
      return res.sendStatus(200);
    }

    return res.sendStatus(500);
  });

  app.delete("/log/:id", async (req, res) => {
    const { id } = req.params;

    const client = await MongoClient.connect(MONGO_URI);
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    const response = await collection.deleteOne({ _id: new ObjectId(id) });

    if (response.acknowledged) {
      return res.sendStatus(200);
    }

    return res.sendStatus(500);
  });

  https
    .createServer(
      {
        key: keys.clientKey,
        cert: keys.certificate,
      },
      app,
    )
    .listen(80, () => {
      console.log("Server started on port 80");
    });

  // app.listen(80, () => {
  // console.log("Server started on port 80");
  // });
});
