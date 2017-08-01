/* eslint-env mocha */

const { Assert, InSeries, InParallel, PassThrough, Logging, CatchError } = require('../dist');

const Valid = require('simple-validator');
const { optional, exists, isBoolean, isNumber } = Valid;
const { matches } = Valid.Object;

describe('Assert', () => {
	it('Assert 1', (done) => {
		const chain = InSeries(
			(next) => next(null, true),
			Assert(matches([ isBoolean ]))
		)(done);
	});

	it('Assert 2', (done) => {
		const chain = InSeries(
			(next) => next(null, false),
			Assert(matches([ isNumber ]))
		)((err) => done(err != null ? null : err));
	});

	it('Assert 2', (done) => {
		const chain = Assert(matches(optional(exists)));
		chain(done);
	});
});
