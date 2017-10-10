
const { nop, noarr, catchWrapper, stringBuilder } = require('./_base');

/**
* Builds an async assertion task.  When called, if the arguments do not match the validator functions,
* Assert passes an error to its callback.
* @param {function} validator - a function that checks the arguments.
* @param {string} message - an optional error message to throw if the assertion fails, or a message builder function.
* @returns {taskFunction} an assertion task
* @memberof uchain
*/
const Assert = (validator, message) => {
	validator = validator || nop;
	message = message || 'uchain assert failed';
	message = stringBuilder(message);

	return catchWrapper(
		(next, ...args) => {
			next = next || nop;
			args = args || noarr;
			const err = validator(args) ? null : new Error(message(...args));
			next(err, ...args);
		}
	);
};

module.exports = Assert;
