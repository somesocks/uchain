require('setimmediate');

const noarr = [];

const nop = (err) => {
	if (err) {
		console.warn('Warning: uchain ignored error\n', err);
	}
};

const once = (f) => (...args) => {
	const temp = f || nop;
	f = nop;
	temp(...args);
};

const defer = setImmediate;

const catchWrapper = (h) => (next, ...rest) => {
	try {
		h(next, ...rest);
	} catch (err) {
		next(err);
	}
};


module.exports = {
	nop,
	noarr,
	once,
	defer,
	catchWrapper,
};
