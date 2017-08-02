
const { nop, noarr } = require('./_base');

const InSeries = require('./InSeries');
const ParallelMap = require('./ParallelMap');

/**
* Builds a task that filters all of its arguments in parallel, and returns the results
* @param {taskFunction} filter - an asynchronous filter function that returns true or false through its callback.
* @returns {taskFunction} a filtering task
* @memberof uchain
*/
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
