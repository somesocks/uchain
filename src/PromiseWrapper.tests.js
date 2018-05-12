/* eslint-env mocha */

const { InSeries, Assert, CatchError, PassThrough, PromiseWrapper, Logging } = require('../dist');

describe('PromiseWrapper tests', () => {
	it('Function.length should be at least 1', () => {
		if (PromiseWrapper().length < 1) { throw new Error(); }
		if (PromiseWrapper(() => {}).length < 1) { throw new Error(); }
	});

	it(
		'PromiseWrapper.resolve works',
		InSeries(
			(next) => next(null, 2),
			PromiseWrapper(
				(val) => new Promise((resolve, reject) => resolve(val))
			),
			Assert((val) => val === 2, 'PromiseWrapper failed to resolve')
		)
	);

	it(
		'PromiseWrapper.reject works',
		InSeries(
			(next) => next(null, 2),
			CatchError(
				PromiseWrapper(
					(val) => new Promise((resolve, reject) => reject(val))
				)
			),
			Assert((err) => err !== null, 'PromiseWrapper failed to reject')
		)
	);


	it('test with 0 handlers', (done) => {
		PromiseWrapper()(done);
	});

	it('test with null return',
		InSeries(
			(next) => next(null, 2),
			CatchError(
				PromiseWrapper(
					(val) => null
				)
			),
			Assert((err) => err !== null, 'PromiseWrapper failed to reject')
		)
	);
});
