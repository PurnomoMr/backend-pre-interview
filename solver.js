'use strict';

function Solver() {
  var puzzle_grid = [];
  
  /*
  * Recursively check all possible numbers for a given cell until
  * the puzzle is solved.
  * @params index Integer
  */
  function get_puzzle_data(index) {
    if (index >= puzzle_grid.length) {
      return true;
    } else if (puzzle_grid[index] != 0) {
      return get_puzzle_data(index + 1);
    }

    for (var key = 1; key <= 9; key++) {
      if (check_puzzle_data(key, Math.floor(index / 9), index % 9)) {
        puzzle_grid[index] = key;
        if (get_puzzle_data(index + 1)) {
          return true;
        }
      }
    }

    puzzle_grid[index] = 0;
    return false;
  }

  /*
  * Validation puzzle data by Sudoku rules
  */
 function check_puzzle_data(num, row, col) {
    for (var key = 0; key < 9; key++) {
      var a_key = ((Math.floor(row / 3) * 3) + Math.floor(key / 3)) * 9 + (Math.floor(col / 3) * 3) + (key % 3);
      if (num == puzzle_grid[(row * 9) + key] ||
        num == puzzle_grid[col + (key * 9)] ||
        num == puzzle_grid[a_key]) {
        return false;
      }
    }
    return true;
  }

  /*
  * Start solving sudoku
  */
  this.solve = function (puzzle) {
    puzzle_grid = puzzle.split('').map(function (x) { return isNaN(x) ? 0 : +x });

    if (puzzle.length !== 81) return 'Puzzle is not valid.'
    return !get_puzzle_data(0) ? 'No solution found.' : puzzle_grid.join('');
  }
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Solver;
  }
  exports.Solver = Solver;
} else {
  window.Solver = Solver;
}