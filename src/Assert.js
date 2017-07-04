
const { nop } = require('./_base');

const Assert = (validator, msg) => {
	validator = validator || nop;
	msg = msg || 'uchain assert failed';

	return (next, ...args) => {
		const err = validator(args) ? null : new Error(`${msg}\nargs: ${JSON.stringify(args)}`);
		next(err, ...args);
	};
};

module.exports = Assert;
