const input = [3,225,1,225,6,6,1100,1,238,225,104,0,2,218,57,224,101,-3828,224,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1102,26,25,224,1001,224,-650,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1102,44,37,225,1102,51,26,225,1102,70,94,225,1002,188,7,224,1001,224,-70,224,4,224,1002,223,8,223,1001,224,1,224,1,223,224,223,1101,86,70,225,1101,80,25,224,101,-105,224,224,4,224,102,8,223,223,101,1,224,224,1,224,223,223,101,6,91,224,1001,224,-92,224,4,224,102,8,223,223,101,6,224,224,1,224,223,223,1102,61,60,225,1001,139,81,224,101,-142,224,224,4,224,102,8,223,223,101,1,224,224,1,223,224,223,102,40,65,224,1001,224,-2800,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,1102,72,10,225,1101,71,21,225,1,62,192,224,1001,224,-47,224,4,224,1002,223,8,223,101,7,224,224,1,224,223,223,1101,76,87,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,226,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1107,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,7,226,677,224,1002,223,2,223,1005,224,359,101,1,223,223,1007,226,226,224,102,2,223,223,1005,224,374,101,1,223,223,108,677,677,224,102,2,223,223,1006,224,389,1001,223,1,223,107,677,226,224,102,2,223,223,1006,224,404,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,419,1001,223,1,223,1107,677,677,224,1002,223,2,223,1006,224,434,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,449,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,464,101,1,223,223,7,677,226,224,102,2,223,223,1006,224,479,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,494,101,1,223,223,1008,226,677,224,1002,223,2,223,1005,224,509,1001,223,1,223,1007,677,226,224,102,2,223,223,1005,224,524,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,539,101,1,223,223,1108,226,226,224,1002,223,2,223,1006,224,554,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,569,1001,223,1,223,7,226,226,224,102,2,223,223,1005,224,584,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,614,1001,223,1,223,108,226,226,224,1002,223,2,223,1006,224,629,101,1,223,223,107,677,677,224,102,2,223,223,1005,224,644,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,659,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226];

// Expected output: 3500,9,10,70,2,3,11,0,99,30,40,50
                    // 3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50
// const testinput = [1,9,10,3,2,3,11,0,99,30,40,50];
const testinput = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];

if (process.argv[2]==='test') {
    inputArray = testinput;
} else {
    inputArray = input;
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let i = 0;

const getParam = function (mode, position) {

    // inputArray[inputArray[i+3]]=inputArray[inputArray[i+1]]+inputArray[inputArray[i+2]];

    let returnValue;

    switch(mode) {
        case 0:
            returnValue = inputArray[inputArray[position]];
            break;
        case 1:
            returnValue = inputArray[position];
            break;
        default:
            console.log('Unexpected parameter mode %d at position %d', mode, position);
            returnValue = false;
            break;
    }

    return returnValue;
};

const decodeNext = instruction => {

    let a=0;
    let b=0;
    let c=0;
    let de=0;

    [a, b, c, ...de] = ('00000' + instruction.toString()).slice(-5).split('');

    return {
        opcode: Number(de.join('')),
        param1mode: Number(c),
        param2mode: Number(b),
        param3mode: Number(a)
    }
}

for (i=0; i<inputArray.length; i) {
    console.log('Executing %d at %d', inputArray[i], i);
    let decodedInstruction = decodeNext(inputArray[i]);

    let param1 = undefined;
    let param2 = undefined;

    switch (decodedInstruction.opcode) {
        case 1:
            // console.log('Add %d (at %d) to %d (at %d), store to position %d', inputArray[inputArray[i+1]], inputArray[i+1], inputArray[inputArray[i+2]], inputArray[i+2], inputArray[i+3])
            // inputArray[inputArray[i+3]]=inputArray[inputArray[i+1]]+inputArray[inputArray[i+2]];
            
            param1 = getParam(decodedInstruction.param1mode, i+1);
            param2 = getParam(decodedInstruction.param2mode, i+2);

            if (decodedInstruction.param3mode === 1) {
                console.log('Unexpected immediate mode write parameter at %d', i)
            }

            inputArray[inputArray[i+3]] = param1 + param2;

            console.log('O1: Stored %d (%d + %d) at %d', inputArray[inputArray[i+3]], param1, param2, inputArray[i+3]);

            i += 4;

            break;
        case 2:
            // console.log('Multiply %d (at %d) with %d (at %d), store to position %d', inputArray[inputArray[i+1]], inputArray[i+1], inputArray[inputArray[i+2]], inputArray[i+2], inputArray[i+3])
            // inputArray[inputArray[i+3]]=inputArray[inputArray[i+1]]*inputArray[inputArray[i+2]];

            param1 = getParam(decodedInstruction.param1mode, i+1);
            param2 = getParam(decodedInstruction.param2mode, i+2);

            if (decodedInstruction.param3mode === 1) {
                console.log('Unexpected immediate mode write parameter at %d', i)
            }

            inputArray[inputArray[i+3]] = param1 * param2;

            console.log('O2: Stored %d (%d * %d) at %d', inputArray[inputArray[i+3]], param1, param2, inputArray[i+3]);

            i += 4;

            break;
        case 3:
            //read from stdin - doesn't work?
            // rl.question('Input value> ', (input) => {
            //     inputArray[inputArray[i+1]] = Number(input);
            //     rl.close();
            // });

            inputArray[inputArray[i+1]] = 5;

            console.log('O3: Stored %d at %d', inputArray[inputArray[i+1]], inputArray[i+1]);

            i += 2;
            break;
        case 4:
            //write to stdout
            param1 = getParam(decodedInstruction.param1mode, i+1);

            console.log('> %d', param1);

            i += 2;
            break;
        case 5:
            // Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
            param1 = getParam(decodedInstruction.param1mode, i+1);
            param2 = getParam(decodedInstruction.param2mode, i+2);

            if (param1 !== 0) {
                i = param2;
            } else {
                i += 3;
            }

            console.log('O5: JNZ (%d) - PC now %d', param1, i);

            break;
        case 6:
            // Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
            param1 = getParam(decodedInstruction.param1mode, i+1);
            param2 = getParam(decodedInstruction.param2mode, i+2);

            if (param1 === 0) {
                i = param2;
            } else {
                i += 3;
            }

            console.log('O6: JZ (%d) - PC now %d', param1, i);

            break;
        case 7:
            // Opcode 7 is less than: if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
            param1 = getParam(decodedInstruction.param1mode, i+1);
            param2 = getParam(decodedInstruction.param2mode, i+2);

            if (decodedInstruction.param3mode === 1) {
                console.log('Unexpected immediate mode write parameter at %d', i)
            }

            inputArray[inputArray[i+3]] = Number(Boolean(param1 < param2));

            console.log('O7: STOLT (%d < %d ?) - Store %d at %d', param1, param2, inputArray[inputArray[i+3]], inputArray[i+3]);

            i += 4;
            break;
        case 8:
            // Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
            param1 = getParam(decodedInstruction.param1mode, i+1);
            param2 = getParam(decodedInstruction.param2mode, i+2);

            if (decodedInstruction.param3mode === 1) {
                console.log('Unexpected immediate mode write parameter at %d', i)
            }

            inputArray[inputArray[i+3]] = Number(Boolean(param1 === param2));

            console.log('O8: STOEQ (%d === %d ?) - Store %d at %d', param1, param2, inputArray[inputArray[i+3]], inputArray[i+3]);

            i += 4;
            break;
        case 99:
            console.log('Completed\n%O', inputArray);
            process.exit(0);
            break;
        default:
            throw new Error('Unknown opcode:' + inputArray[i]);
            break;
    }
}

