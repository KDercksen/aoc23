const fs = require("fs");

const data = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.split(" "))
  .map((row) => [row[0].split(""), row[1].split(",").map((x) => +x)])
  .map((row) => {
    let mulSprings = Array(5)
      .fill([...row[0], "?"])
      .flat();
    let mulGroups = Array(5).fill(row[1]).flat();
    return [mulSprings.slice(0, mulSprings.length - 1), mulGroups];
  });

const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let key = JSON.stringify(args);
    if (cache[key] === undefined) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
};

const isPossiblePrefix = (prefix, springs) => {
  console.log(prefix.length, springs.length);
  if (prefix.length > springs.length) {
    if (prefix.slice(springs.length).some((x) => x === "#")) {
      return false;
    }
  }
  return prefix.every((x, i) => x === springs[i] || springs[i] === "?");
};

const possibleArrangements = memoize((springs, counts) => {
  if (springs.length == 0) {
    return +(counts.length == 0);
  }
  if (counts.length == 0) {
    return springs.every((x) => x !== "#");
  }
  let result = 0;
  if (springs[0] === "." || springs[0] === "?") {
    result += possibleArrangements(springs.slice(1), counts);
  }
  if (
    "#?".split("").some((x) => x === springs[0]) &&
    counts[0] <= springs.length &&
    springs.slice(0, counts[0]).every((x) => x !== ".") &&
    (counts[0] === springs.length || springs[counts[0]] !== "#")
  ) {
    result += possibleArrangements(
      springs.slice(counts[0] + 1),
      counts.slice(1)
    );
  }
  return result;
});

console.log(
  data.reduce((acc, row) => acc + possibleArrangements(row[0], row[1]), 0)
);
