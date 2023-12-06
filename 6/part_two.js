const fs = require("fs");

const data = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => +line.split(":")[1].replace(/\s+/g, ""));

const [time, distance] = data;

let wins = 0;
for (let speed = 0; speed < time - 1; speed++) {
  let dist = speed * (time - speed);
  wins += dist > distance ? 1 : 0;
}

console.log(wins);
