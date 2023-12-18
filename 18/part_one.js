const fs = require("fs");

const instructions = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => {
    let [dir, dist, color] = line.split(" ");
    return [dir, +dist, color.substring(2, color.length - 1)];
  });

const outerCoordinates = (instructions) => {
  const coordinates = [];
  let x = 0,
    y = 0;
  coordinates.push([y, x]);
  instructions.forEach((n) => {
    let [dir, dist] = n;
    for (let i = 0; i < dist; i++) {
      if (dir === "R") x++;
      else if (dir === "L") x--;
      else if (dir === "U") y--;
      else if (dir === "D") y++;
      coordinates.push([y, x]);
    }
  });
  let hashed = new Set(coordinates.map(JSON.stringify));
  return [coordinates, hashed];
};

const floodFill = (hashedCoords, startY, startX) => {
  const queue = [];
  const visited = new Set();
  queue.push([startY, startX]);
  while (queue.length > 0) {
    let [y, x] = queue.shift();
    let key = JSON.stringify([y, x]);
    if (visited.has(key)) continue;
    if (hashedCoords.has(key)) continue;
    visited.add(key);
    queue.push([y + 1, x]);
    queue.push([y - 1, x]);
    queue.push([y, x + 1]);
    queue.push([y, x - 1]);
  }
  return visited.size;
};

let [coords, coordsSet] = outerCoordinates(instructions);
let floodCount = floodFill(coordsSet, 1, 1);
console.log(coordsSet.size + floodCount);
