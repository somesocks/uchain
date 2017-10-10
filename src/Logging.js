
const { nop, noarr, stringBuilder } = require('./_base');

/**
* Logs the arguments passed into the task, and then passes them along.
* @param {(string|stringBuilder)} statement - a string, or string builder function
* @returns {taskFunction} a logging task
* @memberof uchain
*/
const Logging = (statement) => {
	statement = statement || ((...args) => `Logging [ ${args} ]`);
	statement = stringBuilder(statement);

	return (next, ...args) => {
		args = args || noarr;
		next = next || nop;
		console.log(statement(...args));
		next(null, ...args);
	};
};

module.exports = Logging;
