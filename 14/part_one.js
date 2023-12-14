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
      grid[i] = grid[i].substring(0, col) + "." + grid[i].substring(col+1);
      grid[destinationLine] = grid[destinationLine].substring(0, col) + "O" + grid[destinationLine].substring(col+1);
    }
  }
};

tilt(grid);

console.log(grid.map(line => (line.match(/O/g) || []).length).reduce((acc, x, i) => acc + (x * (grid.length - i)), 0));