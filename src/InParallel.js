
const { defer, once, catchWrapper } = require('./_base');

const InParallel = (...handlers) => {
	if (handlers.length === 0) {
		return (next) => next();
	} else {
		handlers = handlers.map(catchWrapper);

		return (next, ...args) => {
			next = once(next);

			let done = 0;
			const results = [];

			for (let i = 0; i < handlers.length; i++) {
				const h = handlers[i];

				const onDone = (err, ...res) => {
					if (err) {
						next(err);
					} else {
						done++;
						results[i] = res;
						if (done === handlers.length) {
							next(null, ...results);
						}
					}
				};

				defer(h, once(onDone), ...args);
			}
		};
	}
};

module.exports = InParallel;
