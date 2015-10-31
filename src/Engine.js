/**
 * Create by TRABELSI Nadir on 19/10/15
**/

function Exception() {
    this.name = "Exception";
}

var Engine =function () {
    var board, n_marbles, current_player, win, drawn;
    this.new_game = function (player) {
        var line;
        board = new Array(6);
        for (line = 0; line < 6; line++) {
            board[line] = new Array(6);
        }
        n_marbles = 0;
        current_player = player;
        win = false;
    };

    // Getters
    this.get_board = function (line, column) {
        return board[line][column];
    };

    this.get_nb_marbles = function () {
        return n_marbles;
    };

    this.get_current_player = function () {
        return current_player;
    };

    this.get_win = function () {
        return win;
    };

    this.get_drawn = function () {
        return drawn;
    };

    this.play_stroke = function (stroke) {
        var column = stroke.charCodeAt(0) - 97, line = stroke.charCodeAt(1) - 49;

        if (column <= 5 && column >= 0 && line >= 0 &&
            line <= 5 && (board[line][column] === undefined)) {
            board[line][column] = current_player;
            n_marbles++;
        } else {
            throw new Exception();
        }
    };

    this.rotation_array = function (tempory_array, tempory_array2, direction) {
        var variable;
        for (variable = 0; variable < 3; variable++) {
            if (direction) {
                tempory_array2[variable][0] = tempory_array[2][variable];
                tempory_array2[variable][1] = tempory_array[1][variable];
                tempory_array2[variable][2] = tempory_array[0][variable];
            } else {
                tempory_array2[variable][0] = tempory_array[0][2 - variable];
                tempory_array2[variable][1] = tempory_array[1][2 - variable];
                tempory_array2[variable][2] = tempory_array[2][2 - variable];
            }
        }
    };

    this.copy_array = function (array1, array2, increment1, increment2) {
        var line, column;
        for (line = 0; line < 3; line++) {
            for (column = 0; column < 3; column++) {
                array1[line + increment1][column + increment2] = array2[line][column];
            }
        }
    };

    this.rotation = function (vertical, horizontal, direction) {
        var tempory_array = new Array(3), tempory_array2 = new Array(3), line, column;

        for (line = 0; line < 3; line++) {
            tempory_array[line] = new Array(3);
            tempory_array2[line] = new Array(3);
            for (column = 0; column < 3; column++) {
                tempory_array[line][column] =
                    board[line + (vertical * 3)][column + (horizontal * 3)];
            }
        }
        this.rotation_array(tempory_array, tempory_array2, direction);
        this.copy_array(board, tempory_array2, (vertical * 3), (horizontal * 3));
        this.change_player();
    };

    this.change_player = function () {
        if (current_player === "white") {
            current_player = "black";
        } else {
            current_player = "white";
        }
    };
};