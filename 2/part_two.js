const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

let powerSum = 0;

lineReader.on("line", (line) => {
  const id = +line.match(/Game (\d+)/)[1];
  const games = line.split(":")[1].split(";");
  let red = 0,
    green = 0,
    blue = 0;
  for (let game of games) {
    const counts = game.split(",");
    for (let count of counts) {
      const c = count.trim().split(" ");
      if (c[1] === "red") {
        red = Math.max(red, +c[0]);
      }
      if (c[1] === "green") {
        green = Math.max(green, +c[0]);
      }
      if (c[1] === "blue") {
        blue = Math.max(blue, +c[0]);
      }
    }
  }
  powerSum += red * green * blue;
});

lineReader.on("close", () => {
  console.log(powerSum);
});
