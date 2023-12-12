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

const possibleArrangements = memoize((springs, groups) => {
  let first = groups[0];
  let restLength =
    groups.slice(1).reduce((a, b) => a + b, 0) + groups.length - 1;
  let count = 0;
  for (let firstPos of Array(springs.length - restLength - first + 1).keys()) {
    let prefix = (".".repeat(firstPos) + "#".repeat(first) + ".").split("");
    if (isPossiblePrefix(prefix, springs)) {
      if (groups.length === 1) {
        if (springs.slice(prefix.length).every((x) => x !== "#")) {
          count++;
        }
      } else {
        count += possibleArrangements(
          springs.slice(prefix.length),
          groups.slice(1)
        );
      }
    }
  }
  return count;
});

// console.log(
//   data.reduce((acc, row) => acc + possibleArrangements(row[0], row[1]), 0)
// );

let springs = [...Array(5).fill("?###?????????").flat()].join("").split("");
springs = springs.slice(0, springs.length - 1);
let groups = [...Array(5).fill([3, 2, 1]).flat()];
console.log(groups, springs);
console.log(possibleArrangements(springs, groups));
