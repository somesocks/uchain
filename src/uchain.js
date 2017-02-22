
require("setimmediate");

const once = (f) => (...args) => f = f != null ? f(...args) : null;

const defer = setImmediate;

const InParallel = (...handlers) => (next, ...args) => {
	next = once(next);

	let done = 0;
	const results = [];

	for(let i = 0; i < handlers.length; i++) {
		const h = handlers[i];

		const onDone = once((err, ...res) => {
			if (err) {
				next(err);
			} else {
				done++;
				results[i] = res.length === 1 ? res[0] : res;
				if (done === handlers.length) {
					next(null, ...results);
				}
			}
		});

		defer(h, onDone, ...args);
	}
};

const InSeries = (...handlers) => (next, ...args) => {
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

const PassThrough = (next, ...args) => next(null, ...args);

const CatchError = (handler) => (next, ...args) => {
	handler(
		(...a) => next(null, ...a),
		...args
	);
};

const Logging = (tag) => (next, ...args) => {
	console.log(tag, ...args);
	next(null, ...args);
};

module.exports = {
	InSeries,
	InParallel,
	CatchError,
	Logging,
	PassThrough,
}
