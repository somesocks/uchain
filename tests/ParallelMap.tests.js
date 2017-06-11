/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging, ParallelMap } = require('../dist/uchain');

describe('ParallelMap', () => {
	it('ParallelMap works', (done) => {
		const task =
			InSeries(
				ParallelMap((next, item) => next(null, item))
			);

		task(done, ...Array(1000).fill(1));
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
