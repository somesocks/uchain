/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, Logging, ParallelObjectFilter } = require('../dist');

describe('ParallelObjectFilter', () => {
	it('ParallelObjectFilter works', (done) => {
		const even = (next, key, val) => next(null, val % 2 === 0);

		const task =
			InSeries(
				Logging('before'),
				ParallelObjectFilter(even),
				Logging('after')
			);

		task(done, { a: 1, b: 2, c: 3, d: 4 });
	});

	it('Function.length should be at least 1', () => {
		if (ParallelObjectFilter((next) => true).length < 1) { throw new Error(); }
	});

	it('test with 0 args', (done) => {
		const even = (next, key, val) => next(null, val % 2 === 0);

		const task =
			InSeries(
				ParallelObjectFilter(even)
			);

		task(done, {});
	});

	it('catches errors', (done) => {
		const even = (next, key, val) => { throw new Error('error!'); };

		const task =
			InSeries(
				ParallelObjectFilter(even)
			);

		const onDone = (err) => done(err != null ? null : err);

		task(onDone, {});
	});
});
