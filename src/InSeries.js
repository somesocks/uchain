
const { defer, once, catchWrapper, nop } = require('./_base');

const InSeries = (...handlers) => {
	if (handlers.length === 0) {
		return (next) => (next || nop)();
	} else {
		handlers = handlers.map(catchWrapper);

		return (next, ...args) => {
			next = once(next);

			let index = 0;
			const worker = (err, ...res) => {
				if (err || index >= handlers.length) {
					next(err, ...res);
				} else {
					const handler = handlers[index++];
					defer(handler, once(worker), ...res);
				}
			};

			worker(null, ...args);
		};
	}
};

module.exports = InSeries;
