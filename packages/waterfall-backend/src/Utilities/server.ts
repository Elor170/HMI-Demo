import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  return res.send("Hello, World!");
});

export const startServer = (port: number) => {
  app.listen(port, () => {
    console.log("Server started on port " + port);
  });
};

export default app;