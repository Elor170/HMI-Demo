import express from "express";
import cors from "cors";
import { changeSendingInterval } from "./intervalManager";
import validateChangeInterval from "./validateChangeInterval";

const app = express();
app.use(
  cors({
    allowedHeaders: "*",
    origin: "*",
  }),
);
app.use(express.json());

app.patch("/ChangeSendingInterval", validateChangeInterval, (req, res) => {
  const { newInterval } = req.body;

  changeSendingInterval(newInterval);

  return res.status(200).send();
});

export const startServer = (port: number) => {
  app.listen(port, () => {
    console.log("Server started on port " + port);
  });
};
