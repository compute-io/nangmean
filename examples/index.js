'use strict';

var matrix = require( 'dstructs-matrix' ),
	nangmean = require( './../lib' );

var data,
	mat,
	mu,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}
mu = nangmean( data );
console.log( 'Arrays: %d\n', mu );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
mu = nangmean( data, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', mu );


// ----
// Typed arrays...
// only Float64Array and Float32Array support NaN
data = new Float64Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}
mu = nangmean( data );
console.log( 'Typed arrays: %d\n', mu );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'float64' );
mu = nangmean( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', mu.toString() );


// ----
// Matrices (along columns)...
mu = nangmean( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', mu.toString() );


// ----
// Matrices (custom output data type)...
mu = nangmean( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', mu.dtype, mu.toString() );
