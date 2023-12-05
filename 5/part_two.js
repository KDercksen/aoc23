const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8").split("\n\n");
let seeds = [...data[0].matchAll(/(\d+)/g)].map((x) => +x[0]);
seeds = seeds.reduce((acc, x, currentIndex, arr) => {
  if (currentIndex % 2 === 0) {
    acc.push([x, arr[currentIndex + 1]]);
  }
  return acc;
}, []);

// Map over the different maps and convert numbers each time
const extractMap = (dataPart) => {
  return [...dataPart.matchAll(/(\d+\s\d+\s\d+)/g)].map((x) =>
    x[0].split(" ").map((x) => +x)
  );
};

let numMaps = data.slice(1).map(extractMap);

const overlaps = (seedRange, mapRange) => {
  let seedStart = seedRange[0],
    seedEnd = seedRange[0] + seedRange[1];
  let mapStart = mapRange[1],
    mapEnd = mapRange[1] + mapRange[2];
  return (
    (seedEnd > mapStart && seedEnd <= mapEnd) ||
    (seedStart < mapEnd && seedStart >= mapStart)
  );
};

const inside = (seedRange, mapRange) => {
  return (
    seedRange[0] >= mapRange[1] &&
    seedRange[0] + seedRange[1] <= mapRange[1] + mapRange[2]
  );
};

let queue = seeds;
let next = [];
for (let map of numMaps) {
  while (queue.length > 0) {
    let seedRange = queue.pop();
    let overlap = false;
    for (let range of map) {
      if (!overlaps(seedRange, range)) {
        continue;
      }
      overlap = true;
      if (inside(seedRange, range)) {
        next.push([seedRange[0] + range[0] - range[1], seedRange[1]]);
      } else {
        // split range and add to queue
        let seedStart = seedRange[0],
          seedEnd = seedRange[0] + seedRange[1];
        let mapStart = range[1],
          mapEnd = range[1] + range[2];
        let splitPoint;
        if (seedEnd > mapStart && seedEnd <= mapEnd) {
          splitPoint = mapStart;
        } else if (seedStart < mapEnd && seedStart >= mapStart) {
          splitPoint = mapEnd;
        }
        queue.push(
          [seedStart, splitPoint - seedStart],
          [splitPoint, seedEnd - splitPoint]
        );
      }
    }
    if (!overlap) {
      next.push(seedRange);
    }
  }
  queue = next;
  next = [];
}

console.log(Math.min(...queue.map((x) => x[0])));
