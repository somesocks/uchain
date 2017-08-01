/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging, ParallelMap } = require('../dist');

describe('ParallelMap', () => {
	it('ParallelMap works', (done) => {
		const task =
			InSeries(
				ParallelMap((next, item) => next(null, item))
			);

		task(done, ...Array(1000).fill(1));
	});

	it('Function.length should be at least 1', () => {
		if (ParallelMap((next) => true).length < 1) { throw new Error(); }
	});

	it('test with 0 args', (done) => {
		const task = ParallelMap((next, item) => next(null, item));
		task(done);
	});

	it('catches errors', (done) => {
		const task = ParallelMap((next, item) => { throw new Error('error'); });

		const onDone = (err, res) => done(err != null ? null : err);

		task(onDone, 1, 2, 3);
	});
});
