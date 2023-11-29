class PuzzleGame {
  constructor(size) {
    this.size = size;
    this.board = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.size * this.size - 1; i++) {
      this.board.push(i + 1);
    }
    this.board.push(null);
    this.shuffle();
    this.renderBoard();
  }

  shuffle() {
    for (let i = this.board.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.board[i], this.board[j]] = [this.board[j], this.board[i]];
    }
  }

  renderBoard() {
    const puzzleElement = document.getElementById('puzzle');
    puzzleElement.innerHTML = '';
    this.board.forEach(num => {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.innerText = num ? num : '';
      tile.addEventListener('click', () => this.move(num));
      puzzleElement.appendChild(tile);
    });
    puzzleElement.style.gridTemplateColumns = `repeat(${this.size}, 100px)`;
  }

  move(tile) {
    const emptyIndex = this.board.indexOf(null);
    const tileIndex = this.board.indexOf(tile);

    if (this.isValidMove(emptyIndex, tileIndex)) {
      this.board[emptyIndex] = tile;
      this.board[tileIndex] = null;
      this.renderBoard();
      if (this.isSolved()) {
        alert('Selamat!! kamu berhasill\nKeberuntunganmu sudah habis :D');
      }
    } else {
      console.log('Invalid move!');
    }
  }

  isValidMove(emptyIndex, tileIndex) {
    const rowDiff = Math.abs(Math.floor(emptyIndex / this.size) - Math.floor(tileIndex / this.size));
    const colDiff = Math.abs((emptyIndex % this.size) - (tileIndex % this.size));
    const isAdjacent = (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    return isAdjacent;
  }

  isSolved() {
    for (let i = 0; i < this.size * this.size - 1; i++) {
      if (this.board[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }
}

// Inisialisasi game dengan ukuran 3x3 setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  const game = new PuzzleGame(3);
});
