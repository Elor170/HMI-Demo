import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { URL } from "url";
dotenv.config();

const { PORT } = process.env;

const app = express();

const __dirname = new URL(".", import.meta.url).pathname;

const CHUNK_SIZE = 10 ** 6; // 1MB

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("Requires range header");
  }

  const videoPath = path.resolve(__dirname, "../public/video.mp4");
  const videoSize = fs.statSync(videoPath).size;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-RAnges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
