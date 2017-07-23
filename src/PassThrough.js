
const { nop } = require('./_base');

const PassThrough = function () {
	const args = arguments;
	const next = args[0] || nop;
	args[0] = undefined;
	next.apply(undefined, args);
};

module.exports = PassThrough;
