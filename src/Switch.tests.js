/* eslint-env mocha */

const { Switch, InSeries, InParallel, PassThrough, CatchError, Logging } = require('../dist');

describe('Switch', () => {
	it('Function.length should be at least 1', () => {
		if (Switch().length < 1) { throw new Error(); }
	});

	it('test with 0 handlers', (done) => {
		Switch()(done);
	});

	it('test with null callback', (done) => {
		Switch()();
		setTimeout(done, 16);
	});

	it('works 1',
		InSeries(
			(next) => next(null, { key: '1' }),
			Switch(
				(next, req) => next(null, req.key),
				{
					1: (next, req) => next(null, 'one'),
				}
			),
			(next, res) => next(res !== 'one')
		)
	);

	it('default works',
		InSeries(
			(next) => next(null, { key: '2' }),
			Switch(
				(next, req) => next(null, req.key),
				{
					1: (next, req) => next(null, 'one'),
					default: (next, req) => next(null, 'default'),
				}
			),
			(next, res) => next(res !== 'default')
		)
	);


	it('catches errors', (done) => {
		Switch(
			(next) => { throw new Error('error'); }
		)((err, res) => done(err != null ? null : err));
	});
});
