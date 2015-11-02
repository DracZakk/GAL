/**
 * Create by TRABELSI Nadir on 19/10/15
 **/

// Start TP1 (tp-gal-7.pdf)

MyTestCase = TestCase("MyTestCase");
var x;
MyTestCase.prototype.test_firstStory = function() {
    x = new Engine();
};

MyTestCase.prototype.test_secondStory = function () {
    var line, column;
    x.new_game("white");
    for (line = 0; line < 6; line++) {
        for (column = 0; column < 6; column++) {
            assertTrue(x.get_board(line, column) === undefined);
        }
    }
    assertTrue(x.get_nb_marbles() === 0);
    assertTrue(x.get_current_player() === "white");
};

MyTestCase.prototype.test_thirdStory = function () {
    x.play_stroke("a1");
    assertEquals(x.get_board(0, 0), "white");
};

MyTestCase.prototype.test_fourthStory = function () {
    assertTrue(x.get_nb_marbles() === 1);
};

MyTestCase.prototype.test_fifthStory = function () {
    x.rotation(0, 0, true);
    assertEquals(x.get_board(0, 2), "white");
    assertEquals(x.get_board(0, 0), undefined);
};

MyTestCase.prototype.test_sixthStory = function () {
    assertEquals(x.get_current_player(), "black");
};

// Start TP2 (tp-gal-8.pdf)

MyTestCase.prototype.test_seventhStory = function () {
    x.play_stroke("a1");
    assertEquals(x.get_nb_marbles(), 2);
};

MyTestCase.prototype.test_eigthStory = function () {
    x.rotation(0, 0, false);
    assertEquals(x.get_nb_marbles(), 2);
    assertEquals(x.get_board(0, 0), "white");
    assertEquals(x.get_board(2, 0), "black");
    assertEquals(x.get_board(0, 2), undefined);
};

MyTestCase.prototype.test_ninthStory = function () {
    assertException(function () {
        x.play_stroke("a1");
    }, "Exception");
    assertEquals(x.get_board(0, 0), "white");
    assertEquals(x.get_board(2, 0), "black");
    assertEquals(x.get_board(0, 2), undefined);
    assertEquals(x.get_current_player(), "white");
};

MyTestCase.prototype.test_tenthStory = function () {
    x.play_stroke("b1");
    x.rotation(0, 0, true);
    x.play_stroke("a2");
    x.rotation(0, 0, false);
    x.play_stroke("c1");
    x.rotation(0, 0, true);
    x.play_stroke("a3");
    x.rotation(0, 0, false);
    x.play_stroke("d1");
    x.rotation(0, 1, false);
    x.play_stroke("f3");
    x.rotation(0, 1, true);

    assertEquals(x.get_nb_marbles(), 8);
    assertEquals(x.get_board(0, 0), "white");
    assertEquals(x.get_board(0, 1), "white");
    assertEquals(x.get_board(0, 2), "white");
    assertEquals(x.get_board(0, 3), "white");

    assertEquals(x.get_board(2, 0), "black");
    assertEquals(x.get_board(2, 1), "black");
    assertEquals(x.get_board(2, 2), "black");
    assertEquals(x.get_board(2, 3), "black");
};

MyTestCase.prototype.test_eleventhStory = function () {
    var x = new Engine();
    x.new_game("white");
    x.play_stroke("a1");
    x.rotation(0, 0, true);
    x.play_stroke("a1");
    x.rotation(0, 0, false);
    x.play_stroke("b1");
    x.rotation(0, 0, true);
    x.play_stroke("a2");
    x.rotation(0, 0, false);
    x.play_stroke("c1");
    x.rotation(0, 0, true);
    x.play_stroke("a3");
    x.rotation(0, 0, false);
    x.play_stroke("d1");
    x.rotation(0, 1, false);
    x.play_stroke("f3");
    x.rotation(0, 1, true);
    assertEquals(x.get_win(), false);
    x.play_stroke("e1");
    assertEquals(x.get_win(), true);
};

MyTestCase.prototype.test_twelfthStory = function () {
    var x = new Engine();
    x.new_game("white");
    x.play_list_of_strokes("c4cbl ;d4abr ;c3ctl ;c3ctl ;c4cbl ;e5cbr ;b1ctl ;b2ctr ;c4cbl ;c3");
    assertEquals(x.get_board(0, 0), "black");
    assertEquals(x.get_board(1, 1), "black");
    assertEquals(x.get_board(2, 2), "black");
    assertEquals(x.get_board(3, 3), "black");
    assertEquals(x.get_board(4, 4), "black");
    assertEquals(x.get_win(), true);
    assertEquals(x.get_current_player(), "black");
};

MyTestCase.prototype.test_thirteenthStory = function () {
    var x = new Engine();
    x.new_game("black");
};

MyTestCase.prototype.test_fourteenthStory = function () {
    x.new_game("white");
    x.play_list_of_strokes("a1cbl ;d1cbr ;b1cbl ;e1cbr ;c1cbl ;f1cbr");
    x.play_list_of_strokes("a2cbl ;d2cbr ;b2cbl ;e2cbr ;c2cbl ;f2cbr");
    x.play_list_of_strokes("a3cbl ;d3cbr ;b3cbl ;e3cbr ;c3cbl ;f3cbr");
    x.play_list_of_strokes("b5ctl ;a4ctr ;e4ctl ;b4ctr ;f4ctl ;d4ctr");
    x.play_list_of_strokes("d5ctl ;a5ctr ;f5ctl ;c4ctr ;a6ctl ;c5ctr");
    x.play_list_of_strokes("b6ctl ;e5ctr ;d6ctl ;c6ctr ;f6ctl ;e6ctr");
    assertEquals(x.get_win(), false);
    assertEquals(x.get_drawn(), true);
};

