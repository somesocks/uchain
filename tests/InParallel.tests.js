
const { InSeries, InParallel, PassThrough, Logging } = require('../dist/uchain');

describe('InParallel', () => {

	it('Parallel Performance', (done) => {
		const chain = InSeries(
			...Array(1000).fill(PassThrough),
			Logging('end')
		);

		chain(done);
	});

});
