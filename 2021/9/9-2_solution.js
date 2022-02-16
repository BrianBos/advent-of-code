// Use FS to read csv file containing input data
const fs = require("fs")

// Get ages of existing fish from input
const heightMap =
  fs.readFileSync("input.csv", "utf-8")
    .split("\n")
    .map(s => s.split('').map(strInt => parseInt(strInt)) )
const mapLimits = [ heightMap[0].length - 1, heightMap.length - 1 ]

// Get risk levels
let riskLevel = 0
heightMap.forEach((row, y) => {
  row.forEach((height, x) => {
    let lowPoint = true

    // Get adjacent coords, keepiong in mind map boundaries
    let adjacentCoords = []
    if (y != 0) adjacentCoords.push([x, y - 1])
    if (y != mapLimits[1]) adjacentCoords.push([x, y + 1])
    if (x != 0) adjacentCoords.push([x - 1, y])
    if (x != mapLimits[0]) adjacentCoords.push([x + 1, y])
    
    // To verify lowPoint, check that current height is less than adjacent
    adjacentCoords.forEach(coords => {
      if (height >= heightMap[coords[1]][coords[0]]) lowPoint = false
    })

    // Add riskLevel if lowPoint
    if (lowPoint) riskLevel += height + 1
  })
})

console.log(riskLevel)