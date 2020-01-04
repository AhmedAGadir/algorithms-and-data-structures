// https://visualgo.net/en/list?slide=1

// two types: singly linked lists and doubly linked lists
// made from nodes and pointers
// first node is the head, last node is the tail
// linked lists are null-terminated
// can be sorted, unsorted etc.
// nodes can be pretty much any datatype 

// its a low level data structure, which is actually used in some other data structures (e.g. hash tables)

// pros:
// fast insertion
// fast deletion 
// ordered 
// flexible size
// cons:
// slow lookup
// more memory

const basket = ['apples', 'grapes', 'bananas'];

// linked list: apples --> grapes --> pear
// apples
// 8947 --> grapes
//          8742 --> pears
//                  372 --> null

// traversing through a linked list is normally slower than iterating over an array
// because nodes in linked lists arent typically stored right next to eachother in memory (as opposed to arrays which keep items indexed next to eachother in memory)

// time complexities
// prepend O(1)
// append O(1)
// lookup/traversal O(n)
// insert O(n)
// delete O(n)

// a pointer is a reference to another place in memory
const obj1 = { a: true };
const obj2 = obj1; //obj2 is a pointer 

// 10 --> 5 --> 6

// let myLinkedList = {
//     head: {
//         value: 10,
//         next: {
//             value: 5,
//             next: {
//                 value: 16,
//                 next: null
//             }
//         }
//     }
// };

class LinkedList {
    constructor(value) {
        this.head = {
            value: value,
            next: null
        }
        this.tail = this.head;
        this.length = 1; // optional
    }
    append(value) {
        const newNode = { value, next: null };
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    }
    prepend(value) {
        const newNode = { value, next: null };
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }
    insert(index, value) {
        if (index >= this.length) {
            return this.append(value);
        }
        const newNode = { value, next: null };
        const leader = this.traverseToIndex(index - 1);
        const holdingPointer = leader.next;
        leader.next = newNode;
        newNode.next = holdingPointer;
        this.length++;
    }
    traverseToIndex(index) {
        let counter = 0;
        let currentNode = this.head;
        while (counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }
    remove(index) {
        const leader = this.traverseToIndex(index - 1);
        const unwantedNode = leader.next;
        leader.next = unwantedNode.next;
        this.length--;
    }
    printList() {
        const arr = [];
        let currentNode = this.head;
        while (currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }
    reverse() {
        if (!this.head.next) {
            return
        }
        let first = this.head;
        this.tail = this.head;
        let second = first.next;
        while (second) {
            const temp = second.next;
            second.next = first;
            first = second;
            second = temp;
        }
        this.head.next = null
        this.head = first;

    }
}

// could use an OOP approach to create nodes 
// class Node {
//     constructor(value) {
//         this.value = value;
//         this.next = null;
//     }
// }

const myLinkedList = new LinkedList(10);
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.prepend('hello');
myLinkedList.insert(200, 99);
myLinkedList.insert(2, 'world');
myLinkedList.remove(3);
myLinkedList.reverse(); // [99, 16, 'world', 10, 'hello ]
console.log(myLinkedList.printList());
console.log(myLinkedList);

// doubly linked lists allow us to traverse our data backwards
// just contains an additional pointer to a nodes previous node
// searching in a doubly link list can be a little more efficient -> O(n/2) 
// the downside is that we have to use a little more memory

class DoublyLinkedList {
    constructor(value) {
        this.head = {
            value: value,
            next: null,
            prev: null
        }
        this.tail = this.head;
        this.length = 1; // optional
    }
    append(value) {
        const newNode = { value, next: null, prev: null };
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    }
    prepend(value) {
        const newNode = { value, next: null, prev: null };
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }
    insert(index, value) {
        if (index >= this.length) {
            return this.append(value);
        }
        const newNode = { value, next: null };
        const leader = this.traverseToIndex(index - 1);
        const follower = leader.next;
        leader.next = newNode;
        newNode.prev = leader;
        newNode.next = follower;
        follower.prev = newNode;
        this.length++;
    }
    traverseToIndex(index) {
        let counter = 0;
        let currentNode = this.head;
        while (counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }
    printList() {
        const arr = [];
        let currentNode = this.head;
        while (currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }
}

// const myLinkedList = new DoublyLinkedList(10);
// myLinkedList.append(5);
// myLinkedList.append(16);
// myLinkedList.prepend('hello');
// myLinkedList.insert(200, 99);
// myLinkedList.insert(2, 'world');
// // myLinkedList.remove(3); // didn't implement this
// console.log(myLinkedList.printList());
// console.log(myLinkedList);

// single vs doubly linked lists
// singly:
// simpler
// requires less memory
// a little bit faster 
// can not be traversed backwards
// doulby:
// can be traversed backwards 
// better for searching
// requires more memory and a little slower 
