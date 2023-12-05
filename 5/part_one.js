const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").split("\n\n");
let seeds = [...data[0].matchAll(/(\d+)/g)].map((x) => +x[0]);

const isNumInRange = (num, range) => {
  return num >= range[1] && num < range[1] + range[2];
};
const convertNum = (num, ranges) => {
  for (let r of ranges) {
    if (isNumInRange(num, r)) {
      return num - r[1] + r[0];
    }
  } // if not found, return original
  return num;
};

// Map over the different maps and convert numbers each time
const extractMap = (dataPart) => {
  return [...dataPart.matchAll(/(\d+\s\d+\s\d+)/g)].map((x) =>
    x[0].split(" ").map((x) => +x)
  );
};

let convertedSeeds = data.slice(1).reduce((seeds, numMap) => {
  console.log(seeds);
  let parsedNumMap = extractMap(numMap);
  return seeds.map((x) => convertNum(x, parsedNumMap));
}, seeds);

console.log(Math.min(...convertedSeeds));
