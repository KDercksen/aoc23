const fs = require("fs");

let [instructions, nodes] = fs.readFileSync("input.txt", "utf-8").split("\n\n");
nodes = nodes
  .split("\n")
  .map((node) => [...node.matchAll(/\w+/g)].map((m) => m[0]))
  .reduce((acc, [node, left, right]) => {
    acc[node] = { L: left, R: right };
    return acc;
  }, {});

let currentInstruction = Object.keys(nodes).filter((node) =>
  node.endsWith("A")
);

let steps = [];
for (let inst of currentInstruction) {
  let localSteps = 0;
  while (!inst.endsWith("Z")) {
    for (let char of instructions) {
      inst = nodes[inst][char];
      localSteps++;
    }
  }
  steps.push(localSteps);
}

const lcm = (a, b) => {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  return (a * b) / gcd(a, b);
};

console.log(steps.reduce(lcm));
