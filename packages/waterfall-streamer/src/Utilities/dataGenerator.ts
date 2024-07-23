type WaterfallDataType = 'constant' | 'random';
let dataType: WaterfallDataType = 'constant';

let counter: number = 0;
const arraysLength: number = 4096;
const GMaxVal: number = 64;
const constLength: number = 100;
const randomLength: number = 1_000;

const zerosArr: readonly number[] = new Array(arraysLength).fill(0);

const constG: readonly number[] = new Array(arraysLength).fill(0).map((_, i) => {
    const middleIndex = arraysLength / 2;
    const distanceFromCenter = Math.abs(i - middleIndex);
    return Math.floor((GMaxVal * (middleIndex - distanceFromCenter)) / middleIndex);
});
const createRandomG = (): readonly number[] =>
    Array.from({ length: arraysLength }, () => Math.floor(Math.random() * 65));

export default function generateData(): RGBObject {
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
            dataType = 'random';
        }
    }
    
    counter++
    return { R, G, B };
}