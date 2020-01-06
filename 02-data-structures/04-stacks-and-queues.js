// v. similar. Main difference is how items get removed

// can only ever access first/last elements
// having these limited operations is useful as it limits what can be done with them

// props
// fast operations
// fast peak
// ordered
// cons 
// slow lookup


// ••••••••• Stacks - think stack of plates •••••••••

// LIFO -> last in, first out
// can only access the top element

// lookup O(n)n --> usually you don't do this
// push O(1)
// pop O(1) --> remove last person in stack
// peek O(1) --> peeks at the last person

// useful for function stacks, browser history

// can implement these in either arrays or linked lists

// Stack implemented using a linked list
class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }
    peek() {
        console.log(this.top);
    }
    pushValue(value) {
        const newNode = { value, next: null };
        if (this.length === 0) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            const holdingPointer = this.top;
            this.top = newNode;
            this.top.next = holdingPointer
        }
        this.length++;
    }
    pop() {
        if (!this.top) {
            return;
        }
        if (this.length === 1) {
            this.bottom = null;
        }
        const holdingPointer = this.top;
        this.top = this.top.next;
        this.length--;
    }
}

const myStack = new Stack();
myStack.pushValue('google');
myStack.pushValue('udemy.com');
myStack.pushValue('discord');
myStack.peek();
myStack.pop();
myStack.peek();
myStack.pop();
myStack.peek();
myStack.pop();
myStack.peek();

class StackUsingArray {
    constructor() {
        this.array = [];
    }
    peek() {
        console.log(this.array[this.array.length - 1]);
    }
    pushValue(value) {
        const newNode = { value, next: null };
        this.array.push(newNode);
    }
    pop() {
        this.array.pop();
    }
}

// ••••••••• Queues - think que for a rollercoaster •••••••••

//  FIFO  -> first in, first out

// lookup O(n) --> usually you don't do this
// enqueue (push) O(1)
// dequeue (pop) O(1) --> removes first person in que
// peek O(1) --> peeks at the first person

// restaurant apps, uber ride requests, printing etc. all use queues 

// can implement this in a link list, not an array (popping would cause indexes to shift - inefficient - O(n))

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    peek() {
        console.log(this.first);
    }
    enqueue(value) {
        const newNode = { value, next: null };
        if (this.length === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
    }
    dequeue() {
        if (this.length === 0) {
            return null;
        }
        if (this.length === 1) {
            this.last = null;
        }
        this.first = this.first.next;
        this.length--;
    }
}

const myQueue = new Queue();
myQueue.enqueue('Joy');
myQueue.enqueue('Matt');
myQueue.enqueue('Pavel');
myQueue.enqueue('Samir');
myQueue.peek();
myQueue.dequeue();
myQueue.peek();
myQueue.dequeue();
myQueue.peek();
myQueue.dequeue();
myQueue.peek();
myQueue.dequeue();
myQueue.peek();



// •••••••••••••••••••••••••••

