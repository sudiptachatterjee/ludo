/**
 * Parameters object
 *
 * For more information about these parameters, see the documentation here:
 *   <https://github.com/sudiptachatterjee/ludo/wiki/Game-state>
 *
 * TODO: It should be loaded (or rather, set) dynamically if the option to choose different boards is given.
 *       As long as we use one board (the one taken from Wikipedia), these parameters can be hard-coded.
 */
var params = {
    x_0  : 0,   y_0  : 144,
    x_c  : 180, y_c  : 180,
    x_P0 : 60,  y_P0 : 84,
    x_P1 : 36,  y_P1 : 60,
    x_P2 : 60,  y_P2 : 36,
    x_P3 : 84,  y_P3 : 60,
    h    : 24
};

/**
 * Place a player's coin correctly on the screen
 */
function putCoin(playerIndex, coinIndex, absPos) {
    var coords = absoluteToCoordinates(playerIndex, coinIndex, absPos, params);
    var color = getColor(playerIndex);
    
    $('#' + color + 'coin_' + coinIndex).css('left', coords.x).css('top', coords.y);
}

/**
 * Define the players of the current game
 *
 * TODO: Generate dynamically
 */
var player = [new Player('Green'), new Player('Red'), new Player('Blue'), new Player('Yellow')];

// Number of players
var noOfPlayers = player.length;

/**
 * Display players' names and generate players' coin elements (the HTML elements to display)
 */
for (var playerIndex = 0; playerIndex < 4; ++playerIndex) {
    $('#players p.' + getColor(playerIndex) + ' span.name').text(player[playerIndex].getName());

    for (var coinIndex = 0; coinIndex < 4; ++coinIndex) {
        // Create new coin element
        var newCoin_id = getColor(playerIndex) + 'coin_' + coinIndex;
        $('#board').prepend('<div class="' + getColor(playerIndex) + ' coin" id="' + newCoin_id + '"></div>');
        
        // Display it on the screen
        putCoin(playerIndex, coinIndex, player[playerIndex].positionOfCoin(coinIndex));
    }
}

/* Global variables */

var playerIndex = 0;
var coinIndex = 0;
    
var delta = 1;  // Number of squares to advance
var gotoPos = player[playerIndex].positionOfCoin(coinIndex) + delta;    // Initial position of the 'goto' pointer

var time_elapsed = $('div#menu p.time_elapsed span.time_elapsed');  // Elapsed time text element
var init_time = new Date();     // When did the game begin?

/* Set date & time when the game started */
$('div#menu p.game_started span.game_started').text(dateToString(init_time));   

/* Update timer */
window.setInterval(function() {
    time_elapsed.text(getTimeDiff(init_time, new Date()));
}, 200);    // Every 200ms

/* Simplify user input by default */
$('#usermsg').val('').focus();

/* Highlight current player */
$('#players p.' + getColor(playerIndex) + ' span.name').addClass('turn');

/* Initialize goto pointer */
var coords = absoluteToCoordinates(playerIndex, coinIndex, gotoPos, params);
$('div#board div.goto').css('left', coords.x).css('top', coords.y);

/* Initialize info message */
/* TODO: Delete
var info_box = $('div#board div.info');
info_box
    .css('left', coords.x - Math.floor((info_box.outerWidth() - params.h) / 2))
    .css('top', coords.y - info_box.outerHeight());
*/

/**
 * Click on goto pointer
 *
 * Advance coin to goto pointer and update pointer
 */
$('div#board div.goto').click(function() {
    /* Hide info box */
    /* TODO: Delete
    info_box.fadeOut('slow');
    */
    
    /* Save current pointer position */
    var oldGotoPos = gotoPos;
    
    /* Update goto pointer */
    gotoPos += delta;
    if (gotoPos > 57) gotoPos = 57;
    
    /* Advance goto pointer */
    coords = absoluteToCoordinates(playerIndex, coinIndex, gotoPos, params);
    $(this).css('left', coords.x).css('top', coords.y);
    
    /* Move coin from current position to where the destination was at the beginning */
    while (player[playerIndex].positionOfCoin(coinIndex) != oldGotoPos) {
        /* Increment position */
        player[playerIndex].advance(coinIndex, 1);
        
        /* Advance coin */
        coords = absoluteToCoordinates(playerIndex, coinIndex, player[playerIndex].positionOfCoin(coinIndex), params);
        $('#' + getColor(playerIndex) + 'coin_' + coinIndex).animate({
            'left' : coords.x,
            'top' : coords.y
        }, 'fast');
    }

    /* Simplify user input */
    usermsg.focus();
});

/* Submit user message */
$('#submitmsg').click(function() {
    /* Element variables */
    var chatlog = $('#chatlog');
    var usermsg = $('#usermsg');
    
    /* If message is empty, there's nothing to add to the chat log; just return focus to user input */
    if ($.trim(usermsg.val()) == '') {
        usermsg.val('').focus();
        return false;
    }
    
    /* Append new text */
    chatlog.append('<p><strong>' + player[playerIndex].getName() + '</strong>: ' + usermsg.val() + '</p>');
    
    /* Scroll to the bottom of the log */
    chatlog.attr('scrollTop', chatlog.attr('scrollHeight'));
    
    /* Simplify user input */
    usermsg.val('').focus();
});
