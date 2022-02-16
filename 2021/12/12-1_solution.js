// Use FS to read csv file containing input data
const fs = require("fs")

// Get ages of existing fish from input
const caveConnections =
  fs.readFileSync("input.csv", "utf-8")
    .split("\n")

// Parse cave paths and prepare lists of caves with paths
const caves = {}
function prepCave(name, connections = []) {
  const uppercaseRegex = /[A-Z\s]+/
  return {
    largeCave: uppercaseRegex.test(name),
    connections: connections
  }
}
caveConnections.forEach(connection => {
  let caveNames = connection.split('-')

  // Update or add cave1 to list of caves
  let cave1 = caves[caveNames[0]]
  if (cave1) cave1.connections.push(caveNames[1])
  else caves[caveNames[0]] = prepCave(caveNames[0], [caveNames[1]])

  // Update or add cave2 to list of caves
  let cave2 = caves[caveNames[1]]
  if (cave2) cave2.connections.push(caveNames[0])
  else caves[caveNames[1]] = prepCave(caveNames[1], [caveNames[0]])
})

// Prepare paths starting from "start" to "end" caves
caves["start"].connections.forEach(cave => {
  caves[cave]
})

console.log(caves)
