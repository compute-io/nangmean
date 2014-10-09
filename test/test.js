
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	gmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-nangmean', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( gmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
				'5',
				5,
				true,
				undefined,
				null,
				NaN,
				function(){},
				{}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				gmean( value );
			};
		}
	});

	it( 'should compute the geometric mean ignoring non-numeric values', function test() {
		var data,
			prod,
			len,
			d,
			N,
			expected;

		data = [ 2, 4, NaN, 5, 3, true, null, undefined, [], {}, function(){}, 8, 2 ];

		prod = 1;
		len = data.length;
		N = 0;
		for ( var i = 0; i < len; i++ ) {
			d = data[ i ];
			if ( typeof d !== 'number' || d !== d ) {
				continue;
			}
			N += 1;
			prod *= data[ i ];
		}
		expected = Math.pow( prod, 1/N );

		assert.closeTo( gmean( data ), expected, 1e-7 );
	});

	it( 'should return NaN if an input array contains a 0', function test() {
		var data, mu;

		data = [ 2, 4, 0, 3, 8, 2 ];
		mu = gmean( data );

		// Check: mu === NaN
		assert.ok( typeof mu === 'number' && mu !== mu );
	});

	it( 'should return NaN when an array contains a negative number', function test() {
		var data, mu;

		data = [ 2, 4, 5, 3, -8, 2 ];
		mu = gmean( data );

		// Check: mu === NaN
		assert.ok( typeof mu === 'number' && mu !== mu );
	});

});