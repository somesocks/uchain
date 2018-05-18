
import _noarr from './_noarr';
import _nop from './_nop';

import InSeries from './InSeries';

import ParallelMap from './ParallelMap';

/**
* Builds a task that filters all of its arguments in parallel, and returns the results
* @param {taskFunction} filter - an asynchronous filter function that returns true or false through its callback.
* @returns {taskFunction} a filtering task
* @memberof uchain
*/
const ParallelFilter = (filter) => (next, ...args) => {
	next = next || _nop;
	args = args || _noarr;

	InSeries(
		ParallelMap(filter),
		(next, ...booleans) => {
			booleans = booleans || _noarr;
			const results = args.filter((r, i) => booleans[i]);
			next(null, ...results);
		}
	)(next);
};

export default ParallelFilter;
