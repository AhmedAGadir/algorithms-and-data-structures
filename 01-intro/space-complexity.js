function boo(n) {
    for (let i = 0; i < n.length; i++) {
        console.log('boo!');
    }
}

boo([1, 2, 3, 4, 5]);
// time complexity - O(n)
// space complexity - O(1) -- creating one variable

function arrayOfHiNTimes(n) {
    let hiArray = [];
    for (let i = 0; i < n.length; i++) {
        hiArray[i] = 'hi';
    }
    return hiArray;
}

arrayOfHiNTimes(6);
// time complexity - O(n)
// space complexity - O(n) - linear