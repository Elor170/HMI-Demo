import express, { Request, Response, Express } from "express";
import { validateChangeInterval } from "hmi-helper";
import cors from "cors";
import { changeSendingInterval } from "./intervalManager";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.patch(
  "/ChangeSendingInterval",
  validateChangeInterval,
  (req: Request, res: Response) => {
    const { newInterval } = req.body;

    changeSendingInterval(newInterval);

    return res.status(200).send();
  }
);

export const startServer = (port: number) => {
  app.listen(port, () => {
    console.log("Server started on port " + port);
  });
};
