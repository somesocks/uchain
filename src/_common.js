import 'setimmediate';

const defer = setImmediate;

const noarr = [];

const nop = (err) => {
	if (err) {
		console.warn('Warning: uchain ignored error\n', err);
	}
};

const isString = (val) => (typeof val === 'string') || (val instanceof String);

const isFunction = (val) => typeof val === 'function';



// const defer = function () {
// 	const args = arguments;
// 	console.log('defer args', args, args.length);
// 	setImmediate.apply(undefined, args);
// };
//

const onceWrapper = function (func) {
	return function () {
		const args = arguments;
		const temp = func || nop;
		func = nop;
		temp.apply(undefined, args);
	};
};

const catchWrapper = function (func) {
	return function (next) {
		const args = arguments;
		try {
			func.apply(undefined, args);
		} catch (err) {
			next = next || nop;
			next(err);
		}
	};
};

const stringWrapper = (log) => {
	const builder =
		(isFunction(log) ? log : null) ||
		(isString(log) ? () => log : null) ||
		(() => '');

	return builder;
};

export {
	nop,
	noarr,
	defer,
	isString,
	isFunction,
	onceWrapper,
	catchWrapper,
	stringWrapper,
};
