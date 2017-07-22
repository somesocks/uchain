
const { defer, once, catchWrapper, nop, noarr } = require('./_base');

const InSeries = (...handlers) => {
	handlers = handlers || noarr;

	if (handlers.length === 0) {
		return (next) => (next || nop)();
	} else {
		handlers = handlers.map(catchWrapper);

		return (next, ...args) => {
			next = once(next);
			args = args || noarr;

			let index = 0;
			const worker = (err, ...res) => {
				res = res || noarr;

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
