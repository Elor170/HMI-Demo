import express, { Express } from "express";
import cors from "cors";
import http from 'http';

const app: Express = express();
const httpServer = http.createServer(app);
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  return res.send("Hello, World!");
});

export const startServer = (port: number): Promise<void> => {
  return new Promise<void>((resolve, _) => {
    httpServer.listen(port, () => {
      console.log("Server started on port " + port);
      resolve();
    });
  })
};

export { httpServer };
export default app;