const fs = require("fs");

let [instructions, nodes] = fs.readFileSync("input.txt", "utf-8").split("\n\n");
nodes = nodes
  .split("\n")
  .map((node) => [...node.matchAll(/\w+/g)].map((m) => m[0]))
  .reduce((acc, [node, left, right]) => {
    acc[node] = { L: left, R: right };
    return acc;
  }, {});

let currentInstruction = "AAA";
let steps = 0;

while (currentInstruction !== "ZZZ") {
  for (let char of instructions) {
    currentInstruction = nodes[currentInstruction][char];
    steps++;
  }
}

console.log(steps);
