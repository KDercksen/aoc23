const fs = require("fs");
const readline = require("readline");

const lineReader = readline.createInterface({
  input: fs.createReadStream("input.txt"),
});

const extrapolate = (sequence) => {
  const history = [[...sequence]];
  let current = [...sequence];
  while (!current.every((x) => x === 0)) {
    const diff = current.reduce((acc, x, i) => {
      if (i === 0) {
        return acc;
      }
      acc.push(x - current[i - 1]);
      return acc;
    }, []);
    history.push(diff);
    current = diff;
  }
  let extrapolations = history.reverse().reduce((acc, x, i) => {
    if (i === 0) {
      acc.push(0);
      return acc;
    } else if (i === history.length - 1) {
      return acc;
    } else {
      acc.push(x[x.length - 1] + acc[i - 1]);
      return acc;
    }
  }, []);
  return (
    sequence[sequence.length - 1] + extrapolations[extrapolations.length - 1]
  );
};

const values = [];
lineReader.on("line", (line) => {
  const sequence = line
    .trim()
    .split(/\s+/)
    .map((x) => +x);
  const next = extrapolate(sequence.reverse());
  values.push(next);
});

lineReader.on("close", () => {
  console.log(values.reduce((a, b) => a + b, 0));
});
