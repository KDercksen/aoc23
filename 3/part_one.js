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

  let s = [...line.matchAll(/[^0-9\.]/g)];
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

const findPartNumbers = (numbers, symbols) => {
  let partNumbers = [];
  for (num of numbers) {
    let coords = generateSymbolIndexes(...num.slice(1));
    if (
      coords.some((x) => symbols.some((s) => s[0] === x[0] && s[1] === x[1]))
    ) {
      partNumbers.push(num[0]);
    }
  }
  return partNumbers;
};

lineReader.on("close", () => {
  let nums = findPartNumbers(numbers, symbols);
  let sum = nums.reduce((a, b) => a + b, 0);
  console.log(sum);
});
