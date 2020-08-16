const SudokuSolver = require('./solver.js');
let sanitize_data = []
// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs')
    , filename = process.argv[2];
    fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: Let\'s start the game - ' + filename);
    /** 
     * split data from the file 
     * and set variable before execute the game
     * */ 
    sanitize_data = data.split("\n")
    let key = 1
    let remove_grid = 0
    let grid_key = 9
    let value = ""
    var solver = new SudokuSolver();
    let sum_of_first_three = 0
    let sum = 0

    /**
     * Looping and validation by Sudoku Rules
     * print when the puzzle already set
     */
    for(let index = 0; sanitize_data.length >= index; index++ ) {
        let sanitize_grid = sanitize_data[index]
        if(remove_grid + 10 == index){
            remove_grid = remove_grid + 10
        }

        if(grid_key == remove_grid - 1) {
            console.log("================================")
            puzzles_number = key++
            console.log("result game "+ puzzles_number + " : ")
            result = solver.solve(value)
            for(let j = 0; j < result.length; j++) {
                if(j > 0 & j % 9 == 0) {
                    console.log(result.substring(j - 9, j))
                }

                if(j < 3) {
                    sum_of_first_three += parseInt(result[j])
                }
                sum += parseInt(result[j])
            }
            console.log("The sum of the first three numbers in the top row = " + sum_of_first_three)
            console.log("The sum of the "+ puzzles_number +" Puzzle(s) = " + sum)
            sum_of_first_three = 0
            sum = 0
            console.log("================================")
            value = ""
            grid_key += 10
        }

        console.log(sanitize_grid != undefined ? sanitize_grid : "")

        if(index >= grid_key - 8 && index <= grid_key) {
            value += sanitize_grid
        } 

    }
});