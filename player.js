/**
 * Player
 *
 * Defines a Player object as specified in the documentation.
 * For more information, see: <https://github.com/sudiptachatterjee/ludo/wiki/Game-state>
 */

'use strict';

/* Constructor */
function Player(name) {
	// Player's name
	this.name = name;
	
	// Player's coins: absolute position of each of the four coins
	this.coin = [0, 0, 0, 0];
}

/* Advance a coin */
Player.prototype.advance = function(coinIndex, squares) {
	/* Parameter validation */
	
	// coinIndex must be in the range [0..3]
	if (coinIndex < 0 || coinIndex > 3) {
		throw 'coin index out of range';
	}
	
	// squares must be in the range [1..6]
	if (squares < 1 || squares > 6) {
		throw 'squares to advance out of range';
	}
	
	// The coin to advance cannot have reached the home pocket
	if (this.isCoinInHomePocket(coinIndex)) {
		throw 'coin in home pocket: cannot advance';
	}
	
	var currentPosition = this.positionOfCoin(coinIndex);
	
	if (currentPosition + squares >= 57) {
		this.coin[coinIndex] = 57;	// No 'bounce-back' effect: a coin past the home pocket stays in the home pocket
	} else {
		this.coin[coinIndex] = currentPosition + squares;
	}
}

/* Returns the name of the player */
Player.prototype.getName = function() {
	return this.name;
}

/* Returns the position of the given coin */
Player.prototype.positionOfCoin = function(coinIndex) {
	return this.coin[coinIndex];
}

/* Returns true if the coin number specified is in the pocket */
Player.prototype.isCoinInPocket = function(coinIndex) {
	return this.coin[coinIndex] == 0;
}

/* Returns true if the coin number specified is in the home pocket */
Player.prototype.isCoinInHomePocket = function(coinIndex) {
	return this.coin[coinIndex] == 57;
}

/* Returns lowest index of a coin that is in the pocket
   or -1 if all pockets have left the pocket */
Player.prototype.getCoinIndexInPocket = function() {
	for (var coinIndex = 0; coinIndex < 4; ++coinIndex) {
		if (this.isCoinInPocket[coinIndex]) {
			return coinIndex;
		}
	}
	
	return -1;
}
