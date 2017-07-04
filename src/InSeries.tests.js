/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging } = require('./');

describe('InSeries', () => {
	it('Long Chain Performance', (done) => {
		const chain = InSeries(
			...Array(100000).fill(PassThrough)
		);

		chain(done, 1, 2, 3);
	});

	it('test with 0 handlers', (done) => {
		InSeries()(done);
	});

	it('test with null return', (done) => {
		InSeries(
			(next) => next(),
			(next) => next()
		)(done);
	});

	it('test with null callback', (done) => {
		InSeries(
			(next) => next(),
			(next) => next()
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		InSeries(
			(next) => next(),
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});
});
