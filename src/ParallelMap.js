
const { nop, noarr } = require('./_base');

const InSeries = require('./InSeries');
const InParallel = require('./InParallel');

const ParallelMap = (map) => (next, ...args) => {
	next = next || nop;
	args = args || noarr;

	const tasks = args.map((arg, i) => (next) => map(next, arg, i));

	InSeries(
		InParallel(...tasks),
		(next, ...results) => {
			results = results || noarr;
			results = results.map((r) => r[0]);
			next(null, ...results);
		}
	)(next);
};


module.exports = ParallelMap;
