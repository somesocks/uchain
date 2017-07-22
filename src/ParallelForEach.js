
const { nop, noarr } = require('./_base');

const InSeries = require('./InSeries');
const InParallel = require('./InParallel');

const ParallelForEach = (toCall) => (next, ...args) => {
	next = next || nop;
	args = args || noarr;

	const tasks = args.map((arg) => (next) => toCall(next, arg));

	InSeries(
		InParallel(
			...tasks
		),
		(next) => next()
	)(next);
};

module.exports = ParallelForEach;
