import { MongoDB } from "hmi-helper";
const envVars = process.env;
const { MONGO_URI: uri, WATERFALL_DB: dbName } = envVars;

let DB;

const initDB = async (): Promise<void> => {
    DB = new MongoDB(uri, dbName);
    await DB.connect();
}


export default initDB;
