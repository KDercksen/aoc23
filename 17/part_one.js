const fs = require("fs");
const heap = require("heap-js");

const grid = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.split("").map((char) => +char));

const direction = (item) => {
  return item.steps.findIndex((x) => x !== 0);
};

const hash = (item) => {
  let d = direction(item);
  if (d === -1) {
    return "start";
  }
  return JSON.stringify([item.x, item.y, d, item.steps[d]]);
};

const getNeighbors = (item) => {
  const neighbors = [];
  // add upper neighbor
  if (item.y > 0) {
    let upSteps = item.steps[0];
    let downSteps = item.steps[2];
    if (upSteps < 3 && downSteps === 0) {
      neighbors.push({
        ...item,
        y: item.y - 1,
        cost: item.cost + grid[item.y - 1][item.x],
        steps: [upSteps + 1, 0, 0, 0],
        path: [...item.path, item],
      });
    }
  }

  // add right neighbor
  if (item.x < grid[0].length - 1) {
    let rightSteps = item.steps[1];
    let leftSteps = item.steps[3];
    if (rightSteps < 3 && leftSteps === 0) {
      neighbors.push({
        ...item,
        x: item.x + 1,
        cost: item.cost + grid[item.y][item.x + 1],
        steps: [0, rightSteps + 1, 0, 0],
        path: [...item.path, item],
      });
    }
  }

  // add lower neighbor
  if (item.y < grid.length - 1) {
    let downSteps = item.steps[2];
    let upSteps = item.steps[0];
    if (downSteps < 3 && upSteps === 0) {
      neighbors.push({
        ...item,
        y: item.y + 1,
        cost: item.cost + grid[item.y + 1][item.x],
        steps: [0, 0, downSteps + 1, 0],
        path: [...item.path, item],
      });
    }
  }

  // add left neighbor
  if (item.x > 0) {
    let leftSteps = item.steps[3];
    let rightSteps = item.steps[1];
    if (leftSteps < 3 && rightSteps === 0) {
      neighbors.push({
        ...item,
        x: item.x - 1,
        cost: item.cost + grid[item.y][item.x - 1],
        steps: [0, 0, 0, leftSteps + 1],
        path: [...item.path, item],
      });
    }
  }

  return neighbors;
};

const start = {
  x: 0,
  y: 0,
  cost: 0,
  steps: [0, 0, 0, 0], // north, east, south, west
  path: [],
};

const queue = new heap.Heap((a, b) => a.cost - b.cost);
queue.init([start]);

let visited = new Set();

let finalPath = [];

while (!queue.isEmpty()) {
  let current = queue.pop();
  let h = hash(current);
  if (visited.has(h)) {
    continue;
  }
  visited.add(h);
  if (current.x === grid[0].length - 1 && current.y === grid.length - 1) {
    let endCost = grid[grid.length - 1][grid[0].length - 1];
    // console.log("Destination reached in: ", current.cost + endCost);
    console.log("Destination reached in: ", current.cost);
    finalPath.push(...current.path);
    break;
  }
  let neighbors = getNeighbors(current);
  neighbors.forEach((n) => {
    let key = hash(n);
    if (!visited.has(key)) {
      queue.push(n);
    }
  });
}

// print the path in the grid
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (finalPath.some((item) => item.y === row && item.x === col)) {
      process.stdout.write(".");
    } else {
      process.stdout.write(grid[row][col].toString());
    }
  }
  process.stdout.write("\n");
}
