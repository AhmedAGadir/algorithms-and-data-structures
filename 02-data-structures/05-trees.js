// https://visualgo.net/bn/bst

// parent-child unidirectional relationship
// the DOM is a tree
// linked lists are technically a type of tree, but just with one path
// many types of tree: heaps, trie, linked lists, binary etc. (see wikipedia)
// the main ones are: 


// 1) Binary tree
// each node can have either 0, 1, or 2 nodes. 
// each child can have only 1 paren

// pros
// better than O(n)
// ordered
// flexible size
// cons 
// no O(1) operations

// lookup O(logN)
// search O(logN)
// delete O(logN)

// 1a) perfect binary tree 
// all nodes have either 0 children or 2 children. bottom layer is filled.
// very efficient.

//            X
//        X       X
//      X   X   X   X

// the number of total nodes doubles as we move down the tree
// the number of nodes on the last level is equal to the number of nodes on all other levels + 1. therefore almost half the nodes are on the bottom level
// level 0: 2 ^ 0 = 1;
// level 1: 2 ^ 1 = 2;
// level 2: 2 ^ 2 = 4;
// level 3: 2 ^ 3 = 8;

// s -> steps in binary search, N - number of nodes
// 2^s - 1 = N ----> approx 2^s as s tends towards infinity 

// unbalanced binary trees can end up having lookup, search and delete complexities of O(n)

// 1b) full binary tree - all nodes have either 0 children or 2 children. bottom layer doesnt have to be full. 
//          X
//      X      X
//   X     X
//      X     X

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        const newNode = { value, left: null, right: null };
        if (!this.root) {
            this.root = newNode;
        } else {
            let currentNode = this.root;
            while (true) {
                if (value < currentNode.value) {
                    // left
                    if (!currentNode.left) {
                        currentNode.left = newNode;
                        return;
                    }
                    currentNode = currentNode.left;
                } else {
                    // right
                    if (!currentNode.right) {
                        currentNode.right = newNode;
                        return;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }
    lookup(value) {
        if (!this.root) {
            return false;
        }
        let currentNode = this.root;
        while (currentNode) {
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }
        }
        return false;
    }
    remove(value) {
        if (!this.root) {
            return false;
        }
        let currentNode = this.root;
        let parentNode = null;
        while (currentNode) {
            if (value < currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else if (currentNode.value === value) {
                //We have a match, get to work!

                //Option 1: No right child: 
                if (currentNode.right === null) {
                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {

                        //if parent > current value, make current left child a child of parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.left;

                            //if parent < current value, make left child a right child of parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.left;
                        }
                    }

                    //Option 2: Right child which doesnt have a left child
                } else if (currentNode.right.left === null) {
                    currentNode.right.left = currentNode.left;
                    if (parentNode === null) {
                        this.root = currentNode.right;
                    } else {

                        //if parent > current, make right child of the left the parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.right;

                            //if parent < current, make right child a right child of the parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.right;
                        }
                    }

                    //Option 3: Right child that has a left child
                } else {

                    //find the Right child's left most child
                    let leftmost = currentNode.right.left;
                    let leftmostParent = currentNode.right;
                    while (leftmost.left !== null) {
                        leftmostParent = leftmost;
                        leftmost = leftmost.left;
                    }

                    //Parent's left subtree is now leftmost's right subtree
                    leftmostParent.left = leftmost.right;
                    leftmost.left = currentNode.left;
                    leftmost.right = currentNode.right;

                    if (parentNode === null) {
                        this.root = leftmost;
                    } else {
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = leftmost;
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = leftmost;
                        }
                    }
                }
                return true;
            }
        }
    }
}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
console.log(JSON.stringify(traverse(tree.root)));
console.log(tree.lookup(171));
console.log(tree.lookup(170));

//            9
//        4       20
//      1   6   15  170

function traverse(node) {
    const tree = { value: node.value };
    tree.left = node.left ? traverse(node.left) : null;
    tree.right = node.right ? traverse(node.right) : null;
    return tree;
}


// AVL and Red Black Trees rebalance themselves 
// AVL 
// resource: https://www.cs.usfca.edu/~galles/visualization/AVLtree.html
// explanation: https://medium.com/basecs/the-little-avl-tree-that-could-86a3cae410c7
// RBT 
// resource: https://www.cs.usfca.edu/~galles/visualization/RedBlack.html
// explanation: https://medium.com/basecs/painting-nodes-black-with-red-black-trees-60eacb2be9a5



// 2) Heap 
// most often binary heaps are used
// not ordered
// memory heap != heap data structure 
// left to right insertion 

// max heap - parents always have a higher value then children
// min heap is the opposite 

// max binary heap
//            101
//       72         33
//    2     46    5     1


// lookup O(n)
// insert O(log(n))
// delete O(log(n))

// pros: 
// comparative operations e.g. give me all values less than 33
// priority queues 
// insertion order (left to right)
// cons 
// lookup o(n) - must traverse since nothing is ordered


// 3) Trie
// cool specialized tree used in searching
// lets you search if a word or part of a word are in a text
// used in autocomplete, searching dictionaries etc.
// searching is O(length of word)

