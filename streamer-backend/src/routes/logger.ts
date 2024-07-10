import { Router } from "express";
import { deleteLog, getLogs, addLog } from "../mongo";

const logsRouter: Router = Router();

logsRouter.get("/", async (_, res) => {
  console.log("Sending logs to frontend");

  try {
    const logs = await getLogs();
    return res.status(200).send(logs);
  } catch (e) {
    return res.status(500).send(e);
  }
});

logsRouter.post("/add", async (req, res) => {
  try {
    console.log("Adding new data to database...");
    const data: StreamLogData = req.body;

    await addLog(data);
    return res.status(200).send("Logs added to database");
  } catch (e) {
    return res.status(500).send(e);
  }
});

logsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.time("Deleting logs");

    deleteLog(id);

    console.timeEnd("Deleting logs");
    return res.status(200).send("Logs deleted successfully");
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default logsRouter;
