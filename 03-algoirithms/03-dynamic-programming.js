// Dynamic programming is an optimization technique using caching
// memoization/caching is just storing values 

function add80To(n) {
    console.log('long time');
    return 80 + n
}

add80To(5);
add80To(5);
add80To(5);

// how can we optimize this?

let cache = {};
function memoizedAdd80To(n) {
    if (n in cache) {
        return cache[n];
    } else {
        console.log('long time');
        cache[n] = n + 80;
        return cache[n];
    }
}

memoizedAdd80To(5);
memoizedAdd80To(5);
memoizedAdd80To(5);


// with a closure 

function memoizedAdd80ToWithClosure(n) {
    let cache = {};
    return function (n) {
        if (n in cache) {
            return cache[n];
        } else {
            console.log('long time');
            cache[n] = n + 80;
            return cache[n];
        }
    }
}

const memoized = memoizedAdd80ToWithClosure();
memoized(5);
memoized(5);
memoized(5);

// another example

// fibonacci is very inefficient without memoization - o(2^n) - due to recursion

let calculations = 0;
function fibonacci(n) {
    calculations++;
    if (n < 2) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(20)); // 6765 calculations to only get the 20th index!


let calculations2 = 0;
function fibonacciMaster() {
    let cache = {};
    return function fib(n) {
        calculations2++;
        if (n in cache) {
            return cache[n];
        }
        if (n < 2) {
            return n
        }
        cache[n] = fib(n - 1) + fib(n - 2);
        return cache[n];
    }
}
const fasterFib = fibonacciMaster();
console.log(fasterFib(20), calculations2 + ' calculations');

// time complexity now reduced to O(n) using memoization
// however space complexity is O(1)
// again we can see that we sometimes have to trade space complexity for better time complexity

// another way solve this - called a bottom-up
//  avoids recursion
function fibonacci3(n) {
    let answer = [0, 1];
    for (let i = 2; i <= n; i++) {
        answer.push(answer[i - 2] + answer[i - 1]);
    }
    return answer.pop();
}