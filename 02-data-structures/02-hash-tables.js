// also known as hash-maps,maps, unordered maps, dictionaries, objects

let obj = {}
obj.grapes = 1000;


// hash tables use hash functions
// a hash function generates a value of fixed length for each input that it gets
// keys (e.g. grapes) are passed to hash functions. there are different types of hash functions (md5, SHA-256 etc). 
// the same type of hash function will always generate the same value for a specific input (grapes => 15a8de26589689d0fa41acee04d25b8a)
// the value generated gets converted to the location in memory (called a bucket) where the key-value pair are stored (grapes, 1000)

// great time complexities
// insert 0(1)
// lookup 0(1)
// delete 0(1) // because hash tables arent ordered, we dont have to shift indexes like with arrays
// search 0(1)

let user = {
    age: 54,
    name: 'Kylie',
    magic: true,
    shout: function () {
        console.log('ahhh!')
    }
};

user.age // O(1)
user.spell = 'abra kadabra';

// because memory space is limited, sometimes hash functions end up assigning more than one key-value pair to a single bucket
// this is called a collision
// collisions cause our lookup to be slowed down to O(n/k) -> O(n)
// link lists can be a solution to collisions - (others are seperate chaining, robin hood hashing - can look into this later)

// javascript objects only allow you to set strings as object keys
// maps allow you to set any data type as am object key;
// maps also maintain insertion order
const myMap = new Map();
// sets only stores keys, no values
const mySet = new Set();

// implementing a hash table
class HashTable {
    constructor(size) {
        this.data = new Array(size);
    }
    // generates unique hashes - very fast, were just looping over the key, so we consider this to be O(1)
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.data.length;
        }
        return hash;
    }
    set(key, value) { // O(1)
        let address = this._hash(key);
        if (!this.data[address]) {
            // could use a linked list here instead of an array 
            this.data[address] = [];
        }
        this.data[address].push([key, value]);
    }
    get(key) { // if no collisions O(1), if there are collisions O(n)
        let address = this._hash(key);
        const currentBucket = this.data[address];
        if (currentBucket) {
            for (let i = 0; i < currentBucket.length; i++) {
                if (currentBucket[i][0] === key) {
                    return currentBucket[i][1];
                }
            }
        }
        return undefined;
    }
    // allows us to iterate throughout all of our keys
    // gives these unordered
    // this doesnt work with bucket that hold more than one key-value pair
    keys() {
        const keysArray = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i]) {
                keysArray.push(this.data[i][0][0]);
            }
        }
        return keysArray;
    }
}

const myHashTable = new HashTable(50);
myHashTable.set('grapes', 10000);
myHashTable.set('apples', 5000);
myHashTable.set('oranges', 5000);
console.log(myHashTable.get('grapes'));
console.log(myHashTable.keys()) // grapes, apples, oranges


// time complexity: arrays vs hash tables 
//  search: O(n) vs O(1)
//  insert: O(n) vs O(1)
//  lookup: O(1) vs O(1)
//  delete: O(n) vs O(1)


// question: find first reoccuring character in an array

// brute force answer: nested loop -> O(n^2)

// better solution: hash table
let myArr = [2, 8, 6, 4, 6, 8, 9]

function firstRecurringCharacter(input) { // time complexity O(n) but space complexity O(1);
    let map = {};
    for (let i = 0; i < input.length; i++) {
        if (map[input[i]]) {
            return input[i];
        } else {
            map[input[i]] = true
        }
    }
    return undefined;
}

console.log(firstRecurringCharacter(myArr))

// pros:
// fast lookups
// fast inserts
// flexible keys
// cons:
// unordered
// slow key iteration