
const { defer, once, catchWrapper } = require('./_base');

const Race = (...handlers) => {
	if (handlers.length === 0) {
		return (next) => next();
	}

	handlers = handlers.map(catchWrapper);

	return (next, ...args) => {
		next = once(next);

		for (let i = 0; i < handlers.length; i++) {
			const handler = handlers[i];
			defer(handler, next, ...args);
		}
	};
};

module.exports = Race;
