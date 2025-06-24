const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

const boardElement = document.getElementById('game-board');
const statusElement = document.getElementById('status');

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = index;
    cell.textContent = value;
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  });
  updateStatus();
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusElement.textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (board.every(cell => cell)) {
    statusElement.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

function updateStatus() {
  statusElement.textContent = `Current Player: ${currentPlayer}`;
}

function resetGame() {
  for (let i = 0; i < board.length; i++) board[i] = null;
  currentPlayer = 'X';
  gameOver = false;
  createBoard();
}

createBoard();
