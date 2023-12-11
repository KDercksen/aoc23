const fs = require("fs");

const grid = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((row) => row.split(""));

const expandedRows = grid.reduce((acc, row, i) => {
  if (row.every((x) => x === ".")) {
    acc.push(i);
  }
  return acc;
}, []);

let expandedCols = [];
for (let c = 0; c < grid[0].length; c++) {
  let galaxyFound = false;
  for (let r = 0; r < grid.length; r++) {
    if (grid[r][c] === "#") {
      galaxyFound = true;
    }
  }
  if (!galaxyFound) {
    expandedCols.push(c);
  }
}

let galaxyLocations = [];
for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[0].length; c++) {
    if (expandedGrid[r][c] === "#") {
      galaxyLocations.push([r, c]);
    }
  }
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item, priority) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const shortestPath = (grid, start, end) => {
  let distances = {};
  let prev = {};
  let pq = new PriorityQueue();

  distances[start] = 0;
  pq.enqueue(start, 0);
  while (!pq.isEmpty()) {
    let [node, distance] = pq.dequeue();
    let neighbors = 
  }
}

// calculate distances between all pairs of galaxies
let distances = [];
for (let a = 0; a < galaxyLocations.length; a++) {
  for (let b = a + 1; b < galaxyLocations.length; b++) {}
}

console.log(distances.reduce((a, b) => a + b, 0));
