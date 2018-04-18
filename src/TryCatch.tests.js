/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging, TryCatch, Timer } = require('../dist');

describe('TryCatch', () => {
	it('test with 0 handlers', (done) => {
		TryCatch()(done);
	});

	it('test with null return', (done) => {
		TryCatch(
			(next) => next()
		)(done);
	});

	it('Function.length should be at least 1', () => {
		if (TryCatch().length < 1) { throw new Error(); }
		if (TryCatch((next) => next()).length < 1) { throw new Error(); }
	});

	it('test with null callback', (done) => {
		TryCatch(
			(next) => next()
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		TryCatch(
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});
});
