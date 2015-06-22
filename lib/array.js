'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );

// FUNCTIONS //

var contains = require( './contains.js' );

// NANGMEAN //

/**
* FUNCTION: nangmean( arr, encoding )
*	Computes the geometric mean of an array ignoring non-numeric / missing values.
*
* @param {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Array} encoding - array whose elements encode missing values
* @returns {Number|Null} geometric mean or null
*/
function nangmean( arr, encoding ) {
	var len = arr.length,
		sum = 0,
		N = 0,
		val,
		i;

	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		val = arr[ i ];
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
