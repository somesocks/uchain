
const { nop, noarr } = require('./_base');

const Assert = (validator, msg) => {
	validator = validator || nop;
	msg = msg || 'uchain assert failed';

	return (next, ...args) => {
		next = next || nop;
		args = args || noarr;
		const err = validator(args) ? null : new Error(`${msg}\nargs: ${JSON.stringify(args)}`);
		next(err, ...args);
	};
};

module.exports = Assert;
