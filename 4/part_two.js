const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

let weights = Array(214).fill(1);
let currentLine = 0;

lineReader.on("line", (line) => {
  const [winning, mine] = line
    .split(":")[1]
    .split("|")
    .map((x) =>
      x
        .trim()
        .split(/\s+/)
        .map((y) => +y)
    );
  const winningCount = mine.filter((x) => winning.includes(x)).length;
  for (let i = currentLine + 1; i < currentLine + 1 + winningCount; i++) {
    weights[i] += weights[currentLine];
  }
  currentLine++;
});

lineReader.on("close", () => {
  const sum = weights.reduce((a, b) => a + b, 0);
  console.log(sum);
});
