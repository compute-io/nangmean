/**
*
*	COMPUTE: nangmean
*
*
*	DESCRIPTION:
*		- Computes the geometric mean of an array of values ignoring any values which are not numeric.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// NANGMEAN //

	/**
	* FUNCTION: nangmean( arr )
	*	Computes the geometric mean over an array of values ignoring non-numeric values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} gmean value
	*/
	function nangmean( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'gmean()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			N = 0,
			sum = 0,
			val;

		for ( var i = 0; i < len; i++ ) {
			val = arr[ i ];
			if ( typeof val !== 'number' || val !== val ) {
				continue;
			}
			if ( val <= 0 ) {
				return NaN;
			}
			N += 1;
			sum += Math.log( val );
		}
		return Math.exp( sum / N );
	} // end FUNCTION nangmean()


	// EXPORTS //

	module.exports = nangmean;

})();