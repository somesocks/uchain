
const { nop } = require('./_base');

const isString = (val) => (typeof val === 'string') || (val instanceof String);

const Logging = (options = '') => {
	options = isString(options) ? { tag: options } : options;
	options.tag = options.tag != null ? options.tag : '';
	options.logger = options.logger != null ? options.logger : console.log;
	options.logArgs = options.logArgs != null ? options.logArgs : true;

	const { tag, logger, logArgs } = options;

	return (next, ...args) => {
		if (logArgs) {
			logger(tag, ...args);
		} else {
			logger(tag);
		}
		(next || nop)(null, ...args);
	};
};

module.exports = Logging;
