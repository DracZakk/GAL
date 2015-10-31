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