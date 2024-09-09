type WaterfallDataType = 'constant' | 'random';
let dataType: WaterfallDataType = 'constant';

let counter: number = 0;
const arraysLength: number = 3840;
const GMaxVal: number = 64;
const constLength: number = 100;
const constCubeWidth: number = 100;
const randomLength: number = 1_000;

const zerosArr: readonly number[] = new Array(arraysLength).fill(0);

const constG: readonly number[] = new Array(arraysLength).fill(0).map((_, i) => {
    const middleIndex = arraysLength / 2;
    const distanceFromCenter = Math.abs(i - middleIndex);
    const distanceFromEdge = middleIndex - distanceFromCenter;
    
    return Math.floor((GMaxVal * (distanceFromEdge - (distanceFromEdge % constCubeWidth))) / middleIndex);
});


let randomLinesCounter = 10;
let randomGArr: number[] = [];
const createRandomG = (): readonly number[] => {
    // Replace the random G array every 10 lines
    if (randomLinesCounter === 10){
        randomLinesCounter = 1;
        const result: number[] = [];

        for (let i = 0; i < arraysLength; i += 10) {
            const randomValue = Math.floor(Math.random() * 65);
            const count = Math.min(10, arraysLength - i); // Ensure we don't exceed the array length
            for (let j = 0; j < count; j++) {
                result.push(randomValue);
            }
        }

        randomGArr = result;
    }
    else
        randomLinesCounter+=1
    
    return randomGArr;
}

export default function generateData(sendingInt: SendingInterval): WaterfallObject {
    let G;
    const R = zerosArr;
    const B = zerosArr;

    if (dataType === 'constant'){
        G = constG;
        if (counter === constLength){
            counter = 0;
            dataType = 'random';
        }
    }
    else {
        G = createRandomG();
        
        if (counter === randomLength){
            counter = 0;
            dataType = 'constant';
        }
    }
    
    counter++

    const generateData: WaterfallObject = { 
        data: {R, G, B}, 
        sendingTime: new Date(),
        backendTime: null,
        frontendTime: null,
        sendingInterval: sendingInt
    };
    return generateData;
}
