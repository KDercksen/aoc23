const fs = require("fs");

const grid = fs
  .readFileSync("input.txt", "utf8")
  .split("\n\n")
  .map((x) => x.split("\n").map((x) => x.split("")));

const arrayEquals = (a, b) => {
  // mirror direction should always be rows i.e. vertical
  let [top, bottom] = [a, b].sort((x, y) => x.length - y.length);
  if (a.length === 0 || b.length === 0) {
    return false;
  }
  let errors = 0;
  for (let row = 0; row < top.length; row++) {
    for (let col = 0; col < top[0].length; col++) {
      if (top[row][col] !== bottom[row][col]) {
        errors++;
      }
    }
  }
  return errors == 1;
};

const mirrors = (grid, row) => {
  let top = grid.slice(0, row).reverse();
  let bottom = grid.slice(row);
  return arrayEquals(top, bottom);
};

const flipGrid90 = (grid) => {
  let newGrid = [];
  for (let col = 0; col < grid[0].length; col++) {
    let newRow = [];
    for (let row = grid.length - 1; row >= 0; row--) {
      newRow.push(grid[row][col]);
    }
    newGrid.push(newRow);
  }
  return newGrid;
};

const rowsAndColumns = (grid) => {
  let total = 0;
  for (let i = 0; i < grid.length; i++) {
    if (mirrors(grid, i)) {
      total += 100 * i;
    }
  }
  let flipped = flipGrid90(grid);
  for (let i = 0; i < flipped.length; i++) {
    if (mirrors(flipped, i)) {
      total += i;
    }
  }
  return total;
};

console.log(grid.map((x) => rowsAndColumns(x)).reduce((a, b) => a + b, 0));
