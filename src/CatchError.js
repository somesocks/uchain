
const { catchWrapper, nop, noarr } = require('./_base');

const CatchError = (handler) => {
	handler = catchWrapper(handler);

	return (next, ...args) => {
		next = next || nop;
		args = args || noarr;

		handler(
			(...a) => next(null, ...(a || noarr)),
			...args
		);
	};
};

module.exports = CatchError;
