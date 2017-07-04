
const { catchWrapper } = require('./_base');

const CatchError = (handler) => {
	handler = catchWrapper(handler);
	return (next, ...args) => {
		// next = once(next);
		handler(
			(...a) => next(null, ...a),
			...args
		);
	};
};

module.exports = CatchError;
