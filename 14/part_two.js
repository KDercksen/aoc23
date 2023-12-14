const fs = require("fs");

const grid = fs.readFileSync("input.txt", "utf8").split("\n");

const tilt = (grid) => {
  for (const [i, row] of grid.entries()) {
    if (i === 0) continue;
    for (let col = 0; col < row.length; col++) {
      if (grid[i][col] !== "O") continue;
      let destinationLine = i - 1;
      while (destinationLine >= 0 && grid[destinationLine][col] === ".") {
        destinationLine--;
      }
      destinationLine++;
      grid[i] = grid[i].substring(0, col) + "." + grid[i].substring(col + 1);
      grid[destinationLine] =
        grid[destinationLine].substring(0, col) +
        "O" +
        grid[destinationLine].substring(col + 1);
    }
  }
};

const transpose = (grid) => {
  const newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    newGrid.push("");
  }
  for (const [i, row] of grid.entries()) {
    for (let j = 0; j < row.length; j++) {
      newGrid[j] = grid[i][j] + newGrid[j];
    }
  }
  return newGrid;
};

const cycle = (grid) => {
  let tmp = [...grid];
  for (let i = 0; i < 4; i++) {
    tilt(tmp);
    tmp = transpose(tmp);
  }
  return tmp;
};

const hash = (s) => {
  return s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

let tmp = [...grid];
let cycleStart = 0;
let cycleLength = 0;
let cycleCount = 0;
let hashes = {};
while (true) {
  tmp = cycle(tmp);
  cycleCount++;
  const h = hash(tmp.join("\n"));
  if (hashes.hasOwnProperty(h)) {
    cycleStart = hashes[h];
    cycleLength = cycleCount - cycleStart;
    break;
  }
  hashes[h] = cycleCount;
}

const c = (1000000000 - cycleStart) % cycleLength;

tmp = [...grid];
for (let i = 0; i < cycleStart + c; i++) {
  tmp = cycle(tmp);
}

console.log(
  tmp
    .map((line) => (line.match(/O/g) || []).length)
    .reduce((acc, x, i) => acc + x * (grid.length - i), 0)
);
