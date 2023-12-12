const fs = require("fs");

const data = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.split(" "))
  .map((row) => [row[0].split(""), row[1].split(",").map((x) => +x)]);

const arrayEquals = (a, b) => {
  if (a.length !== b.length) return false;
  return a.every((x, i) => x === b[i]);
};

const findContiguous = (springs) => {
  return springs
    .reduce((acc, spring) => {
      if (acc.length === 0) {
        acc.push([spring, 1]);
      } else if (acc[acc.length - 1][0] === spring) {
        acc[acc.length - 1][1] += 1;
      } else {
        acc.push([spring, 1]);
      }
      return acc;
    }, [])
    .filter((x) => x[0] === "#")
    .map((x) => x[1]);
};

const prune = (springs, groups) => {
  let knownUntil = springs.indexOf("?");
  if (knownUntil === -1) return false;
  let knownSprings = springs.slice(0, knownUntil);
  let knownGroups = findContiguous(knownSprings);
  if (knownGroups.length < 2) return false;
  if (knownGroups.length > groups.length) return true;
  if (
    !arrayEquals(
      knownGroups.slice(0, knownGroups.length - 1),
      groups.slice(0, knownGroups.length - 1)
    )
  )
    return true;
  return false;
};

const possibleArrangements = (springs, groups, i) => {
  if (i === springs.length) {
    let foundGroups = findContiguous(springs);
    return +arrayEquals(foundGroups, groups);
  }
  // if the current spring is not question mark, just continue
  if (springs[i] !== "?") {
    return prune(springs, groups)
      ? 0
      : possibleArrangements(springs, groups, i + 1);
  } else {
    let before = springs.slice(0, i);
    let after = springs.slice(i + 1);
    let results = [];
    for (let option of ["#", "."]) {
      results.push(
        possibleArrangements([...before, option, ...after], groups, i)
      );
    }
    return results.reduce((a, b) => a + b, 0);
  }
};

console.log(
  data.reduce((acc, row) => acc + possibleArrangements(row[0], row[1], 0), 0)
);
