const fs = require("fs");

const grid = fs
  .readFileSync("input_test.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

const maxSteps = 1000;

let startLoc;
grid.forEach((row, y) => {
  row.forEach((col, x) => {
    if (col === "S") {
      startLoc = { x: x, y: y, steps: 0 };
    }
  });
});

// make start location reachable
grid[startLoc.y][startLoc.x] = ".";

let maxY = grid.length;
let maxX = grid[0].length;

const rotate = (num, max) => {
  return (num + max * (Math.floor(Math.abs(num) / max) + 1)) % max;
};

const cache = {};
const getNeighbors = (loc) => {
  const neighbors = [];
  const key = JSON.stringify([loc.x, loc.y]);
  if (cache[key] !== undefined) {
    return cache[key];
  }
  if (grid[rotate(loc.y, maxY)][rotate(loc.x - 1, maxX)] === ".") {
    neighbors.push({ x: loc.x - 1, y: loc.y, steps: loc.steps + 1 });
  }
  if (grid[rotate(loc.y, maxY)][rotate(loc.x + 1, maxX)] === ".") {
    neighbors.push({ x: loc.x + 1, y: loc.y, steps: loc.steps + 1 });
  }
  if (grid[rotate(loc.y - 1, maxY)][rotate(loc.x, maxX)] === ".") {
    neighbors.push({ x: loc.x, y: loc.y - 1, steps: loc.steps + 1 });
  }
  if (grid[rotate(loc.y + 1, maxY)][rotate(loc.x, maxX)] === ".") {
    neighbors.push({ x: loc.x, y: loc.y + 1, steps: loc.steps + 1 });
  }
  cache[key] = neighbors;
  return neighbors;
};

let queue = [startLoc];
let reached;
for (let i = 0; i < maxSteps; i++) {
  const couldBeAt = [];
  const visited = new Set();
  while (queue.length > 0) {
    current = queue.shift();
    const neighbors = getNeighbors(current);
    neighbors.forEach((neighbor) => {
      if (!visited.has(JSON.stringify([neighbor.x, neighbor.y])))
        couldBeAt.push(neighbor);
      visited.add(JSON.stringify([neighbor.x, neighbor.y]));
    });
  }
  reached = couldBeAt.length;
  // console.log(couldBeAt)
  queue = [...couldBeAt];
}

console.log(reached);
