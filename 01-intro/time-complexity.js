const myArr = ['dory', 'nemo', 'bruce', 'marlin'];

function printFirst(arr) {
    console.log(arr[0])
}

printFirst(myArr) // O(1) 

function printFirst2(arr) {
    console.log(arr[0]); // O(1)
    console.log(arr[1]); // O(1)
}

printFirst2(myArr) // O(1 + 1) = O(2) 

// O(n) --> Constant time

// in doesn't matter how many inputs we have, were always going to do a constant number of operations

function findNemo(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'nemo') {
            console.log('Found NEMO!');
        }
    }
}
findNemo(myArr); // O(n) --> Linear Time

const boxes = [1, 2, 3, 4, 5];

function logAllPairsOfArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]);
        }
    }
}

logAllPairsOfArray(boxes); // o(n^2) - Quadratic time



// RULE 1: worst case

// RULE 2: remove constants
// includes multiplying by constants, adding constants etc.

// RULE 3: different terms for inputs

function compressBoxesTwice(boxes, boxes2) {
    boxes.forEach(box => console.log(box));
    boxes2.forEach(box => console.log(box));
}

compressBoxesTwice(boxes, boxes) // O(a + b);

function compressBoxesNested(boxes, boxes2) {
    boxes.forEach(box1 => {
        boxes2.forEach(box2 => {
            console.log(box1, box2)
        })
    });
    ;
}

compressBoxesTwice(boxes, boxes) // O(a * b);

// RULE 4: drop non dominants 
// keep the highest power


// *****
// question where were checking if an array contains an item in another array

// simple solution - nested for loops 
const arr1 = ['a', 'b', 'c', 'x'];
const arr2 = ['x', 'y', 'z'];

function containsCommonItem(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                console.log('common item found');
            }
        }
    }
}

containsCommonItem(arr1, arr2);
// O(a * b) --> time complexity, not very efficient
// O(1) -> space complexity

// hash tables are a common solution to nested for loops

// array1 => obj {
//     a: true,
//     b: true,
//     c: true,
//     x: true
// }
// array2[index] === obj.properties

function containsCommonItem2(arr1, arr2) {
    let map = {};
    for (let i = 0; i < arr1.length; i++) {
        const item = arr1[i];
        if (!map[item]) {
            map[item] = true;
        }
    }
    for (let j = 0; j < arr2.length; j++) {
        const item = arr2[j];
        if (map[item]) {
            console.log('common item found');
            return true;
        }
    }
    return false;
}

containsCommonItem2(arr1, arr2);
// O(a + b) --> linear time, improvement
// O(a) --> Space Complexity

function containsCommonItem3(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}

containsCommonItem3(arr1, arr2); // O(a*b) --> much more readable though