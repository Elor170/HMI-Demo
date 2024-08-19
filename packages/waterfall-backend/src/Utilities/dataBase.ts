import { MongoDB } from "hmi-helper";
const envVars = process.env;
const { MONGO_URI: uri, WATERFALL_DB: dbName } = envVars;

let DB: MongoDB;

const initDB = async (): Promise<void> => {
    DB = new MongoDB(uri, dbName);
    await DB.connect();
}

export const saveMsg = async (newData: WaterfallObject): Promise<void> => {
    if (DB){
        try {
            await DB.insertOne("waterfall", newData);
        } catch (error) {
            console.error('Failed to insert new data');
            
            if (!DB.getIsWhileConnecting())
                DB.reconnect();
        }
    }
}


export default initDB;
