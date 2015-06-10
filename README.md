nangmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the geometric mean ignoring any values which are not numeric.


The [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) is defined as

<div class="equation" align="center" data-raw-text="G = \left(\prod_{i=0}^{N-1} x_i\right)^{1/N}" data-equation="eq:geometric_mean">
	<img src="https://cdn.rawgit.com/compute-io/gmean/3ec3ab46db1ae39b3049c22e9e3d533bb2067d85/docs/img/eqn1.svg" alt="Equation for the geometric mean.">
	<br>
</div>

where `x_0, x_1,...,x_{N-1}` are individual data values and `N` is the total number of values in the data set.

## Installation

``` bash
$ npm install compute-nangmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var nangmean = require( 'compute-nangmean' );
```

#### nangmean( x[, opts] )

Computes the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) ignoring non-numeric values. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, mu;

data = [ 1, 5, NaN, 2, 3, NaN, 7 ];
mu = nangmean( data );
// returns ~2.914

data = new Float64Array( data );
mu = nangmean( data );
// returns ~2.914
```

Notes:

1. Only calculate the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) of an `array` of __positive__ numbers. The textbook formula for calculating the geometric mean involves taking the product of all `array` elements. If one element is `0`, then the product is `0`, even if all other values are `>>> 0`, yielding a nonsensical geometric mean (and measure of the central tendency). Nonsensical results also arise when an `array` contains negative values leading to a product without positive roots and a geometric mean which does not map to the measure's geometric interpretation. For more information, see *Handbook of Parametric and Nonparametric Statistical Procedures: Third Edition* by David J. Sheskin.
2. If an `array` contains values less than or equal to `0`, the function returns `NaN`.
3. For arrays exceeding memory constraints, you are encouraged to use streams; see [flow-gmean](https://github.com/flow-io/flow-gmean).

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':1},
	{'x':5},
	{'x':NaN},
	{'x':2},
	{'x':3},
	{'x':NaN},
	{'x':7}
];

function getValue( d, i ) {
	return d.x;
}

var mu = nangmean( data, {
	'accessor': getValue
});
// returns ~2.194
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	mu,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

mu = nangmean( mat );
/*
	[  NaN
	   6.853
	  11.916
	  16.941
	  21.954 ]
*/
```

To compute the [geometric mean](http://en.wikipedia.org/wiki/Geometric_mean) along the rows, set the `dim` option to `1`.

``` javascript
mu = nangmean( mat, {
	'dim': 1
});
/*
	[ NaN, 7.399, 9.112, 10.525, 11.811 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
mu = nangmean( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 0, 7, 9, 10, 11 ]
*/

var dtype = mu.dtype;
// returns 'uint8'
```

Note: `NaN` will be coerced to `0` for [`typed arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) of type integer. Only typed arrays of type `float64` and `float32` can hold `NaN` values.

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 1, 5, 2, 3, 7 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,5], 'int8' );
mu = nangmean( mat );
// returns ~2.194

// Column vector:
mat = matrix( new Int8Array( data ), [5,1], 'int8' );
mu = nangmean( mat );
// returns ~2.194
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
mu = nangmean( [] );
// returns null

mu = nangmean( new Int8Array( [] ) );
// returns null

mu = nangmean( matrix( [0,0] ) );
// returns null

mu = nangmean( matrix( [0,10] ) );
// returns null

mu = nangmean( matrix( [10,0] ) );
// returns null
```

## Examples

``` javascript
var nangmean = require( 'compute-nangmean' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}

console.log( nangmean( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Notes

The geometric mean of an array containing non-numeric values is equal to the geometric mean of an equivalent array which contains only the numeric values. Hence,

``` javascript
var d1 = [ 1, NaN, 2, 3, NaN ],
	d2 = [ 1, 2, 3 ];

console.log( nangmean( d1 ) === nangmean( d2 ) );
// returns true
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-nangmean.svg
[npm-url]: https://npmjs.org/package/compute-nangmean

[travis-image]: http://img.shields.io/travis/compute-io/nangmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/nangmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/nangmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/nangmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/nangmean.svg
[dependencies-url]: https://david-dm.org/compute-io/nangmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/nangmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/nangmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/nangmean.svg
[github-issues-url]: https://github.com/compute-io/nangmean/issues
