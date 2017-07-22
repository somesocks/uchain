require('setimmediate');

const noarr = [];

const nop = (err) => {
	if (err) {
		console.warn('Warning: uchain ignored error\n', err);
	}
};

const once = function (func) {
	return function () {
		const args = arguments;
		const temp = func || nop;
		func = nop;
		temp.apply(undefined, args);
	};
};

// const defer = function () {
// 	const args = arguments;
// 	console.log('defer args', args, args.length);
// 	setImmediate.apply(undefined, args);
// };
//
const defer = setImmediate;

const catchWrapper = function (func) {
	return function () {
		const args = arguments;
		try {
			func.apply(undefined, args);
		} catch (err) {
			const next = args[0] || nop;
			next(err);
		}
	};
};

module.exports = {
	nop,
	noarr,
	once,
	defer,
	catchWrapper,
};
