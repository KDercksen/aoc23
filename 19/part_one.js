const fs = require("fs");

let [workflows, items] = fs.readFileSync("input.txt", "utf8").split("\n\n");

let workflowMap = {};
workflows = workflows.split("\n").map((workflow) => {
  let [name, rules] = workflow.split("{");
  let separateRules = rules.substring(0, rules.length - 1).split(",");
  let ruleList = [];
  separateRules.forEach((rule) => {
    let tmp = rule.split(":");
    if (tmp.length > 1) {
      let [condition, destination] = tmp;
      let aspect = condition.charAt(0);
      let op = condition.charAt(1);
      let val = +condition.substring(2);
      ruleList.push([aspect, op, val, destination]);
    } else {
      if (tmp[0] === "R" || tmp[0] === "A") ruleList.push(["final", tmp[0]]);
      else ruleList.push(["next", tmp[0]]);
    }
  });
  workflowMap[name] = ruleList;
});

items = items.split("\n").map((item) => {
  let vals = item.substring(1, item.length - 1).split(",");
  let obj = {};
  for (let v of vals) {
    let [key, val] = v.split("=");
    obj[key] = +val;
  }
  return obj;
});

const evaluatePart = (item, rule) => {
  let [aspect, op, val, dest] = rule;
  let returnVal;
  switch (dest) {
    case "A":
      returnVal = "accept";
      break;
    case "R":
      returnVal = "reject";
      break;
    default:
      returnVal = dest;
      break;
  }
  if (op === "<") {
    return item[aspect] < val ? returnVal : null;
  } else if (op === ">") {
    return item[aspect] > val ? returnVal : null;
  }
  console.log("wtf weird rule?", item, rule);
  return undefined;
};

const evaluateRule = (item, ruleName) => {
  // return either the next rule, accept or reject
  let rules = workflowMap[ruleName];
  for (let r of rules) {
    if (r[0] === "final") return r[1] === "A" ? "accept" : "reject";
    else if (r[0] === "next") return evaluateRule(item, r[1]);
    else {
      let result = evaluatePart(item, r);
      if (result === "accept" || result === "reject") return result;
      else if (result === null) continue;
      else if (result === undefined) console.log("wtf???", result);
      else {
        return evaluateRule(item, result);
      }
    }
  }
};

console.log(
  items.reduce((acc, item) => {
    let result = evaluateRule(item, "in");
    if (result === "accept")
      return acc + Object.values(item).reduce((a, b) => a + b, 0);
    else return acc;
  }, 0)
);
