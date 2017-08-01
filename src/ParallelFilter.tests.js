/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging, ParallelFilter } = require('../dist');

describe('ParallelFilter', () => {
	it('ParallelFilter works', (done) => {
		const task =
			InSeries(
				ParallelFilter((next, item) => next(null, true))
			);

		task(done, ...Array(1000).fill(1));
	});

	it('Function.length should be at least 1', () => {
		if (ParallelFilter((next) => true).length < 1) { throw new Error(); }
	});

	it('test with 0 args', (done) => {
		const task = ParallelFilter((next, item) => next(null, true));
		task(done);
	});

	it('catches errors', (done) => {
		const task = ParallelFilter((next, item) => { throw new Error('error'); });

		const onDone = (err, res) => done(err != null ? null : err);

		task(onDone, 1, 2, 3);
	});
});
