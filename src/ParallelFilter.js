
import { nop, noarr } from './_common';

import InSeries from './InSeries';

import ParallelMap from './ParallelMap';

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

export default ParallelFilter;
