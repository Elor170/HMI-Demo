import { MongoDB } from "hmi-helper";
import { screenHeight } from "@/consts";
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

export const updateMsg = async (newData: WaterfallObject): Promise<void> => {
    if (DB){
        try {
            await DB.updateOne("waterfall", { sendingTime: newData.sendingTime }, newData);
        } catch (error) {
            console.error('Failed to insert update data');
            
            if (!DB.getIsWhileConnecting())
                DB.reconnect();
        }
    }
}

export const getOlderData = async (date: Date): Promise<WaterfallObject[]> => {
    try {
        const dataArr: WaterfallObject[] = await DB.aggregate("waterfall", [
            { $match: { sendingTime: { $lte: date } } },
            { $sort: { sendingTime: 1 } },
            { $limit: screenHeight * 2 }
        ]) as WaterfallObject[];

        return dataArr;
    } catch (error) {
        if (!DB.getIsWhileConnecting())
            DB.reconnect();

        throw new Error('Failed to get older data');
    }
}

export const getNewerData = async (date: Date): Promise<WaterfallObject[]> => {
    try {
        const dataArr: WaterfallObject[] = await DB.aggregate("waterfall", [
            { $match: { sendingTime: { $gte: date } } },
            { $sort: { sendingTime: 1 } },
            { $limit: screenHeight * 2 }
        ]) as WaterfallObject[];

        return dataArr;
    } catch (error) {
        if (!DB.getIsWhileConnecting())
            DB.reconnect();

        throw new Error('Failed to get newer data');
    }
}


export const countDocuments = async (): Promise<number> => {
    return await DB.countDocuments("waterfall");
}


export const getDataChunk = async (chunkSize: number, startIndex: number): Promise<WaterfallObject[]> => {
    try {
        const dataArr: WaterfallObject[] = await DB.aggregate("waterfall", [
            { $skip: startIndex },
            { $limit: chunkSize }
        ]) as WaterfallObject[];    
        return dataArr;
    } catch (error) {
        if (!DB.getIsWhileConnecting())
            DB.reconnect();
        throw new Error('Failed to get data chunk');
    }
}
 
export default initDB;
