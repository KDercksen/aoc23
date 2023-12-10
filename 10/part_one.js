const fs = require("fs");

const grid = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

let startLocation;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === "S") {
      startLocation = [row, col];
    }
  }
}

const validMoves = {
  north: ["|", "7", "F"],
  south: ["|", "J", "L"],
  east: ["-", "J", "7"],
  west: ["-", "F", "L"],
};

const getValidStartMoves = (row, col) => {
  let moves = [];
  if (validMoves.north.includes(grid[row - 1][col])) {
    // up is valid
    moves.push([row - 1, col]);
  }
  if (validMoves.south.includes(grid[row + 1][col])) {
    // down is valid
    moves.push([row + 1, col]);
  }
  if (validMoves.east.includes(grid[row][col + 1])) {
    // right is valid
    moves.push([row, col + 1]);
  }
  if (validMoves.west.includes(grid[row][col - 1])) {
    // left is valid
    moves.push([row, col - 1]);
  }
  return moves;
};

const getValidMoves = (row, col) => {
  let moves = [];
  let currentPipe = grid[row][col];
  if (currentPipe === "S") {
    moves.push("STOP");
  }
  if (currentPipe === "|") {
    if (validMoves.north.includes(grid[row - 1][col])) {
      moves.push([row - 1, col]);
    }
    if (validMoves.south.includes(grid[row + 1][col])) {
      moves.push([row + 1, col]);
    }
  } else if (currentPipe === "-") {
    if (validMoves.east.includes(grid[row][col + 1])) {
      moves.push([row, col + 1]);
    }
    if (validMoves.west.includes(grid[row][col - 1])) {
      moves.push([row, col - 1]);
    }
  } else if (currentPipe === "F") {
    if (validMoves.south.includes(grid[row + 1][col])) {
      moves.push([row + 1, col]);
    }
    if (validMoves.east.includes(grid[row][col + 1])) {
      moves.push([row, col + 1]);
    }
  } else if (currentPipe === "L") {
    if (validMoves.north.includes(grid[row - 1][col])) {
      moves.push([row - 1, col]);
    }
    if (validMoves.east.includes(grid[row][col + 1])) {
      moves.push([row, col + 1]);
    }
  } else if (currentPipe === "7") {
    if (validMoves.south.includes(grid[row + 1][col])) {
      moves.push([row + 1, col]);
    }
    if (validMoves.west.includes(grid[row][col - 1])) {
      moves.push([row, col - 1]);
    }
  } else if (currentPipe === "J") {
    if (validMoves.north.includes(grid[row - 1][col])) {
      moves.push([row - 1, col]);
    }
    if (validMoves.west.includes(grid[row][col - 1])) {
      moves.push([row, col - 1]);
    }
  }
  return moves;
};

const seenLocations = new Set();
seenLocations.add(startLocation.toString());
let currentLocation = getValidStartMoves(...startLocation)[0];
let moves = getValidMoves(...currentLocation).filter(
  (x) => !seenLocations.has(x)
);

while (moves.length > 0) {
  seenLocations.add(currentLocation.toString());
  currentLocation = moves[0];
  moves = getValidMoves(...currentLocation).filter(
    (x) => !seenLocations.has(x.toString())
  );
}

console.log((seenLocations.size + 1) / 2);
