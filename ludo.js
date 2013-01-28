/**
 * Utility JavaScript library for the game of Ludo
 */

/**
 * Rotate a point around the board's center
 *
 * Rotate coords with respect to (x_c, y_c) this number of degrees clockwise: 90° * playerIndex
 * For more information on the rotation matrix, see:
 *   <http://en.wikipedia.org/wiki/Rotation_matrix>
 */
function rotate(playerIndex, coords, params) {
	/* Validate parameter */
	if (playerIndex < 0 || playerIndex > 3) {
		throw 'playerIndex parameter out of range';
	}
	
	var newCoords = new Object();
	var theta = playerIndex * Math.PI / 2;
	var x = coords.x - params.x_c;
	var y = coords.y - params.y_c;
	
	newCoords.x = Math.cos(theta) * x - Math.sin(theta) * y + params.x_c;
	newCoords.y = Math.sin(theta) * x + Math.cos(theta) * y + params.y_c;
	
	switch (playerIndex) {
		case 1:
			newCoords.x -= params.h;
			break;
		case 2:
			newCoords.x -= params.h;
			newCoords.y -= params.h;
			break;
		case 3:
			newCoords.y -= params.h;
			break;
	}
	
	return newCoords;
}

/**
 * Absolute to Coordinates
 *
 * Returns the coordinates (x, y) of an absolute position on the board.
 * For more information about these parameters, see the documentation here:
 *   <https://github.com/sudiptachatterjee/ludo/wiki/Game-state>
 */
function absoluteToCoordinates(playerIndex, coinIndex, absPos, params) {
	/* Validate parameters */
	if (playerIndex < 0 || playerIndex > 3) {
		throw 'parameter playerIndex out of range';
	}
	if (coinIndex < 0 || coinIndex > 3) {
		throw 'parameter coinIndex out of range';
	}
	if (absPos < 0 || absPos > 57) {
		throw 'parameter absPos out of range';
	}
	
	/* Create new coordinates object */
	var coords = new Object();
	
	if (absPos === 0) {
		coords.x = params['x_P' + coinIndex];
		coords.y = params['y_P' + coinIndex];
		
		return rotate(playerIndex, coords, params);
	}
	
	/* Get offset from (x_0, y_0) */
	if (absPos >= 1 && absPos <= 5) {
		coords.x = absPos;
		coords.y = 0;
	} else if (absPos <= 11) {
		coords.x = 6;
		coords.y = 5 - absPos;
	} else if (absPos == 12) {
		coords.x = 7;
		coords.y = -6;
	} else if (absPos <= 18) {
		coords.x = 8;
		coords.y = absPos - 19;
	} else if (absPos <= 24) {
		coords.x = absPos - 10;
		coords.y = 0;
	} else if (absPos == 25) {
		coords.x = 14;
		coords.y = 1;
	} else if (absPos <= 31) {
		coords.x = 40 - absPos;
		coords.y = 2;
	} else if (absPos <= 37) {
		coords.x = 8;
		coords.y = absPos - 29;
	} else if (absPos == 38) {
		coords.x = 7;
		coords.y = 8;
	} else if (absPos <= 44) {
		coords.x = 6;
		coords.y = 47 - absPos;
	} else if (absPos <= 50) {
		coords.x = 50 - absPos;
		coords.y = 2;
	} else if (absPos == 51) {
		coords.x = 0;
		coords.y = 1;
	} else if (absPos <= 57) {
		coords.x = absPos - 51;
		coords.y = 1;
	}

	/* Transform into coordinates */
	coords.x = params.x_0 + coords.x * params.h;
	coords.y = params.y_0 + coords.y * params.h;
	
	return rotate(playerIndex, coords, params);
}

/**
 * Converts a player's index to a string that contains its color in lowercase.
 */
function getColor(playerIndex) {
	switch (playerIndex) {
		case 0:
			return 'green';
			break;
		case 1:
			return 'red';
			break;
		case 2:
			return 'blue';
			break;
		case 3:
			return 'yellow';
			break;
		default:
			throw 'playerIndex out of range';
	}
}

/**
 * Get time difference based on two Date's.
 *
 * Returns the time difference between two Date objects formatted as "h:mm:ss"
 * Padding zeroes are added as necessary.
 * The hour (h) is omitted if the time difference is less than one hour.
 */
function getTimeDiff(date_start, date_end) {
	var time_diff_secs = (date_end.getTime() - date_start.getTime()) / 1000;
	var hh = Math.floor(time_diff_secs / 3600.0);
	var mm = Math.floor(time_diff_secs / 60.0) % 60;
	var ss = Math.floor(time_diff_secs) % 60;
	if(ss < 10) { ss = "0" + ss; }
	if(mm < 10) { mm = "0" + mm; }
	var fmt = (hh == 0 ? "" : hh + ":") + mm + ":" + ss;
	return fmt;
}

/**
 * Returns a string representation of a Date object.
 *
 * Obviously the Date.toUTCString() method could be used, but this allows for easier and better customization.
 */
function dateToString(d) {
	var hh = d.getHours();
	var mm = d.getMinutes();
	var fmt = d.toDateString() + ' at ' + hh + ':' + (mm < 10 ? '0' : '') + mm;
	return fmt;
}
