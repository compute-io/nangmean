'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );

// FUNCTIONS //

var contains = require( './contains.js' );

// NANGMEAN //

/**
* FUNCTION: nangmean( arr, encoding, clbk )
*	Computes the geometric mean of an array using an accessor function ignoring non-numeric / missing values.
*
* @param {Array} arr - input array
* @param {Array} encoding - array whose elements encode missing values
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} geometric mean or null
*/
function nangmean( arr, encoding, clbk ) {
	var len = arr.length,
		sum = 0,
		N = 0,
		val,
		i;

	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		val = clbk( arr[ i ], i );
		if ( !isNumber( val ) || contains( encoding, val ) ) {
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
