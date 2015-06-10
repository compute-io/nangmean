'use strict';

// MODULES //

var isNumber = require( 'validate.io-number' );

// NANGMEAN //

/**
* FUNCTION: nangmean( out, mat[, dim] )
*	Computes the geometric mean along a matrix dimension ignoring non-numeric values.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute a geometric mean. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} geometric means or null
*/
function nangmean( out, mat, dim ) {
	var sum,
		val,
		M, N, Nobs,
		s0, s1,
		o,
		i, j, k;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		sum = 0;
		Nobs = 0;
		for ( j = 0; j < N; j++ ) {
			val = mat.data[ k + j*s1 ];
			if ( !isNumber( val ) ) {
				continue;
			}
			if ( val <= 0 ) {
				sum = NaN;
				break;
			}
			Nobs += 1;
			sum += Math.log( val );
		}
		out.data[ i ] = Math.exp( sum / Nobs );
	}
	return out;
} // end FUNCTION nangmean()


// EXPORTS //

module.exports = nangmean;
