// Use FS to read csv file containing input data
const fs = require("fs")

// Read input file and parse into array of integers
const input = fs.readFileSync("input.csv", "utf-8")
                .split("\n")
                .map(v => parseInt(v))

// Group inputs into 3's
let windowSums = []
for(let i = 0, n = input.length; i < n; i++) {
  windowSums.push(
    input.slice(i, i + 3).reduce((sum, value) => sum += value, 0)
  )

  if (i == n - 3) break
}

// Count increments in window sums
const output = windowSums.reduce((inc, value, index) => {
  // Skip first value
  if (index == 0) return inc

  let diff = value - windowSums[index - 1]

  if (diff > 0) return ++inc
  else return inc
}, 0)

console.log(output)