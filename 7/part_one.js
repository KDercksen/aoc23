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
  if (equals(counts, [5])) {
    return "five_of_a_kind";
  } else if (equals(counts, [1, 4])) {
    return "four_of_a_kind";
  } else if (equals(counts, [2, 3])) {
    return "full_house";
  } else if (equals(counts, [1, 1, 3])) {
    return "three_of_a_kind";
  } else if (equals(counts, [1, 2, 2])) {
    return "two_pair";
  } else if (equals(counts, [1, 1, 1, 2])) {
    return "one_pair";
  } else if (equals(counts, [1, 1, 1, 1, 1])) {
    return "high_card";
  }
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
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
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
