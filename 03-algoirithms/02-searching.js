// linear search - O(n)
// .indexOf, .find, .includes are all linear time

// if the data is sorted then we can improve upon linear time 

// binary search - log(n) time complexity 

// for traversing a tree/graph

// e.g. 
//            9
//        4       20
//      1   6   15  170

// breadth first search / traversal
// top to down, level by level
// search left to right 
// e.g. 9,4,20,1,6,15,170
// pros: shortest path, closer nodes
// cons: more memory

// depth first search
// lower memory requriement - not neccessary to store child pointers
// props: determining whether a path exists, less memory
// 3 ways to implement - inorder, preorder, postorder
// inorder (useful with binary trees) - 1,4,6,9,15,20,170 
// preorder (useful for recreating trees) - 9,4,1,6,20,15,170
// postorder - (going all the way down, then back up) - 1,6,4,15,170,20,9


// BFS AND DFS WITH TREES 

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
    breadthFirstSearch() {
        let currentNode = this.root;
        let list = [];
        let queue = [];
        queue.push(currentNode);

        while (queue.length > 0) {
            currentNode = queue.shift();
            list.push(currentNode.value);
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        return list
    }
    depthFirstSearchInOrder() {
        return traverseInOrder(this.root, []);
    }
    depthFirstSearchPostOrder() {
        return traversePostOrder(this.root, []);
    }
    depthFirstSearchPreOrder() {
        return traversePreOrder(this.root, []);
    }
}

function traversePreOrder(node, list) {
    list.push(node.value);
    if (node.left) {
        traversePreOrder(node.left, list);
    }
    if (node.right) {
        traversePreOrder(node.right, list);
    }
    return list;
}

function traverseInOrder(node, list) {
    if (node.left) {
        traverseInOrder(node.left, list);
    }
    list.push(node.value);
    if (node.right) {
        traverseInOrder(node.right, list);
    }
    return list;
}

function traversePostOrder(node, list) {
    if (node.left) {
        traversePostOrder(node.left, list);
    }
    if (node.right) {
        traversePostOrder(node.right, list);
    }
    list.push(node.value);
    return list;
}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
console.log(tree.lookup(171));
console.log(tree.lookup(170));
console.log('BFS', tree.breadthFirstSearch());
console.log('DFSpre', tree.depthFirstSearchPreOrder());
console.log('DFSin', tree.depthFirstSearchInOrder());
console.log('DFSpost', tree.depthFirstSearchPostOrder());


// BFS and DFS don't account for weighted edges 
// Bellmen-ford and Dijkstra's algorithms are the best for finding the shortest path
// between two nodes in the graph (with weighted edges)
// bellmen-ford can account for negative weighted edges, however the worst case is o(n^2)
// dijkstras algorithm cant account for negative algorithm, but its worse case is not as bad as BF's
