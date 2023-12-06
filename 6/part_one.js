const fs = require("fs");

const data = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) =>
    line
      .split(/\s+/)
      .slice(1)
      .map((x) => +x)
  );

const [times, distances] = data;

let winArray = [];
for (let i = 0; i < times.length; i++) {
  let wins = 0;
  let time = times[i],
    distance = distances[i];
  for (let speed = 0; speed < time - 1; speed++) {
    let dist = speed * (time - speed);
    wins += dist > distance ? 1 : 0;
  }
  winArray.push(wins);
}

console.log(winArray.reduce((a, b) => a * b, 1));
