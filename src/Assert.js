
import _catchWrapper from './_catchWrapper';
import _nop from './_nop';
import _noarr from './_noarr';
import _stringWrapper from './_stringWrapper';

/**
* Builds an async assertion task.  When called, if the arguments do not match the validator functions,
* Assert passes an error to its callback.
* @param {function} validator - a function that checks the arguments.
* @param {string} message - an optional error message to throw if the assertion fails, or a message builder function.
* @returns {taskFunction} an assertion task
* @memberof uchain
*/
const Assert = (validator, message) => {
	validator = validator || _nop;
	message = message || 'uchain assert failed';
	message = _stringWrapper(message);

	return _catchWrapper(
		(next, ...args) => {
			next = next || _nop;
			args = args || _noarr;
			const err = validator(...args) ? null : new Error(message(...args));
			next(err, ...args);
		}
	);
};

export default Assert;
