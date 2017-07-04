
const InSeries = require('./InSeries');
const InParallel = require('./InParallel');

const ParallelMap = (map) => (next, ...args) => {
	const tasks = args.map((arg, i) => (next) => map(next, arg, i));

	InSeries(
		InParallel(...tasks),
		(next, ...results) => {
			results = results.map((r) => r[0]);
			next(null, ...results);
		}
	)(next);
};


module.exports = ParallelMap;
