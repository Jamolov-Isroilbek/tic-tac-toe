let gameActive = true;
let currentPlayer = 'Player 1';
const statusText = document.getElementById('status-text');
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

function handleCellClick(e) {
    if (!gameActive) return;

    const cell = e.target;
    const isCellFilled = cell.textContent.trim() !== '';

    if (!isCellFilled) {
        if (currentPlayer === 'Player 1') {
            cell.textContent = 'X';
        } else {
            cell.textContent = 'O';
        }
        statusText.textContent = `${currentPlayer}'s turn`;
    }

    if (isWinner()) {
        statusText.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (isDraw()) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
        statusText.textContent = `${currentPlayer}'s turn`;
    }
}

document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    currentPlayer = 'Player 1';
    statusText.textContent = `${currentPlayer}'s turn`;
    gameActive = true;
}

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function isWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    return [...cells].every(cell => cell.textContent) && !isWinner();
}