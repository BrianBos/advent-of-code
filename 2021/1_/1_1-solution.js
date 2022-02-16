// Use FS to read csv file containing input data
import fs from "fs"

// Read input file and parse into array of integers
const input = fs.readFileSync("input.csv", "utf-8")
                .split("\n")
                .map(v => parseInt(v))

// Count increments in depth values
const output = input.reduce((inc, value, index) => {
  // Skip first value
  if (index == 0) return inc

  let diff = value - input[index - 1]

  if (diff > 0) return ++inc
  else return inc
}, 0)

console.log(output)