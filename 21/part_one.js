const fs = require("fs");

const grid = fs
  .readFileSync("input_test.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

const maxSteps = 6;

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

const getNeighbors = (loc) => {
  const neighbors = [];
  if (loc.x > 0 && grid[loc.y][loc.x - 1] === ".") {
    neighbors.push({ x: loc.x - 1, y: loc.y, steps: loc.steps + 1 });
  }
  if (loc.x < grid[0].length - 1 && grid[loc.y][loc.x + 1] === ".") {
    neighbors.push({ x: loc.x + 1, y: loc.y, steps: loc.steps + 1 });
  }
  if (loc.y > 0 && grid[loc.y - 1][loc.x] === ".") {
    neighbors.push({ x: loc.x, y: loc.y - 1, steps: loc.steps + 1 });
  }
  if (loc.y < grid.length - 1 && grid[loc.y + 1][loc.x] === ".") {
    neighbors.push({ x: loc.x, y: loc.y + 1, steps: loc.steps + 1 });
  }
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
  queue = [...couldBeAt];
}

console.log(reached);
