import express, { Express } from "express";
import cors from "cors";
import http from 'http';
import { getOlderData, getNewerData } from "@/Utilities/dataBase";

const app: Express = express();
const httpServer: any = http.createServer(app);
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  return res.send("Hello, World!");
});

app.get("/older-waterfall-data", async (req, res) => {
  const time: Date = req.query.time as unknown as Date;
  
  try {
    const dataArr = await getOlderData(new Date(time)); 
    return res.send(dataArr);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/newer-waterfall-data", async(req, res) => {
  const time: Date = req.query.time as unknown as Date;
  
  try {
    const dataArr = await getNewerData(new Date(time)); 
    return res.send(dataArr);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
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