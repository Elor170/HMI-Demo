import express from "express";
import logsRouter from "./routes/logger";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/logs", logsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
