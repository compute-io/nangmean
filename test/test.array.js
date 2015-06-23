/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate if a value is equal to NaN:
	isnan = require( 'validate.io-nan' ),

	// Validate if a value is numeric:
	isNumber = require( 'validate.io-number-primitive' ),

	// Module to be tested:
	nangmean = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array geometric mean', function tests() {

	it( 'should export a function', function test() {
		expect( nangmean ).to.be.a( 'function' );
	});

	it( 'should compute the geometric mean ignoring non-numeric values', function test() {
		var data,
			d,
			N = 0,
			prod,
			len,
			expected;

		data = [ 2, 4, NaN, 5, 3, true, null, undefined, [], {}, function(){}, 8, 2 ];

		prod = 1;
		len = data.length;
		for ( var i = 0; i < len; i++ ) {
			d = data[ i ];
			if ( !isNumber( d ) ) {
				continue;
			}
			N += 1;
			prod *= d;
		}
		expected = Math.pow( prod, 1/N );

		assert.closeTo( nangmean( data, [] ), expected, 0.0001 );
	});

	it( 'should compute the geometric mean ignoring encoded missing values', function test() {
		var data,
			d,
			N = 0,
			prod,
			len,
			expected;

		data = [ 2, 4, 999, 5, 3, 999, 999, 999, 999, 999, 999, 8, 2 ];

		prod = 1;
		len = data.length;
		for ( var i = 0; i < len; i++ ) {
			d = data[ i ];
			if ( d === 999 ) {
				continue;
			}
			N += 1;
			prod *= d;
		}
		expected = Math.pow( prod, 1/N );

		assert.closeTo( nangmean( data, [ 999 ] ), expected, 0.0001 );
	});

	it( 'should return NaN if an input array contains a 0', function test() {
		var data, mu;

		data = [ 2, 4, 0, 3, 8, 2 ];
		mu = nangmean( data, [] );

		// Check: mu === NaN
		assert.isTrue( isnan( mu ) );
	});


	it( 'should return null if provided an empty array', function test() {
		assert.isNull( nangmean( [], [] ) );
	});

});
