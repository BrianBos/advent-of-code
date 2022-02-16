// Use FS to read csv file containing input data
const fs = require("fs")

// Get ages of existing fish from input
const fishCycleDays =
  fs.readFileSync("input.csv", "utf-8")
    .split(",")
    .map(valueStr => parseInt(valueStr))

// Maintain array of existing fish as reproduction delay in days
let fish = Object.assign([], fishCycleDays)

// Run loop to simulate days, while ticking down fish reproduction delay
let days = 80
for (let i = 1; i <= days; i++) {
  let newFish = []

  // Loop through existing fish, decrementing their reproduction delay
  // and adding newFish when delay is at 0 
  for (let j = 0, n = fish.length; j < n; j++) {
    if (fish[j] == 0) {
      fish[j] = 6
      newFish.push(8)
    }
    else fish[j] -= 1
  }

  // Add new fish to array of existing fish
  newFish.forEach(age => fish.push(age))
}

console.log(fish.length)