
// Function to filer array of binary numbers and return those
// that have the most/least common bit at the bitPosition
function filterNumbers(binNums, bitPosition, mostCommon) {
  const commonTally = binNums.reduce((tally, binNum) => {
    // Parse bit to boolean
    let bitBool = Boolean(parseInt(binNum[bitPosition]))
    return tally +=  bitBool ? 1 : -1
  }, 0)

  // Get most or least common bit from commonTally based on mostCommon flag
  // - true: get most common
  // - false: get least common
  let targetBit = mostCommon ?
    commonTally >= 0 ? "1" : "0" :
    commonTally >= 0 ? "0" : "1"

  // Return number with commonBit in bitPosition
  return binNums.filter((binNum) => binNum[bitPosition] == targetBit)
}

// Use FS to read csv file containing input data
const fs = require("fs")

// Read input file and parse into array of strings
const input = fs.readFileSync("input.csv", "utf-8")
                .split("\n")

// Get oxygen generator rating
let o2Rating = input
let bitPosition = 0
while (o2Rating.length > 1) {
  o2Rating = filterNumbers(o2Rating, bitPosition, true)
  bitPosition++
}

// Get CO2 scrubber rating
let co2Rating = input
bitPosition = 0
while (co2Rating.length > 1) {
  co2Rating = filterNumbers(co2Rating, bitPosition, false)
  bitPosition++
}

// Get life support rating: o2Rating * co2Rating
const lifeSupRating = parseInt(o2Rating[0], 2) * parseInt(co2Rating[0], 2)

console.log(lifeSupRating)