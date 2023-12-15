const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const hash = (s) => {
  return s.split("").reduce((currentValue, c) => {
    currentValue += c.charCodeAt(0);
    currentValue = (currentValue << 4) + currentValue;
    return currentValue % 256;
  }, 0);
};

const hashes = input.split(",").map(hash);

console.log(hashes.reduce((a, b) => a + b, 0));
