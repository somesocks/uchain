/* eslint-env mocha */

const { InSeries, InParallel, TimeIn, PassThrough, Logging } = require('../dist');

describe('TimeIn', () => {
	it('test with 0 handlers', (done) => {
		TimeIn()(done);
	});

	it('test with null return', (done) => {
		TimeIn(
			(next) => next()
		)(done);
	});

	it('Function.length should be at least 1', () => {
		if (TimeIn().length < 1) { throw new Error(); }
		if (TimeIn((next) => true).length < 1) { throw new Error(); }
	});

	it('test with null callback', (done) => {
		TimeIn(
			(next) => next()
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		TimeIn(
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});

	it('returns 1', (done) => {
		TimeIn(
			(next) => next(null, 1)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});
});
