const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

let sum = 0;

lineReader.on("line", (line) => {
  const firstDigit = line.match(/\d/)[0];
  const reverseLine = line.trim().split("").reverse().join("");
  const lastDigit = reverseLine.match(/\d/)[0];
  sum += parseInt(firstDigit + lastDigit);
});

lineReader.on("close", () => {
  console.log(sum);
});
