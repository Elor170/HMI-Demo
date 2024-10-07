import { MongoClient } from "mongodb";
import { countDocuments, getDataChunk } from "./dataBase";

const {MONGO_URI, WATERFALL_DB} = process.env;

export default async function generateLogs(): Promise<WaterfallLogs> {
    let logsObject: WaterfallLogs = {};

    // for (let i = 0; i < docsNum; i += chunkSize) {
        // const dataChunk = await getDataChunk(chunkSize, i);
        // logsObject = handleDataChunk(dataChunk, logsObject);
    // }

    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const collection = client.db(WATERFALL_DB).collection('waterfall');
    const data = await collection.find<WaterfallObject>({}).toArray();
    await client.close();
    data.forEach(doc => {
        const {sendingTime, frontendTime, sendingInterval} = doc;
        
        if(frontendTime) {
            const timeDiff = calcTimeDiff(sendingTime, frontendTime);

            if(!(sendingInterval in logsObject)) {
                logsObject[sendingInterval] = {}
            }

            if (logsObject[sendingInterval] && !(timeDiff in logsObject[sendingInterval]))
                logsObject[sendingInterval][timeDiff] = 0;
            
            if (logsObject[sendingInterval] && (logsObject[sendingInterval][timeDiff] !== undefined))
                logsObject[sendingInterval][timeDiff] = logsObject[sendingInterval][timeDiff] + 1;
        }
    });

    return logsObject;
}

const calcTimeDiff = (sendingTime: Date, frontendTime: Date): number => {
    let diff = frontendTime.getTime() - sendingTime.getTime(); // in ms
    if (diff < 100) {
        return 0;
    }
    diff =  trimLastTwoDigits(diff); // remove ms and hundredths of a second
    diff = diff / 10; // in sec
    return diff;
}


const trimLastTwoDigits = (num: number): number => {
    const numStr = num.toString(); // Convert number to string
    const trimmedStr = numStr.slice(0, -2); // Remove last 2 characters
    return parseFloat(trimmedStr); // Convert back to number
}