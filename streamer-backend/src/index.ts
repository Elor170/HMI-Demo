import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { addLog, getLogs } from "./logger";
dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json());

// const __dirname = new URL(".", import.meta.url).pathname;

app.get("/video/:resolution", (req, res) => {
  const { resolution } = req.params;
  const videoPath = path.resolve("public", `videos/${resolution}.mp4`);
  const fileSize = fs.statSync(videoPath).size;

  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });

    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.get("/logs", async (_, res) => {
  console.log("Sending logs to frontend");

  try {
    const logs = await getLogs();
    return res.status(200).send(logs);
  } catch (e) {
    return res.status(500).send(e);
  }
});

app.post("/logs/add", async (req, res) => {
  console.time("added new logs to the database");
  const data: StreamLogData = req.body;

  await addLog(data);
  console.timeEnd("added new logs to the database");

  return res.status(200).send("Logs added to database");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
