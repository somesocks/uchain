
const { Assert, InSeries, InParallel, PassThrough, Logging, CatchError } = require('../dist/uchain');

describe('Assert', () => {

	it('Assert 1', (done) => {
		const chain = InSeries(
			(next) => next(null, true),
			Assert((val) => val)
		)(done);
	});

	it('Assert 2', (done) => {
		const chain = InSeries(
			(next) => next(null, false),
			Assert((val) => val)
		)((err) => done(err != null ? null : err));
	});

});
