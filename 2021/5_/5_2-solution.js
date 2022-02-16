// Use FS to read csv file containing input data
const fs = require("fs")

// Read input file and parse into array of strings
const input = fs.readFileSync("input.csv", "utf-8")
                .split("\n")

// Parse input to get coordinates of vent lines
// input format: x1,y1 -> x2,y2
// ventCorrds format: [ [ [x1,y1], [x2,y2] ], .. ]
const ventCoords =
  input.map(row => {
    return row.split(" -> ")
      .map(coords => {
        return coords.split(',').map(coord => parseInt(coord))
      })
  })

// Get horizontal and vertical lines
// aslo get the max coords for the serched area
const { horCoords, vertCoords, diagCoords, maxCoords } =
  parseVentCoords(ventCoords)

// Get 2D map of surface, including vents
const map = mapVentLines(horCoords, vertCoords, diagCoords, maxCoords)
const points = map.flat()

let overlappingLines = points.filter(p => p >= 2).length

console.log(overlappingLines)

// ============== HEPLER FUNCTIONS =============
// Function to filter horizontal and vertical lines from ventCoords
// Also save max X and Y coords
function parseVentCoords(vc) {
  const horCoords = []
  const vertCoords = []
  const diagCoords = []
  const maxCoords = [0,0]

  let points = 0
  vc.forEach(line => {
    const sameX = line[0][0] == line[1][0]
    const sameY = line[0][1] == line[1][1]
    if (sameX & sameY) points += 1
    // Save horizontal lines; those with the same y value
    else if (sameY) horCoords.push(line)
    // Save vertical lines; those with the same x value
    else if (sameX) vertCoords.push(line)
    else diagCoords.push(line)

    // Check for max X or Y and save
    if (line[0][0] > maxCoords[0]) maxCoords[0] = line[0][0]
    else if (line[1][0] > maxCoords[0]) maxCoords[0] = line[1][0]
    if (line[0][1] > maxCoords[1]) maxCoords[1] = line[0][1]
    else if (line[1][1] > maxCoords[1]) maxCoords[1] = line[1][1]
  })


  return {
    horCoords,
    vertCoords,
    diagCoords,
    maxCoords
  }
}

// Function to prepare 2D map of vents where y is firsy D and x is second D
function mapVentLines(horCoords, vertCoords, diagCoords, mapLimits) {
  const ventMap = 
    new Array(mapLimits[1] + 1)
      .fill(0)
      .map(a => new Array(mapLimits[0] + 1).fill(0))

  horCoords.forEach(line => {
    const y = line[0][1]
    const xRange = [line[0][0], line[1][0]].sort((a,b) => a - b)
    
    // Generally, progress along x range on ventMap
    for (let x = xRange[0]; x <= xRange[1]; x++) {
      ventMap[y][x] += 1
    }
  })
  vertCoords.forEach(line => {
    const x = line[0][0]
    const yRange = [line[0][1], line[1][1]].sort((a,b) => a - b)

    // Generally, progress along y range on ventMap
    for (let y = yRange[0]; y <= yRange[1]; y++) {
      ventMap[y][x] += 1
    }
  })
  diagCoords.forEach(line => {
    // Get gradient (+/- 1) to x and y values for looping
    let xGrad = line[0][0] > line[1][0]  ? -1 : +1
    let yGrad = line[0][1] > line[1][1]  ? -1 : +1

    // mark ventMap following gradient to get vent coords
    let [ x, y ]  = line[0]
    do {
      // Increment vent count
      ventMap[y][x] += 1
      // Follow gradient to next x, y coords
      x += xGrad
      y += yGrad
    }
    // End loop when x,y coords match line[1] ie end of the line
    while (x != line[1][0] + xGrad && y != line[1][1] + yGrad)
  })

  return ventMap
}

// Function to draw out map in console
// Zoom out/Use a smaller font to get the rows to line up properly
function drawMap(twoD_Map) {
  console.log("\n")

  console.log("MAP")

  twoD_Map.forEach(row => {
    let r = ""
    row.forEach(point => {
      r += point == 0 ? '.' : point
    })
    console.log(r)
  })
}