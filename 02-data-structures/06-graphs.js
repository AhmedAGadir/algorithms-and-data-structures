// a set of values that are related in a network
// each item is a node/vertex
// nodes are connected by edges

// facebook uses it for their social network, 
// google map uses it for determining shortest distances

// graphs can be:
// directed or undirected
// weighted or unweighted (edges carry instructions)
// cyclic or acyclic

// 3 ways to build graphs
// 1) Edge list - each value state what nodes are connected to each other
const graph = [[0, 2], [2, 3], [2, 1], [1, 3]]
// 2) Adjacent list - key is the node, values are the nodes neighbours
// can be represented as an object or array
const graph2 = {
    0: [2],
    1: [2, 3],
    2: [0, 1, 3],
    3: [1, 2]
};
// 3) Adjacent matrix -  rows and columns are nodes, 0 means not connected, 1 means connected
// can also be represented as an object/array
const graph3 = [
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 0],
];

class Graph {
    constructor() {
        this.numberOfNodes = 0;
        this.adjacentList = {};
    }
    addVertex(node) {
        this.adjacentList[node] = [];
        this.numberOfNodes++;
    }
    addEdge(node1, node2) {
        // undirected, unweighted graph
        this.adjacentList[node1].push(node2);
        this.adjacentList[node2].push(node1);
    }
    showConnections() {
        const allNodes = Object.keys(this.adjacentList);
        for (let node of allNodes) {
            let nodeConnections = this.adjacentList[node];
            let connections = "";
            let vertex;
            for (vertex of nodeConnections) {
                connections += vertex + " ";
            }
            console.log(node + "-->" + connections);
        }
    }
}

const myGraph = new Graph();
myGraph.addVertex('0');
myGraph.addVertex('1');
myGraph.addVertex('2');
myGraph.addVertex('3');
myGraph.addVertex('4');
myGraph.addVertex('5');
myGraph.addVertex('6');
myGraph.addEdge('3', '1');
myGraph.addEdge('3', '4');
myGraph.addEdge('4', '2');
myGraph.addEdge('4', '5');
myGraph.addEdge('1', '2');
myGraph.addEdge('1', '0');
myGraph.addEdge('0', '2');
myGraph.addEdge('6', '5');
myGraph.showConnections();