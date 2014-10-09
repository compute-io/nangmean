nangmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the geometric mean of an array of values ignoring any values which are not numeric.


## Installation

``` bash
$ npm install compute-nangmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var nangmean = require( 'compute-nangmean' );
```

#### nangmean( arr )

Computes the geometric mean ignoring non-numeric values.

``` javascript
var data = [ 1, 5, NaN, 2, 3, NaN, 7 ];

var mu = nangmean( data );
// returns ~2.914
```

Note: only calculate the geometric mean over an `array` containing __positive__ numbers. The textbook formula for calculating the geometric mean involves taking the product of all `array` elements. If one element is `0`, then the product is `0`, even if all other values are `>>> 0`, yielding a nonsensical geometric mean (and measure of the central tendency). Nonsensical results also arise when an `array` contains negative values leading to a product without positive roots and a geometric mean which does not map to the measure's geometric interpretation. For more information, see *Handbook of Parametric and Nonparametric Statistical Procedures: Third Edition* by David J. Sheskin.

If an `array` contains numeric values less than or equal to `0`, the function returns `NaN`.


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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


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