
const { InSeries, InParallel, PassThrough, Logging } = require('../dist/uchain');

describe('InSeries', () => {

	it('Long Chain Performance', (done) => {
		const chain = InSeries(
			...Array(100000).fill(PassThrough),
			Logging('end')
		);

		chain(done, 1, 2, 3);
	});

});
