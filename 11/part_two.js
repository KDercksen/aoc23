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
    if (grid[r][c] === "#") {
      galaxyLocations.push([r, c]);
    }
  }
}

// calculate expanded galaxy locations by checking how many expanded
// columns/rows are before the current location
let expandedGalaxyLocations = [];
for ([r, c] of galaxyLocations) {
  let columnsBefore = expandedCols.filter((x) => x < c).length;
  let rowsBefore = expandedRows.filter((x) => x < r).length;
  expandedGalaxyLocations.push([
    r + rowsBefore * 1000000 - rowsBefore,
    c + columnsBefore * 1000000 - columnsBefore,
  ]);
}

// calculate distances between all pairs of galaxies
let distances = [];
for (let a = 0; a < galaxyLocations.length; a++) {
  for (let b = a + 1; b < galaxyLocations.length; b++) {
    let [r1, c1] = expandedGalaxyLocations[a];
    let [r2, c2] = expandedGalaxyLocations[b];
    let distance = distances.push(Math.abs(r1 - r2) + Math.abs(c1 - c2));
  }
}

console.log(distances.reduce((a, b) => a + b, 0));
