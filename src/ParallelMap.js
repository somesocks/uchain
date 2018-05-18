
import _noarr from './_noarr';
import _nop from './_nop';

import InSeries from './InSeries';
import InParallel from './InParallel';

/**
* Builds a task wrapper that asynchronously maps each of its arguments to a result.
* Note: even though the mapping function can return any number of results, ParallelMap only uses the first result
* @param {taskFunction} task - an asynchronous mapping function.
* @returns {taskFunction} a parallel map task
* @memberof uchain
*/
const ParallelMap = (map) => (next, ...args) => {
	next = next || _nop;
	args = args || _noarr;

	const tasks = args.map((arg, i) => (next) => map(next, arg, i));

	InSeries(
		InParallel(...tasks),
		(next, ...results) => {
			results = results || _noarr;
			results = results.map((r) => r[0]);
			next(null, ...results);
		}
	)(next);
};


export default ParallelMap;
