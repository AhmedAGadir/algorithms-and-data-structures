// simplest and widest used data structure
// smallest memory footprint
// best if you just need to store data and iterate over it

// pros:
// fast lookups 
// fast push/pop
// ordered 
// cons:
// slow inserts
// slow deletes 
// fixed size

// methods 
// lookup O(1)
// push O(1)
// insert O(n)
// delete O(n)


const strings = ['a', 'b', 'c', 'd'];
// 4 items * 4 shelves in memory = 16 bytes of storage.

strings.push('e'); // O(1)
strings.pop(); // O(1)
strings.unshift('x') // O(n) --> because we have to iterate over items and update their indices
strings.splice(2, 0, 'alien') // O(n)


// 2 types of arrays: static and fixed
// static arrays - fixed length
// dynamic arrays - variable length - allow us to copy and rebuild arrays at a new location
// dynamic arrays work by creating an array with a fixed size (e.g. 7), however when its necessary to exceed the limit, the items are copied to an array of 2x size (e.g. 14)

// C++ - memory allocatiion
// int a[20];
// int b[5] = {1,2,3,4,5};

class MyArray {
    constructor() {
        this.length = 0;
        this.data = {};
    }
    get(index) {
        return this.data[index]
    }
    push(item) {
        this.data[this.length] = item;
        this.length++;
        return this.length;
    }
}

const myArr = new Array();
myArr.push('hi');
console.log(myArr);
