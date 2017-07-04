
const InSeries = require('./InSeries');
const ParallelMap = require('./ParallelMap');

const ParallelFilter = (filter) => (next, ...args) => {
	InSeries(
		ParallelMap(filter),
		(next, ...booleans) => {
			const results = args.filter((r, i) => booleans[i]);
			next(null, ...results);
		}
	)(next);
};

module.exports = ParallelFilter;
