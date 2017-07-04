require('setimmediate');

const nop = () => {};
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
	once,
	defer,
	catchWrapper,
};
