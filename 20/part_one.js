const fs = require("fs");

let modules = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => {
    let [name, destinations] = line.split(" -> ");
    let type = name.charAt(0);
    name = name.substring(1);
    destinations = destinations.split(", ");
    return { name: name, type: type, destinations: destinations };
  })
  .reduce((acc, cur) => {
    return { ...acc, [cur.name]: cur };
  }, {});

// populate states
Object.values(modules).forEach((m) => {
  if (m.type === "%") {
    m.state = "off";
  } else if (m.type === "&") {
    // find the names of all inputs to m
    // i.e., which modules have m as a destination
    let inputs = Object.values(modules).filter((n) =>
      n.destinations.includes(m.name)
    );
    m.state = {};
    inputs.forEach((i) => (m.state[i.name] = "low"));
  }
});

let pulseCounter = { low: 0, high: 0 };
for (let i = 0; i < 1000; i++) {
  let queue = [{ name: "roadcaster", pulse: "low", from: "button" }];
  while (queue.length > 0) {
    let current = queue.shift();
    pulseCounter[current.pulse]++;
    let mod = modules[current.name];
    if (mod === undefined) {
      continue;
    }
    if (mod.type === "b") {
      mod.destinations.forEach((d) => {
        queue.push({ name: d, pulse: current.pulse, from: current.name });
      });
    } else if (mod.type === "%") {
      if (current.pulse === "high") {
        continue;
      } else {
        mod.state = mod.state === "off" ? "on" : "off";
        mod.destinations.forEach((d) => {
          queue.push({
            name: d,
            pulse: mod.state === "on" ? "high" : "low",
            from: current.name,
          });
        });
      }
    } else if (mod.type === "&") {
      mod.state[current.from] = current.pulse;
      if (Object.values(mod.state).every((x) => x === "high")) {
        mod.destinations.forEach((d) => {
          queue.push({ name: d, pulse: "low", from: current.name });
        });
      } else {
        mod.destinations.forEach((d) => {
          queue.push({ name: d, pulse: "high", from: current.name });
        });
      }
    } else {
      console.log("wut?");
    }
  }
}

console.log(pulseCounter.low * pulseCounter.high);
