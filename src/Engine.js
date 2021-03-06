/**
 * Create by TRABELSI Nadir on 19/10/15
**/

function Exception() {
    this.name = "Exception, la pierre est deja presente !";
}

function Exception2() {
    this.name = "Exception, ce n'est pas votre couleur !";
}

var Engine = function () {
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

    this.play_stroke = function (stroke, color) {
        var column = stroke.charCodeAt(0) - 97, line = stroke.charCodeAt(1) - 49;

        if (column <= 5 && column >= 0 && line >= 0 &&
            line <= 5 && (board[line][column] === undefined)) {
            if (color === current_player) {
                board[line][column] = current_player;
                n_marbles++;
            } else {
                throw new Exception2();
            }
        } else {
            throw new Exception();
        }
        this.check_win();
        this.check_drawn();
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
        this.check_win();
        this.change_player();
    };

    this.change_player = function () {
        if (current_player === "white") {
            current_player = "black";
        } else {
            current_player = "white";
        }
        this.check_win();
    };


    this.check_equals = function (line, column, value) {
        if(board[line][column] === current_player) {
            return value + 1;
        }
        if (value >= 5) {
            return value;
        }
        return 0;
    };

    this.max = function (value1, value2) {
        if (value1 > value2) {
            return value1;
        }
        return value2;
    };

    this.check_lines_win = function () {
        var line;
        for (line = 0; line < 6; line++) {
            if (this.check_line_win(line) >= 5) {
                return true;
            }
        }
        return false;
    };

    this.check_line_win = function (line) {
        var column, cpt = 0;
        for (column = 0; column < 6; column++){
            cpt = this.check_equals(line, column, cpt);
        }
        return cpt;
    };

    this.check_columns_win = function () {
        var column;
        for (column = 0; column < 6; column++) {
            if (this.check_column_win(column) >= 5) {
                return true;
            }
        }
        return false;
    };

    this.check_column_win = function (column) {
        var line, cpt = 0;
        for (line = 0; line < 6; line++){
            cpt = this.check_equals(line, column, cpt);
        }
        return cpt;
    };

    this.check_diagonals_win = function () {
        var line, cpt1 = 0, cpt2 = 0, cpt3 = 0, cpt4 = 0, cpt5 = 0, cpt6 = 0;
        for (line = 0; line < 6; line++) {
            cpt1 = this.check_equals(line, line, cpt1);
            cpt2 = this.check_equals((5 - line), line, cpt2);
            if (line < 5) {
                cpt3 = this.check_equals(line, (line + 1), cpt3);
                cpt4 = this.check_equals((line + 1), line, cpt4);
                cpt5 = this.check_equals((5 - line), (line + 1), cpt5);
                cpt6 = this.check_equals((4 - line), line, cpt6);
            }
        }
        return (this.max(this.max(this.max(this.max(this.max(cpt1, cpt2), cpt3), cpt4),
            cpt5), cpt6) >= 5);
    };


    this.check_win = function () {
        win = (this.check_columns_win() ||
        this.check_lines_win() ||
        this.check_diagonals_win());
    };

    this.rotation_trad = function (text) {
        var cycle, top, left;
        cycle = (text[0] === 'c');
        if (text[1] === 't') { top = 0;
        } else { top = 1; }
        if (text[2] === 'l') { left = 0;
        } else { left = 1; }
        this.rotation(top, left, cycle);
    };

    this.play_list_of_strokes = function (string_stroke) {
        var array = string_stroke.split(new RegExp(" ;", "g")), i, stroke, rotation;
        for (i = 0; i < array.length; i++) {
            if (array[i].length === 5) {
                stroke = array[i][0].concat(array[i][1]);
                this.play_stroke(stroke, current_player);
                rotation = (array[i][2].concat(array[i][3])).concat(array[i][4]);
                this.rotation_trad(rotation);
            } else {
                stroke = array[i][0].concat(array[i][1]);
                this.play_stroke(stroke, current_player);
            }
        }
    };

    this.check_drawn = function () {
        var line, column;
        drawn = true;
        for (line = 0; line < 6; line++) {
            for (column = 0; column < 6; column++) {
                drawn = drawn && (board[line][column] !== undefined);
            }
        }
    };
};