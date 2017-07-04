/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging, ParallelObjectMap } = require('./');

describe('ParallelObjectMap', () => {
	it('ParallelObjectMap works', (done) => {
		const double = (next, key, val) => next(null, val * 2);

		const task =
			InSeries(
				Logging('before'),
				ParallelObjectMap(double),
				Logging('after')
			);

		task(done, { a: 1, b: 2, c: 3 });
	});

	it('test with 0 args', (done) => {
		const double = (next, key, val) => next(null, val * 2);

		const task =
			InSeries(
				ParallelObjectMap(double)
			);

		task(done, {});
	});

	it('catches errors', (done) => {
		const double = (next, key, val) => { throw new Error('error!'); };

		const task =
			InSeries(
				ParallelObjectMap(double)
			);

		const onDone = (err) => done(err != null ? null : err);

		task(onDone, {});
	});
});
