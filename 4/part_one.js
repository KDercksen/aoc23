const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

let sum = 0;
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
  sum += winningCount > 0 ? Math.pow(2, winningCount - 1) : 0;
});

lineReader.on("close", () => {
  console.log(sum);
});
