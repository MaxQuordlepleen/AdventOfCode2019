// * It is a six-digit number.
// * The value is within the range given in your puzzle input.
// * Two adjacent digits are the same (like 22 in 122345).
// * Going from left to right, the digits never decrease; 
//   they only ever increase or stay the same (like 111123 or 135679).

// Other than the range rule, the following are true:

// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).


// 240920-789857 

let i = 0;

let validPasswords = [];

const sum = arr => arr.reduce((a,b) => a + b, 0)

const hasAdjacentDigits = n => {
    let digits = n.toString();    

    return Boolean(digits.match(/(?:^|(.)(?!\1))(\d)\2(?!\2)/g));
};

const digitsNeverDecrease = n => {
    let digits = n.toString().split('');

    let result = true;

    digits.forEach( (d,i) => {
        if (Number(d) < Number(digits[i-1])) {
            result = false;
        }
    })

    return result;

};

for (i=240920;i<=789857;i++) {
    if (
        i.toString().length === 6 &&
        hasAdjacentDigits(i) &&
        digitsNeverDecrease(i)
    ) {
        validPasswords.push(i);
    }
}

console.log('%d codes meet the criteria in this range.', validPasswords.length);