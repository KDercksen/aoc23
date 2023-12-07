const fs = require("fs");

const data = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((x) => x.split(/\s+/));

const equals = (a, b) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

const getHandType = (hand) => {
  let counts = hand.split("").reduce((acc, val) => {
    acc[val] = acc[val] ? acc[val] + 1 : 1;
    return acc;
  }, {});
  counts = Object.values(counts).sort();
  let numJ = hand.split("J").length - 1;
  let type;
  if (equals(counts, [5])) {
    type = "five_of_a_kind";
  } else if (equals(counts, [1, 4])) {
    type = numJ > 0 ? "five_of_a_kind" : "four_of_a_kind";
  } else if (equals(counts, [2, 3])) {
    type = numJ > 0 ? "five_of_a_kind" : "full_house";
  } else if (equals(counts, [1, 1, 3])) {
    type = numJ > 0 ? "four_of_a_kind" : "three_of_a_kind";
  } else if (equals(counts, [1, 2, 2])) {
    type = "two_pair";
    if (numJ === 1) type = "full_house";
    if (numJ === 2) type = "four_of_a_kind";
  } else if (equals(counts, [1, 1, 1, 2])) {
    type = numJ > 0 ? "three_of_a_kind" : "one_pair";
  } else if (equals(counts, [1, 1, 1, 1, 1])) {
    type = numJ > 0 ? "one_pair" : "high_card";
  }

  return type;
};

const typeMap = {
  high_card: 1,
  one_pair: 2,
  two_pair: 3,
  three_of_a_kind: 4,
  full_house: 5,
  four_of_a_kind: 6,
  five_of_a_kind: 7,
};
const cardMap = {
  J: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const sortByHigherCard = (a, b, i) => {
  if (cardMap[a[0][i]] === cardMap[b[0][i]]) {
    return sortByHigherCard(a, b, i + 1);
  } else if (cardMap[a[0][i]] > cardMap[b[0][i]]) {
    return 1;
  } else {
    return -1;
  }
};

const sortHands = (a, b) => {
  let aType = getHandType(a[0]),
    bType = getHandType(b[0]);
  if (typeMap[aType] === typeMap[bType]) {
    return sortByHigherCard(a, b, 0);
  } else if (typeMap[aType] > typeMap[bType]) {
    return 1;
  } else {
    return -1;
  }
};

const winnings = data
  .sort(sortHands)
  .map((x) => +x[1])
  .reduce((acc, val, i) => {
    return acc + (i + 1) * val;
  }, 0);

console.log(winnings);
