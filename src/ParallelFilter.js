
const { nop, noarr } = require('./_base');

const InSeries = require('./InSeries');
const ParallelMap = require('./ParallelMap');

const ParallelFilter = (filter) => (next, ...args) => {
	next = next || nop;
	args = args || noarr;

	InSeries(
		ParallelMap(filter),
		(next, ...booleans) => {
			booleans = booleans || noarr;
			const results = args.filter((r, i) => booleans[i]);
			next(null, ...results);
		}
	)(next);
};

module.exports = ParallelFilter;
