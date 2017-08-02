
const { nop, noarr } = require('./_base');

const isString = (val) => (typeof val === 'string') || (val instanceof String);

const LOGGER = (...args) => console.log(...args);

/**
* Logs the arguments passed into the task, and then passes them along.
* @param {string} label - an optional tag for the label.
* @returns {taskFunction} a logging task
* @memberof uchain
*/
const Logging = (options = '') => {
	options = isString(options) ? { tag: options } : options;
	options.tag = options.tag != null ? options.tag : '';
	options.logger = options.logger != null ? options.logger : LOGGER;
	options.logArgs = options.logArgs != null ? options.logArgs : true;

	const { tag, logger, logArgs } = options;

	return (next, ...args) => {
		args = args || noarr;
		if (logArgs) {
			logger(tag, ...args);
		} else {
			logger(tag);
		}
		(next || nop)(null, ...args);
	};
};

module.exports = Logging;
