/* eslint-env mocha */

const { InSeries, InParallel, Race, PassThrough, Logging } = require('../dist/uchain');

describe('Race', () => {
	it('test with 0 handlers', (done) => {
		Race()(done);
	});

	it('test with null return', (done) => {
		Race(
			(next) => next(),
			(next) => next()
		)(done);
	});

	it('test with null callback', (done) => {
		Race(
			(next) => next(),
			(next) => next()
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		Race(
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});

	it('returns 1', (done) => {
		Race(
			(next) => next(null, 1),
			(next) => {}
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});

	it('returns 1', (done) => {
		Race(
			(next) => next(null, 1),
			(next) => next(null, 2)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});

	it('returns 1', (done) => {
		Race(
			(next) => setTimeout(next, 500, null, 2),
			(next) => next(null, 1)
		)((err, res) => done(
			((err != null) && (res === 1)) ? null : err)
		);
	});
});
