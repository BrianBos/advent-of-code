// Use FS to read csv file containing input data
const fs = require("fs")

// Read input file and parse into array of strings
const input = fs.readFileSync("input.csv", "utf-8")
                .split("\n")

// Tally bit at each position. Add 1 if bit is 1, otherwise subtract 1
const bitCount = input[0].length
const commonsTally = input.reduce((commons, binNum) => {
  return commons.map((tally, index) => {
    // Parse bit to boolean
    let bitBool = Boolean(parseInt(binNum[index]))

    return tally += bitBool ? 1 : -1
  })
}, Array(bitCount).fill(0))

// Get gamma and epsilon rates from commonsTally
// - if number is positive, '1' was common
// - if number is negative, '0' was common
// gamma uses most common while epsilon uses least common
let [ gamma, epsilon ] = ["", ""]
commonsTally.forEach(tally => {
  gamma += tally > 0 ? "1" : "0"
  epsilon += tally > 0 ? "0" : "1"
})

// Get power consumption: gamma * epsilon
let powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2)
console.log(powerConsumption)