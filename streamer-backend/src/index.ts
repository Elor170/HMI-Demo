import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

const app = express();

// const __dirname = new URL(".", import.meta.url).pathname;

app.get("/video/:resolution", (req, res) => {
  const { resolution } = req.params;

  const videoPath = path.resolve("public", `videos/${resolution}.mp4`);
  const fileSize = fs.statSync(videoPath).size;

  res.writeHead(200, {
    "content-length": fileSize,
    "Content-Length": fileSize,
    "Content-Type": "video/mp4",
  });

  fs.createReadStream(videoPath).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
