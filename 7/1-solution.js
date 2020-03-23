// const _ = require('lodash');

// const intersect = function (arr1, arr2) {
//     var intersect = [];
//     _.each(arr1, function (a) {
//         _.each(arr2, function (b) {
//             if (compare(a, b))
//                 intersect.push(a);
//         });
//     });

//     return intersect;
// };

// const compare = function (a, b) {
//     if (a[0] === b[0] && a[1] === b[1]) 
//         return true;
//     else return false;
// }

const input=[3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,126,207,288,369,450,99999,3,9,102,4,9,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,1002,9,3,9,101,3,9,9,4,9,99,3,9,102,5,9,9,1001,9,2,9,102,2,9,9,101,3,9,9,1002,9,2,9,4,9,99,3,9,101,5,9,9,102,5,9,9,1001,9,2,9,102,3,9,9,1001,9,3,9,4,9,99,3,9,101,2,9,9,1002,9,5,9,1001,9,5,9,1002,9,4,9,101,5,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99];

// Max thruster signal 43210 (from phase setting sequence 4,3,2,1,0):
const testInput=[3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];

/*
 *

 Disassembly:
 3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0
 STO [15], inp
 STO [16], inp


 */

// Max thruster signal 54321 (from phase setting sequence 0,1,2,3,4):
// const testInput=[3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];

// Max thruster signal 65210 (from phase setting sequence 1,0,4,3,2):
// const testInput=[3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];

let i = 0;
let n = 0;

const getParam = function (inputCode, mode, position) {

    // inputArray[inputArray[i+3]]=inputArray[inputArray[i+1]]+inputArray[inputArray[i+2]];

    let returnValue;

    switch(mode) {
        case 0:
            returnValue = inputCode[Number(inputCode[position])];
            // console.log('Returning inputCode[inputCode[position]] as %d - the value of inputCode[%d] (inputCode[10] Should be %d)', returnValue, inputCode[position], inputCode[10]);
            break;
        case 1:
            returnValue = inputCode[position];
            break;
        default:
            console.log('Unexpected parameter mode %d at position %d', mode, position);
            returnValue = false;
            break;
    }

    return returnValue;
};

const leftPad = (value) => {
    return ('00000' + value.toString(10)).slice(-5);
};

const decodeNext = instruction => {

    let a=0;
    let b=0;
    let c=0;
    let de=0;

    [a, b, c, ...de] = leftPad(instruction).split('');

    let decodedOpcode = {
        opcode: Number(de.join('')),
        param1mode: Number(c),
        param2mode: Number(b),
        param3mode: Number(a)
    };

    console.log('Decoded %d to %O', instruction, decodedOpcode);

    return decodedOpcode;
}

const runCode = (inputArray, inputData) => {

    let lastOutput = 0;
    let inputValueCounter = 0;

    for (i=0; i<inputArray.length; i) {
        console.log('Executing %d at %d', inputArray[i], i);
        let decodedInstruction = decodeNext(inputArray[i]);

        let param1 = undefined;
        let param2 = undefined;

        switch (decodedInstruction.opcode) {
            case 1:
                // console.log('Add %d (at %d) to %d (at %d), store to position %d', inputArray[inputArray[i+1]], inputArray[i+1], inputArray[inputArray[i+2]], inputArray[i+2], inputArray[i+3])
                // inputArray[inputArray[i+3]]=inputArray[inputArray[i+1]]+inputArray[inputArray[i+2]];
                
                param1 = getParam(inputArray, decodedInstruction.param1mode, i+1);
                param2 = getParam(inputArray, decodedInstruction.param2mode, i+2);

                if (decodedInstruction.param3mode === 1) {
                    console.log('Unexpected immediate mode write parameter at %d', i)
                }

                inputArray[inputArray[i+3]] = Number(param1) + Number(param2);

                console.log('O1: Stored %d (%d + %d) at %d', inputArray[inputArray[i+3]], param1, param2, inputArray[i+3]);

                i += 4;

                break;
            case 2:
                // console.log('Multiply %d (at %d) with %d (at %d), store to position %d', inputArray[inputArray[i+1]], inputArray[i+1], inputArray[inputArray[i+2]], inputArray[i+2], inputArray[i+3])
                // inputArray[inputArray[i+3]]=inputArray[inputArray[i+1]]*inputArray[inputArray[i+2]];

                param1 = getParam(inputArray, decodedInstruction.param1mode, i+1);
                param2 = getParam(inputArray, decodedInstruction.param2mode, i+2);

                if (decodedInstruction.param3mode === 1) {
                    console.log('Unexpected immediate mode write parameter at %d', i)
                }

                inputArray[inputArray[i+3]] = param1 * param2;

                console.log('O2: Stored %d (%d * %d) at %d', inputArray[inputArray[i+3]], param1, param2, inputArray[i+3]);

                i += 4;

                break;
            case 3:
                //Read from input
console.dir({inputData, inputValueCounter, storedValue: inputData[inputValueCounter]});
                inputArray[inputArray[i+1]] = inputData[inputValueCounter];
                ++inputValueCounter;

                console.log('O3: Stored %d at %d', inputArray[inputArray[i+1]], inputArray[i+1]);

                i += 2;
                break;
            case 4:
                //write to stdout
                param1 = getParam(inputArray, decodedInstruction.param1mode, i+1);

                console.log('O4: > %d', param1);
                lastOutput = Number(param1);

                i += 2;
                break;
            case 5:
                // Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
                param1 = getParam(inputArray, decodedInstruction.param1mode, i+1);
                param2 = getParam(inputArray, decodedInstruction.param2mode, i+2);

                if (param1 !== 0) {
                    i = param2;
                } else {
                    i += 3;
                }

                console.log('O5: JNZ (1: %d, 2: %d) - PC now %d', param1, param2, i);

                break;
            case 6:
                // Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
                param1 = getParam(inputArray, decodedInstruction.param1mode, i+1);
                param2 = getParam(inputArray, decodedInstruction.param2mode, i+2);

                if (param1 === 0) {
                    i = param2;
                } else {
                    i += 3;
                }

                console.log('O6: JZ (1: %d, 2: %d) - PC now %d', param1, param2, i);

                break;
            case 7:
                // Opcode 7 is less than: if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
                param1 = getParam(inputArray, decodedInstruction.param1mode, i+1);
                param2 = getParam(inputArray, decodedInstruction.param2mode, i+2);

                if (decodedInstruction.param3mode === 1) {
                    console.log('Unexpected immediate mode write parameter at %d', i)
                }

                inputArray[inputArray[i+3]] = Number(Boolean(param1 < param2));

                console.log('O7: STOLT (%d < %d ?) - Store %d at %d', param1, param2, inputArray[inputArray[i+3]], inputArray[i+3]);

                i += 4;
                break;
            case 8:
                // Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
                param1 = getParam(inputArray, decodedInstruction.param1mode, i+1);
                param2 = getParam(inputArray, decodedInstruction.param2mode, i+2);

                if (decodedInstruction.param3mode === 1) {
                    console.log('Unexpected immediate mode write parameter at %d', i)
                }

                inputArray[inputArray[i+3]] = Number(Boolean(param1 === param2));

                console.log('O8: STOEQ (%d === %d ?) - Store %d at %d', param1, param2, inputArray[inputArray[i+3]], inputArray[i+3]);

                i += 4;
                break;
            case 99:
                console.log('Completed\n%O', inputArray);
                return lastOutput;
                break;
            default:
                throw new Error('Unknown opcode:' + inputArray[i]);
                break;
        }
    }
}

//For each Input ABCDE:
    // Try each of the input settings 01234
        // Try each of the outputs from the previous stage's input settings

// 00000-44444
// > (5).toString(5)
// '10'
// > (6).toString(5)
// '11'
// > (9).toString(5)
// '14'
// > (3124).toString(5)
// '44444'

var highestOutput = { phaseSettings: 0, output: 0 };
var nextInput = 0;
var firstPhase = 0;
var maxPhase = 3124;

if (process.argv[3]) {
    firstPhase = parseInt(Number(process.argv[3]),5);
    maxPhase = firstPhase;
} else {
    inputCode = input;
}

for (n=firstPhase;n<=maxPhase;n++) {

    if (process.argv[2]==='test') {
        inputCode = testInput;
    } else {
        inputCode = input;
    }

    nextInput = 0;
console.log('Phase setting %s (%d)', leftPad(n.toString(5)), n);
    leftPad(n.toString(5)).split('').forEach( setting => {
        console.log('*');
        nextInput = runCode(inputCode, [Number(setting), nextInput])
    });

    if (nextInput > highestOutput.output) {
        highestOutput.output = nextInput;
        highestOutput.phaseSettings = n;
    }
    console.log('loop\'d');
}

console.log('Highest output was %d with settings %s.', highestOutput.output, leftPad(highestOutput.phaseSettings.toString(5)));
