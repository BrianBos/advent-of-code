// Use FS to read csv file containing input data
const fs = require("fs")

// Get ages of existing fish from input
const fishCycleDays =
  fs.readFileSync("input.csv", "utf-8")
    .split(",")
    .map(valueStr => parseInt(valueStr))

// Maintain array of existing fish as reproduction delay in days
// Optimisation: Split into 
let fish = [Object.assign([], fishCycleDays)]

// Run loop to simulate days, while ticking down fish reproduction delay
let days = 256
for (let i = 1; i <= days; i++) {
  let newFish = []

  // Loop through existing fish, decrementing their reproduction delay
  // and adding newFish when delay is at 0 
  fish.forEach((f, index) => {
    for (let j = 0, n = f.length; j < n; j++) {
      if (fish[index][j] == 0) {
        fish[index][j] = 6
        newFish.push(8)
      }
      else fish[index][j] -= 1
    }
  })

  // Maintain a soft max of 10,000,000 per item in nested array of fish
  let lastIndex = fish.length - 1
  if (fish[lastIndex].length > 10000000) fish.push(newFish)
  else newFish.forEach(age => fish[lastIndex].push(age))
}

console.log(fish.flat())