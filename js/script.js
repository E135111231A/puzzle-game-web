// Code yang ditempatkan di dalam script.js
const PuzzleGame = (function() {
  let size;
  let board = [];

  class PuzzleGame {
    constructor(gameSize) {
      size = gameSize;
      this.init();
    }

    init() {
      for (let i = 0; i < size * size - 1; i++) {
        board.push(i + 1);
      }
      board.push(null);
      this.shuffle();
      this.renderBoard();
    }

    shuffle() {
      for (let i = board.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [board[i], board[j]] = [board[j], board[i]];
      }
    }

    renderBoard() {
      const puzzleElement = document.getElementById('puzzle');
      puzzleElement.innerHTML = '';
      board.forEach(num => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerText = num ? num : '';
        tile.addEventListener('click', () => this.move(num));
        puzzleElement.appendChild(tile);
      });
      puzzleElement.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    }

    move(tile) {
      const emptyIndex = board.indexOf(null);
      const tileIndex = board.indexOf(tile);

      if (this.isValidMove(emptyIndex, tileIndex)) {
        board[emptyIndex] = tile;
        board[tileIndex] = null;
        this.renderBoard();
        if (this.isSolved()) {
          alert('Selamat!! kamu berhasil.\nKeberuuntungan mu sudah habis :D');
        }
      } else {
        console.log('Invalid move!');
      }
    }

    isValidMove(emptyIndex, tileIndex) {
      const rowDiff = Math.abs(Math.floor(emptyIndex / size) - Math.floor(tileIndex / size));
      const colDiff = Math.abs((emptyIndex % size) - (tileIndex % size));
      const isAdjacent = (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
      return isAdjacent;
    }

    isSolved() {
      for (let i = 0; i < size * size - 1; i++) {
        if (board[i] !== i + 1) {
          return false;
        }
      }
      return true;
    }

    // Getter untuk mendapatkan nilai size
    static getSize() {
      return size;
    }

    // Getter untuk mendapatkan nilai board
    static getBoard() {
      return board;
    }
  }

  return PuzzleGame;
})();

// Inisialisasi game dengan ukuran 3x3 setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  const game = new PuzzleGame(3);
});
