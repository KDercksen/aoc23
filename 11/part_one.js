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

// make new expanded grid
let expandedGrid = [];
for (let r = 0; r < grid.length; r++) {
  let row = [];
  for (let c = 0; c < grid[0].length; c++) {
    row.push(grid[r][c]);
    if (expandedCols.includes(c)) {
      row.push(".");
    }
  }
  expandedGrid.push(row);
  if (expandedRows.includes(r)) {
    expandedGrid.push(Array(expandedGrid[0].length).fill("."));
  }
}

let galaxyLocations = [];
for (let r = 0; r < expandedGrid.length; r++) {
  for (let c = 0; c < expandedGrid[0].length; c++) {
    if (expandedGrid[r][c] === "#") {
      galaxyLocations.push([r, c]);
    }
  }
}

// calculate distances between all pairs of galaxies
let distances = [];
for (let a = 0; a < galaxyLocations.length; a++) {
  for (let b = a + 1; b < galaxyLocations.length; b++) {
    let [r1, c1] = galaxyLocations[a];
    let [r2, c2] = galaxyLocations[b];
    distances.push(Math.abs(r1 - r2) + Math.abs(c1 - c2));
  }
}

console.log(distances.reduce((a, b) => a + b, 0));
