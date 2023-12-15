const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const hash = (s) => {
  return s.split("").reduce((currentValue, c) => {
    currentValue += c.charCodeAt(0);
    currentValue = (currentValue << 4) + currentValue;
    return currentValue % 256;
  }, 0);
};

const addLens = (boxes, label, focalLength) => {
  const boxNum = hash(label);
  if (boxes[boxNum] === undefined) {
    boxes[boxNum] = [];
  }
  for (let i = 0; i < boxes[boxNum].length; i++) {
    if (boxes[boxNum][i][0] === label) {
      boxes[boxNum][i][1] = focalLength;
      return;
    }
  }
  boxes[boxNum].push([label, focalLength]);
};

const removeLens = (boxes, label) => {
  const boxNum = hash(label);
  if (boxes[boxNum] === undefined) {
    return;
  }
  for (let i = 0; i < boxes[boxNum].length; i++) {
    if (boxes[boxNum][i][0] === label) {
      boxes[boxNum].splice(i, 1);
      return;
    }
  }
};

const boxes = {};
for (let item of input.split(",")) {
  if (item.endsWith("-")) {
    removeLens(boxes, item.substring(0, item.length - 1));
  } else {
    const [label, focalLength] = item.split("=");
    addLens(boxes, ...item.split("="));
  }
}

let total = 0;
for (let [key, val] of Object.entries(boxes)) {
  val.forEach((lens, index) => {
    total += (+key + 1) * (index + 1) * lens[1];
  });
}

console.log(total);
