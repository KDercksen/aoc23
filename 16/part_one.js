const fs = require("fs");

const grid = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(""));

const step = (current) => {
  if (current.direction === "right") {
    return { ...current, x: current.x + 1, y: current.y };
  } else if (current.direction === "left") {
    return { ...current, x: current.x - 1, y: current.y };
  } else if (current.direction === "up") {
    return { ...current, x: current.x, y: current.y - 1 };
  } else if (current.direction === "down") {
    return { ...current, x: current.x, y: current.y + 1 };
  }
};

const isValidLoc = (current, grid) => {
  return (
    current.x >= 0 &&
    current.x < grid[0].length &&
    current.y >= 0 &&
    current.y < grid.length
  );
};

const nextLocs = (current, grid) => {
  let c = grid[current.y][current.x];
  if (c === ".") {
    return [step(current)];
  } else if (c === "/") {
    if (current.direction === "right") {
      return [step({ ...current, direction: "up" })];
    } else if (current.direction === "left") {
      return [step({ ...current, direction: "down" })];
    } else if (current.direction === "up") {
      return [step({ ...current, direction: "right" })];
    } else if (current.direction === "down") {
      return [step({ ...current, direction: "left" })];
    }
  } else if (c === "\\") {
    if (current.direction === "right") {
      return [step({ ...current, direction: "down" })];
    } else if (current.direction === "left") {
      return [step({ ...current, direction: "up" })];
    } else if (current.direction === "up") {
      return [step({ ...current, direction: "left" })];
    } else if (current.direction === "down") {
      return [step({ ...current, direction: "right" })];
    }
  } else if (c === "-") {
    if (current.direction === "right" || current.direction === "left") {
      return [step(current)];
    } else {
      return [
        step({ ...current, direction: "right" }),
        step({ ...current, direction: "left" }),
      ];
    }
  } else if (c === "|") {
    if (current.direction === "up" || current.direction === "down") {
      return [step(current)];
    } else {
      return [
        step({ ...current, direction: "up" }),
        step({ ...current, direction: "down" }),
      ];
    }
  }
};

let start = { x: 0, y: 0, direction: "right" };
let queue = [start];
let seenSteps = new Set();
let seenTiles = new Set();

while (queue.length > 0) {
  let current = queue.shift();
  seenTiles.add(`${current.x},${current.y}`);
  let next = nextLocs(current, grid);
  next.forEach((n) => {
    if (isValidLoc(n, grid)) {
      if (!seenSteps.has(`${n.x},${n.y},${n.direction}`)) queue.push(n);
    }
  });
  seenSteps.add(`${current.x},${current.y},${current.direction}`);
}

console.log(seenTiles.size);
