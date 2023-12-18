const fs = require("fs");

const instructions = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => {
    let [, , color] = line.split(" ");
    let dist = parseInt(color.substring(2, color.length - 2), 16);
    let dir = ["R", "D", "L", "U"][color[color.length - 2]];
    return [dir, dist];
  });

const outerCoordinates = (instructions) => {
  const coordinates = [];
  let x = 0,
    y = 0;
  let perimeter = 0;
  coordinates.push([y, x]);
  instructions.forEach((n) => {
    let [dir, dist] = n;
    perimeter += dist;
    if (dir === "R") x += dist;
    else if (dir === "L") x -= dist;
    else if (dir === "U") y -= dist;
    else if (dir === "D") y += dist;
    coordinates.push([y, x]);
  });
  return [coordinates, perimeter];
};

const volume = (coordinates, perimeter) => {
  let area = 0;
  for (let i = 0; i < coordinates.length; i++) {
    // Shoelace formula
    area +=
      ((coordinates[i][0] + coordinates[(i + 1) % coordinates.length][0]) *
        (coordinates[i][1] - coordinates[(i + 1) % coordinates.length][1])) /
      2;
  }

  // Pick's theorem
  return area + perimeter / 2 + 1;
};

let [coords, perimeter] = outerCoordinates(instructions);
console.log(volume(coords, perimeter));
