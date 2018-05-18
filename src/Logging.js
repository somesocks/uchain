
import { nop, noarr, isFunction } from './_common';

const DEFAULT = ((...args) => `Logging [ ${args} ]`);

const logWrapper = (log) => {
	const wrapper =
		(isFunction(log) ? log : null) ||
		(() => log);
	return wrapper;
};


/**
* A logging utility.
* It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement
* @param {...} statements - any number of logging values.  Functions are called with the calling arguments, everything else is passed directly to
* @returns {taskFunction} a logging task
* @memberof uchain
*/
const Logging = (...statements) => {
	statements = statements || [ DEFAULT ];
	statements = statements.map(logWrapper);

	return (next, ...args) => {
		args = args || noarr;
		next = next || nop;

		const log = statements
			.map(s => s(...args));

		console.log(...log);

		next(null, ...args);
	};
};

export default Logging;
