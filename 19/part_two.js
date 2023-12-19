const fs = require("fs");

let [workflows] = fs.readFileSync("input.txt", "utf8").split("\n\n");

let workflowMap = {};
workflows = workflows.split("\n").map((workflow) => {
  let [name, rules] = workflow.split("{");
  let separateRules = rules.substring(0, rules.length - 1).split(",");
  let ruleList = [];
  let finalRule;
  separateRules.forEach((rule) => {
    let tmp = rule.split(":");
    if (tmp.length > 1) {
      let [condition, destination] = tmp;
      let aspect = condition.charAt(0);
      let op = condition.charAt(1);
      let val = +condition.substring(2);
      ruleList.push([aspect, op, val, destination]);
    } else {
      finalRule = tmp[0];
    }
  });
  workflowMap[name] = [ruleList, finalRule];
});

const splitRange = (item, rule) => {
  let [aspect, op, val] = rule;
  let [min, max] = item[aspect];
  if (op === "<") {
    if (max < val) return item, null;
    else if (min < val) {
      let part1 = { ...item, [aspect]: [min, val - 1] };
      let part2 = { ...item, [aspect]: [val, max] };
      return [part1, part2];
    } else {
      return null, item;
    }
  } else {
    if (min > val) return item, null;
    else if (max > val) {
      let part1 = { ...item, [aspect]: [min, val] };
      let part2 = { ...item, [aspect]: [val + 1, max] };
      return [part2, part1];
    } else {
      return null, item;
    }
  }
};

stack = [[{ x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }, "in", 0]];
acceptedGroups = [];

while (stack.length > 0) {
  let [item, workflow, ruleIndex] = stack.pop();
  let rule = workflowMap[workflow][0][ruleIndex];
  let [passing, failing] = splitRange(item, rule);
  if (passing !== null) {
    let destination = rule[3]; // passing is always for a proper conditional rule
    if (destination === "A" || destination === "R") {
      if (destination === "A") acceptedGroups.push(passing);
    } else {
      stack.push([passing, destination, 0]);
    }
  }
  if (failing !== null) {
    let newWorkflow, newRuleIndex;
    if (ruleIndex + 1 === workflowMap[workflow][0].length) {
      newWorkflow = workflowMap[workflow][1];
      newRuleIndex = 0;
    } else {
      newWorkflow = workflow;
      newRuleIndex = ruleIndex + 1;
    }
    if (newWorkflow === "A" || newWorkflow === "R") {
      if (newWorkflow === "A") acceptedGroups.push(failing);
    } else {
      stack.push([failing, newWorkflow, newRuleIndex]);
    }
  }
}

const partCount = (item) => {
  return Object.values(item)
    .map((x) => x[1] - x[0] + 1)
    .reduce((a, b) => a * b);
};

let total = acceptedGroups.reduce((acc, x) => acc + partCount(x), 0);
console.log(total);
