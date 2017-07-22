
const { catchWrapper, nop } = require('./_base');

const CatchError = (handler) => {
	handler = catchWrapper(handler);

	return (next, ...args) => {
		next = next || nop;

		handler(
			(...a) => next(null, ...a),
			...args
		);
	};
};

module.exports = CatchError;
