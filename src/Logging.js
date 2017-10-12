
const { nop, noarr, stringBuilder } = require('./_base');

const DEFAULT = ((...args) => `Logging [ ${args} ]`);

/**
* A logging utility.
* It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement
* @param {...(string|stringBuilder)} statements - any number of strings, or string builder functions
* @returns {taskFunction} a logging task
* @memberof uchain
*/
const Logging = (...statements) => {
	statements = statements || [ DEFAULT ];
	statements = statements.map(stringBuilder);

	return (next, ...args) => {
		args = args || noarr;
		next = next || nop;

		const log = statements
			.map(s => s(...args))
			.join('\n');

		console.log(log);

		next(null, ...args);
	};
};

module.exports = Logging;
