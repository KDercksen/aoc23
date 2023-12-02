const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

let gameIdSum = 0;

lineReader.on("line", (line) => {
  const id = parseInt(line.match(/Game (\d+)/)[1]);
  const games = line.split(":")[1].split(";");
  let correct = true;
  for (let game of games) {
    const counts = game.split(",");
    for (let count of counts) {
      let c = count.trim().split(" ");
      if (c[1] === "red" && parseInt(c[0]) > 12) correct = false;
      else if (c[1] === "green" && parseInt(c[0]) > 13) correct = false;
      else if (c[1] === "blue" && parseInt(c[0]) > 14) correct = false;
    }
  }
  gameIdSum += correct ? id : 0;
});

lineReader.on("close", () => {
  console.log(gameIdSum);
});
