// Use FS to read csv file containing input data
const fs = require("fs")

// Get ages of existing fish from input
const crabPositions =
  fs.readFileSync("input.csv", "utf-8")
    .split(",")
    .map(valueStr => parseInt(valueStr))

// Get minimum and maximum (limits) of crab positions
let sorted = crabPositions.sort((a, b) => a - b)
const positionLimits = [
  sorted[0],
  sorted[crabPositions.length - 1]
]

// Get fuel costs to get to all positions within limits
let fuelCosts = []
for(let i = 0, n = positionLimits[1]; i <= n; i++) {
  fuelCosts.push(
    crabPositions.reduce(
      (sum, pos) => sum + Math.abs(pos - i),
      0
    )
  )
}

// Get least fuelCosts by sorting them n umerically and selecting the first
const leastFuelCost = fuelCosts.sort((a,b) => a - b)[0]

console.log(leastFuelCost)
