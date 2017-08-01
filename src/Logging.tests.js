/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging } = require('../dist');

describe('Logging', () => {
	it('Logging with string', (done) => {
		Logging('test')(done, 1, 2, 3);
	});

	it('Logging with object', (done) => {
		Logging({ tag: 'test' })(done, 1, 2, 3);
	});

	it('Logging without args', (done) => {
		Logging({ tag: 'test', logArgs: false })(done, 1, 2, 3);
	});
});
