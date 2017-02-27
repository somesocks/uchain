
const { InSeries, InParallel, PassThrough, Logging } = require('../dist/uchain');

describe('InParallel', () => {

	it('Parallel Performance', (done) => {
		const chain = InSeries(
			...Array(1000).fill(PassThrough)
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
		setTimeout(done, 100);
	});

});
