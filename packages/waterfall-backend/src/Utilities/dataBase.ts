import { MongoDB, waterfallFrameSize } from "hmi-helper";
import { addGrayLines } from "./dataHandler";
const envVars = process.env;
const { MONGO_URI: uri, WATERFALL_DB: dbName } = envVars;

let DB: MongoDB;

const initDB = async (): Promise<void> => {
    DB = new MongoDB(uri, dbName);
    await DB.connect();
    const data = await DB.aggregate('waterfall', [{ $limit: 1 }]);
    if (data.length > 0)
        addGrayLines();
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
            { $sort: { sendingTime: -1 } },
            { $limit: waterfallFrameSize },
            { $sort: { sendingTime: 1 } }
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
        let dataArr: WaterfallObject[] = await DB.aggregate("waterfall", [
            { $match: { sendingTime: { $gte: date } } },
            { $sort: { sendingTime: 1 } },
            { $limit: waterfallFrameSize }
        ]) as WaterfallObject[];

        if (dataArr.length < waterfallFrameSize) {
            const newestDate = new Date(dataArr[dataArr.length - 1].sendingTime);
            dataArr = await DB.aggregate("waterfall", [
                { $match: { sendingTime: { $lte:  newestDate} } },
                { $sort: { sendingTime: -1 } },
                { $limit: waterfallFrameSize },
                { $sort: { sendingTime: 1 } }
            ]) as WaterfallObject[];
        }

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

export const buildDataFrame = async (dataArr: WaterfallObject[]): Promise<WaterfallDataFrame> => {
    try {
        const newestData: WaterfallObject = await DB.aggregate("waterfall", [
            { $sort: { sendingTime: -1 } },
            { $limit: 1 }
        ]).then((data) => data[0]) as WaterfallObject;

        const newestInArr = dataArr[dataArr.length - 1];
        const date1 = new Date(newestData.sendingTime);
        const date2 = new Date(newestInArr.sendingTime);

        const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
        const diffInSeconds = diffInMilliseconds / 1000;

        const dataFrame = {
            dataArr, 
            isNewestData: diffInSeconds < 60,
            isOldestData: dataArr.length < waterfallFrameSize
        }

        return dataFrame;
    } catch (error) {
        if (!DB.getIsWhileConnecting())
            DB.reconnect();
        throw new Error('Failed to build data frame');
    }
}


export const saveMultipleMsgs = async (newDataArr: WaterfallObject[]): Promise<void> => {
    if (DB){
        try {
            await DB.insertMany("waterfall", newDataArr);
        } catch (error) {
            console.error('Failed to insert Multiple Msgs');
            
            if (!DB.getIsWhileConnecting())
                DB.reconnect();
        }
    }
}
 
export default initDB;
