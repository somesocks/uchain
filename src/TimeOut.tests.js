/* eslint-env mocha */

const { InSeries, InParallel, TimeOut, PassThrough, Logging } = require('../dist');

describe('TimeOut', () => {
	it('test with 0 handlers', (done) => {
		TimeOut()(done);
	});

	it('test with null return', (done) => {
		TimeOut(
			(next) => next()
		)(done);
	});

	it('Function.length should be at least 1', () => {
		if (TimeOut().length < 1) { throw new Error(); }
		if (TimeOut((next) => true).length < 1) { throw new Error(); }
	});

	it('test with null callback', (done) => {
		TimeOut(
			(next) => next()
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		TimeOut(
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});

	it('returns 1', (done) => {
		TimeOut(
			(next) => next(null, 1)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});

	it('returns nothing', (done) => {
		TimeOut(
			(next) => setTimeOut(next, 2000, null, 1)
		)((err, res) => done(
			((err != null) && (res == null)) ? null : err)
		);
	});
});
