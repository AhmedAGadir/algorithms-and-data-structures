// https://www.bigocheatsheet.com/

// .sort() converts numbers to strings, uses .charCodeAt(0) and then compares
// the time and space complexity of .sort cannot be guarenteed as it is implementation dependant

// elementary sorts: bubble, insertion, selection sort
// more complex: merge, quick sort -- use a divide and conquer strategy

const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

// •••••••• Bubble sort ••••••••
// compare 2 them bubble up the bigger one
// iterate over the array of length n n times doing this
// O(n^2)

function bubbleSort(arr) {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap numbers
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort(numbers));

// •••••••• selection sort ••••••••
// scans a list for the smallest list, then swaps with the first item
// iterate n times doing that 
// O(n^2)

function selectionSort(array) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        // set current index as minimum
        let min = i;
        let temp = array[i];
        for (let j = i + 1; j < length; j++) {
            if (array[j] < array[min]) {
                //update minimum if current is lower that what we had previously
                min = j;
            }
        }
        array[i] = array[min];
        array[min] = temp;
    }
    return array;
}

console.log(selectionSort(numbers));

// •••••••• insertion sort ••••••••
// there are cases where this is extremely fast 
// useful for when the list is almost sorted 

function insertionSort(array) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        if (array[i] < array[0]) {
            //move number to the first position
            array.unshift(array.splice(i, 1)[0]);
        } else {
            // only sort number smaller than number on the left of it. This is the part of insertion sort that makes it fast if the array is almost sorted.
            if (array[i] < array[i - 1]) {
                //find where number should go
                for (var j = 1; j < i; j++) {
                    if (array[i] >= array[j - 1] && array[i] < array[j]) {
                        //move number to the right spot
                        array.splice(j, 0, array.splice(i, 1)[0]);
                    }
                }
            }
        }
    }
    return array;
}

console.log(insertionSort(numbers));

// •••••••• merge sort ••••••••
// divide and conquer usually results in some kind of logarithmic time complexity 
// one of the most efficient ways you can sort a list
// time complexity is O(nlog(n)) - n because were iterating * log(n) for the dividing 
// hard to implement merge sort
// merge sort is a stable algorithm - meaning that the output will keep the order of two inputs which are to be sorted the same
// e.g. if we sort the list ['peace','straw','apple','spork'] by their first letter
// then a stable algorithm will always give ['apple', 'peace','straw','spork'], where an unstable one may have 'spork' before 'straw'

function mergeSort(array) {
    if (array.length === 1) {
        return array
    }
    // Split Array in into right and left
    const length = array.length;
    const middle = Math.floor(length / 2)
    const left = array.slice(0, middle)
    const right = array.slice(middle)
    // console.log('left:', left);
    // console.log('right:', right);


    return merge(
        mergeSort(left),
        mergeSort(right)
    )
}

function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length &&
        rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++
        }
    }
    // console.log(left, right)
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

console.log(mergeSort(numbers))

// •••••••• quick sort ••••••••
// another divide and conquer strategy
// pick a random number (pivot), all numbers lower to left, all higher to right
// usually the fastest on average (O(nlog(n))), but does have somme nasty worst case (O(n^2))

function quickSort(array, left, right) {
    const len = array.length;
    let pivot;
    let partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = partition(array, pivot, left, right);

        //sort left and right
        quickSort(array, left, partitionIndex - 1);
        quickSort(array, partitionIndex + 1, right);
    }
    return array;
}

function partition(array, pivot, left, right) {
    let pivotValue = array[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
        if (array[i] < pivotValue) {
            swap(array, i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(array, right, partitionIndex);
    return partitionIndex;
}

function swap(array, firstIndex, secondIndex) {
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

console.log(quickSort(numbers));


// •••••••••••••••••••••••••••
// when to use which algorithm
// insertion sort: only a few items / mostly sorted data
// bubble sort: never - only really used for teaching
// selection sort: never - only really used for teaching
// merge sort: v. good - best, average and worst case are all O(nlog(n)). however space complexity of O(n)
// quick sort: v. good - better than merge sort, less space complexity. one down side is worst case time complexity O(n^2)

// it is impossible to make a sorting algorithm that uses comparisons that is faster than O(nlog(n))
// the only faster way to sort is without comparison - non-comparison sorts.
// non comparison sorts: counting sort, radix sort
// this takes advantage of how numbers are stored in our computer as 0's and 1's
// can get v. complicated
// non-comparison sorts work only for: (a) numbers (b) within a specific range