/* eslint-env mocha */

const { InSeries, InParallel, Timeout, PassThrough, Logging } = require('../dist');

describe('Timeout', () => {
	it('test with 0 handlers', (done) => {
		Timeout()(done);
	});

	it('test with null return', (done) => {
		Timeout(
			(next) => next()
		)(done);
	});

	it('Function.length should be at least 1', () => {
		if (Timeout().length < 1) { throw new Error(); }
		if (Timeout((next) => true).length < 1) { throw new Error(); }
	});

	it('test with null callback', (done) => {
		Timeout(
			(next) => next()
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		Timeout(
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});

	it('returns 1', (done) => {
		Timeout(
			(next) => next(null, 1)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});

	it('returns nothing', (done) => {
		Timeout(
			(next) => setTimeout(next, 2000, null, 1)
		)((err, res) => done(
			((err != null) && (res == null)) ? null : err)
		);
	});
});
