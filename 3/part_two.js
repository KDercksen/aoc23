const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

let numbers = [];
let symbols = [];

let index = 0;
lineReader.on("line", (line) => {
  let n = [...line.matchAll(/\d+/g)];
  numbers.push(...n.map((x) => [+x[0], x.index, x.index + x[0].length, index]));

  let s = [...line.matchAll(/\*/g)];
  symbols.push(...s.map((x) => [x.index, index]));

  index++;
});

const generateSymbolIndexes = (startX, endX, y) => {
  let upperCoords = [...Array(endX - startX + 2).keys()].map((x) => [
    x + startX - 1,
    y - 1,
  ]);
  let lowerCoords = [...Array(endX - startX + 2).keys()].map((x) => [
    x + startX - 1,
    y + 1,
  ]);
  let sideCoords = [
    [startX - 1, y],
    [endX, y],
  ];
  return [...upperCoords, ...lowerCoords, ...sideCoords];
};

const makeGearToNumberMap = (numbers, symbols) => {
  let gearToNumberMap = {};
  for (num of numbers) {
    let coords = generateSymbolIndexes(...num.slice(1));
    for (let coord of coords) {
      let scoord = JSON.stringify(coord);
      if (symbols.some((s) => s[0] === coord[0] && s[1] === coord[1])) {
        if (gearToNumberMap[scoord] !== undefined) {
          gearToNumberMap[scoord].push(num[0]);
        } else {
          gearToNumberMap[scoord] = [num[0]];
        }
      }
    }
  }
  return gearToNumberMap;
};

lineReader.on("close", () => {
  let gearToNumberMap = makeGearToNumberMap(numbers, symbols);
  let sum = 0;
  for (let key in gearToNumberMap) {
    let val = gearToNumberMap[key];
    if (val.length === 2) {
      sum += val[0] * val[1];
    }
  }
  console.log(sum);
});
