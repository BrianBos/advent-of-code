// Use FS to read csv file containing input data
const fs = require("fs")

// Get ages of existing fish from input
const energyLevels =
  fs.readFileSync("input.csv", "utf-8")
    .split("\n")
    .map(row => row.split("").map(e => parseInt(e)))
const gridLimits = [ energyLevels[0].length - 1, energyLevels.length - 1 ]

// Run through steps to simulate flashes
const steps = 100
let flashes = 0
for(let i = 1; i <= steps; i ++) {
  // increment energy levels for all octopi
  energyLevels.forEach((row, y) => {
    row.forEach((energyLevel, x) => energyLevels[y][x] += 1)
  })

  // Repeatedly check for flashes till no octopi flashes
  while (true) {
    let hadFlashes = false

    energyLevels.forEach((row, y) => {
      row.forEach((energyLevel, x) => {
        // increment energy levels of adjacent octopi if level > 9
        if (energyLevel > 9) {
          // Increment flashes counter and reset current octopi
          energyLevels[y][x] = 0
          flashes += 1
          hadFlashes = true

          // Store checks for whether current octopus is on the border
          // To avoid errors trying to increment energy levels of adjacent
          // octopi
          const topBorder = y == 0
          const bottomBorder = y == gridLimits[1]
          const leftBorder = x == 0
          const rightBorder = x == gridLimits[0]

          // Increment adjacent octopi, except those that were reset in the 
          // current cycle ie energyLevel == 0
          // Increment top octopi
          if (!topBorder)
            if (energyLevels[y - 1][x] != 0) energyLevels[y - 1][x] += 1
          // Increment top-right octopi
          if (!topBorder && !rightBorder)
            if (energyLevels[y - 1][x + 1] != 0) energyLevels[y - 1][x + 1] += 1
          // Increment top-left octopi
          if (!topBorder && !leftBorder)
            if (energyLevels[y - 1][x - 1] != 0) energyLevels[y - 1][x - 1] += 1
          // Increment left octopi
          if (!leftBorder)
            if (energyLevels[y][x - 1] != 0) energyLevels[y][x - 1] += 1
          // Increment right octopi
          if (!rightBorder)
            if (energyLevels[y][x + 1] != 0) energyLevels[y][x + 1] += 1
          // Increment bottom octopi
          if (!bottomBorder)
            if (energyLevels[y + 1][x] != 0) energyLevels[y + 1][x] += 1
          // Increment bottom-right octopi
          if (!bottomBorder && !rightBorder)
            if (energyLevels[y + 1][x + 1] != 0) energyLevels[y + 1][x + 1] += 1
          // Increment bottom-left octopi
          if (!bottomBorder && !leftBorder)
            if (energyLevels[y + 1][x - 1] != 0) energyLevels[y + 1][x - 1] += 1
        }
      })
    })

    // Exit loop if no octopi flashed
    // otherwise continue to check if flashes caused other octopi to flash
    if (!hadFlashes) break
  }
}

console.log(flashes)

function printELevels() {
  console.log("\n")
  energyLevels.forEach(row => {
    console.log(row.join())
  })
}