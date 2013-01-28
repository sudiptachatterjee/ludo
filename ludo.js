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
 *
 * TODO: This will have to be updated to include the home run and possibly the pockets.
 */
function absoluteToCoordinates(n, params) {
	/* Validate parameter */
	if (n < 1 || n > 52) {
		throw new Error("The parameter n is outside the interval from 1 to 52 inclusive.");
	}
	
	/* Create new coordinates object */
	var coords = new Object();
	
	/* Get offset from (x_0, y_0) */
	if (n >= 1 && n <= 5) {
		coords.x = n;
		coords.y = 0;
	} else if (n <= 11) {
		coords.x = 6;
		coords.y = 5 - n;
	} else if (n == 12) {
		coords.x = 7;
		coords.y = -6;
	} else if (n <= 18) {
		coords.x = 8;
		coords.y = n - 19;
	} else if (n <= 24) {
		coords.x = n - 10;
		coords.y = 0;
	} else if (n == 25) {
		coords.x = 14;
		coords.y = 1;
	} else if (n <= 31) {
		coords.x = 40 - n;
		coords.y = 2;
	} else if (n <= 37) {
		coords.x = 8;
		coords.y = n - 29;
	} else if (n == 38) {
		coords.x = 7;
		coords.y = 8;
	} else if (n <= 44) {
		coords.x = 6;
		coords.y = 47 - n;
	} else if (n <= 50) {
		coords.x = 50 - n;
		coords.y = 2;
	} else if (n <= 52) {
		coords.x = 0;
		coords.y = 52 - n;
	}

	/* Transform into coordinates */
	coords.x = params.x_0 + coords.x * params.h;
	coords.y = params.y_0 + coords.y * params.h;
	
	return coords;
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
