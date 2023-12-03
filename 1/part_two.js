const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

let sum = 0;

const numMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

lineReader.on("line", (line) => {
  // Overlapping matches... ugh
  const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
  const matches = Array.from(line.matchAll(regex), (x) => x[1]);
  console.log(line);
  console.log(matches);

  let firstDigit = matches[0];
  if (firstDigit in numMap) {
    firstDigit = numMap[firstDigit];
  }

  let lastDigit = matches[matches.length - 1];
  if (lastDigit in numMap) {
    lastDigit = numMap[lastDigit];
  }

  const value = +(firstDigit + lastDigit);
  console.log(value);
  sum += value;
});

lineReader.on("close", () => {
  console.log(sum);
});
