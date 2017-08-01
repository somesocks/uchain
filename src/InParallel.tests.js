/* eslint-env mocha */

const { InSeries, InParallel, PassThrough, CatchError, Logging } = require('../dist');

describe('InParallel', () => {
	it('Parallel Performance', (done) => {
		const chain = InParallel(
			...Array(50000).fill(PassThrough)
		);

		chain(done);
	});

	it('test with 0 handlers', (done) => {
		InParallel()(done);
	});

	it('test with null return', (done) => {
		InParallel(
			(next) => next(),
			(next) => next()
		)(done);
	});

	it('test with null callback', (done) => {
		InParallel(
			(next) => next(),
			(next) => next()
		)();
		setTimeout(done, 16);
	});

	it('catches errors', (done) => {
		InParallel(
			(next) => next(),
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});

	it('doesnt return on no callback', (done) => {
		InSeries(
			InParallel(
				(next) => null
			),
			() => { throw new Error('shouldnt get here'); }
		)(done);

		setTimeout(done, 500);
	});

	it(
		'deep error stack works',
		InSeries(
			CatchError(
				InParallel(
					InParallel(
						(next) => next(),
						(next) => { throw new Error('error'); }
					)
				)
			),
			Logging('Error Stack')
		)
	);
});
