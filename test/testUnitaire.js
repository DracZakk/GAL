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