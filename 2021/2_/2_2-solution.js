// Use FS to read csv file containing input data
const fs = require("fs")

// Read input file and parse into array of directions
// course: [[bearing, distance], ...]
const course = fs.readFileSync("input.csv", "utf-8")
                .split("\n")
                .map(v => {
                  let parts = v.split(" ")
                  return [parts[0], parseInt(parts[1])]
                })

// Follow course to get final position
// position: [horizontal, depth, aim]
let position = [0, 0, 0]
course.forEach(dir => {
  switch (dir[0]) {
    case "forward":
      position[0] += dir[1]
      position[1] += position[2] * dir[1]
      break;
    case "down":
      position[2] += dir[1]
      break;
    case "up":
      position[2] -= dir[1]
      break;
  }
})
console.log(position[0] * position[1])