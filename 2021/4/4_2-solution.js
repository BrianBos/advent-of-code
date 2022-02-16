// Use FS to read csv file containing input data
const fs = require("fs")

// Read input file and parse into array of strings
const input = fs.readFileSync("input.csv", "utf-8")
                .split("\n")

const { winningNums, boards } = parseInput(input)

// Pick winner based on winning numbers
let lastWinningScore
let winningBoards = 0
for (let i = 0, n = winningNums.length; i < n; i++) {
  // Use flag to break out of above loop from within below loop
  let breakCheck = false

  let tick = `${winningNums[i]}`.length == 1 ?
              `0${winningNums[i]}: ` :
              `${winningNums[i]}: `
  if (winningNums[i] == 42) {
    boards.filter(b => !b.won).forEach(b => {
      console.log(b)
      console.log(isWinningBoard(b, winningNums[i]))
    })
    break
  }

  // Mark boards and look for winning board
  for (let j = 0, m = boards.length; j < m; j++) {
    // Skip checking boards that have already won
    if (boards[j].won) continue
    tick += "."

    // Mark board
    markBoard(boards[j], winningNums[i])

    // Check for winning board
    let winCheck = isWinningBoard(boards[j], winningNums[i])

    // If board wins,
    // - tick winningBoards
    // - flag board as won
    // - stop checking winning numbers
    if (winCheck.win) {
      boards[j].won = true
      winningBoards += 1

      if (winningBoards == boards.length) {
        lastWinningScore = winCheck.score
        breakCheck = true
        break
      }
    }
  }
  console.log(tick)
  if (breakCheck) break
}

console.log(lastWinningScore)


// ============= HELPER FUNCTIONS =============
// Function to get winning numbers and boards fom input
function parseInput() {
  const response = {
    winningNums: [],
    boards: []
  }

  // Parse winning numbers from input, first line separated by ','
  response.winningNums = input[0].split(',')

  // Parse boards from input
  // - from 3rd line arranged in a 5 X 5
  // - numbers in each row are separated by a ' '
  // - boards are separated by an empty line
  // board: [ 5x5 matrix of values, 5x5 grid of bingo marks ]
  const boards = []
  let board = {
    values: [],
    tally: new Array(5).fill(0).map(a => new Array(5).fill(0)),
    won: false
  }
  for(let i = 2, n = input.length; i < n; i++) {
    // If on an empty line, save current board and create a new one
    if (!input[i]) {
      boards.push(board)
      board = {
        values: [],
        tally: new Array(5).fill(0).map(a => new Array(5).fill(0)),
        won: false
      }
      continue
    }

    board.values.push(
      input[i].split(' ')
              .filter(value => value != '')
              .map(v => parseInt(v))
    )
  }
  response.boards = boards

  return response
}

// Function to mark winning numbers on a baords tally
// A matching winning number is marked with a '1' at the same position
function markBoard(board, winningNum) {
  board.values.forEach((row, r) => {
    row.forEach((value, c) => {
      // mark tally at same position of value is the winning number
      if (value == winningNum) board.tally[r][c] = 1
    })
  })
}

// Function to tally bingo marks on boards
function isWinningBoard(board, winningNum) {
  // Get sums of of colums and rows of board.tally
  const rowSum = board.tally.map(row => {
    row.reduce((sum, value) => sum + value, 0)
  })
  const colSum = board.tally.reduce((sums, row) => {
    row.forEach((value, index) => sums[index] += value)
    return sums
  }, Array(5).fill(0))

  // A sum of 5 in any row or column == win 
  const win = rowSum.some(sum => sum == 5) || colSum.some(sum => sum == 5)

  // Return if not a win
  if (!win) return { win: false, score: 0}

  // Calculate score for the win
  // - get the sum of marked values
  // - multiply the sum by the winning number
  const score = board.values.reduce((sum, row, r) => {
    row.forEach((value, c) => {
      // add value to sum if row is marked on board.tally
      if (!Boolean(board.tally[r][c])) sum += value
    })
    return sum
  }, 0) * winningNum

  return { win: true, score }
}
