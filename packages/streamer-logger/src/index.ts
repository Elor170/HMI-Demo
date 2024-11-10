import express from "express";
import logsRouter from "./routes/logger";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/logs", logsRouter);

app.listen(80, () => {
  console.log("Listening on port 80");
});
