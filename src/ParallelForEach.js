
import _noarr from './_noarr';
import _nop from './_nop';

import InSeries from './InSeries';
import InParallel from './InParallel';

/**
* Builds a task wrapper that calls a task once on each of its arguments in parallel
* @param {taskFunction} task - an asynchronous function that gets called once on each argument.
* @returns {taskFunction} a parallel foreach task
* @memberof uchain
*/
const ParallelForEach = (toCall) => (next, ...args) => {
	next = next || _nop;
	args = args || _noarr;

	const tasks = args.map((arg) => (next) => toCall(next, arg));

	InSeries(
		InParallel(
			...tasks
		),
		(next) => next()
	)(next);
};

export default ParallelForEach;
