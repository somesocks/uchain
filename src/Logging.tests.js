/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging } = require('../dist');

describe('Logging', () => {
	it('Function.length should be at least 1', () => {
		if (Logging().length < 1) { throw new Error(); }
	});

	it('Logging with string', (done) => {
		Logging('test')(done, 1, 2, 3);
	});

	it('Logging with function', (done) => {
		Logging((...args) => `${args}`)(done, 1, 2, 3);
	});
});
