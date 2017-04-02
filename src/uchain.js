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

const InSeries = (...handlers) => {
	if (handlers.length === 0) {
		return (next) => next();
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

const PassThrough = (next, ...args) => next(null, ...args);

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

const Logging = (tag) => (next, ...args) => {
	console.log(tag, args);
	next(null, ...args);
};

const Assert = (validator, msg) => {
	validator = validator || nop;
	msg = msg || 'uchain assert failed';

	return (next, ...args) => {
		const err = validator(args) ? null : new Error(msg);
		next(err, ...args);
	};
};

const ParallelForEach = (toCall) => (next, ...args) => {
	const tasks = args.map((arg) => (next) => toCall(next, arg));

	InSeries(
		InParallel(
			...tasks
		),
		(next) => next()
	)(next);
};

const ParallelMap = (map) => (next, ...args) => {
	const tasks = args.map((arg, i) => (next) => map(next, arg, i));

	InSeries(
		InParallel(...tasks),
		(next, ...results) => {
			results = results.map((r) => r[0]);
			next(null, ...results);
		}
	)(next);
};

const ParallelFilter = (filter) => (next, ...args) => {
	InSeries(
		ParallelMap(filter),
		(next, ...booleans) => {
			const results = args.filter((r, i) => booleans[i]);
			next(null, ...results);
		}
	)(next);
};

const ParallelObjectMap = (mapping) => {
	mapping = catchWrapper(mapping);

	return (next, obj) => {
		next = once(next);

		let left = 0;
		const results = {};

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				left++;
				const val = obj[key];

				const onDone = (err, newVal) => {
					if (err) {
						next(err);
					} else {
						results[key] = newVal;
						left--;
						if (left === 0) {
							next(null, results);
						}
					}
				};

				defer(mapping, once(onDone), key, val);
			}
		}

		// catch for empty object
		if (left === 0) { next(null, {}); }
	};
};

const ParallelObjectFilter = (mapping) => {
	mapping = catchWrapper(mapping);

	return (next, obj) => {
		next = once(next);

		let left = 0;
		const results = {};

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				left++;
				const val = obj[key];

				const onDone = (err, pass) => {
					if (err) {
						next(err);
					} else {
						if (pass) { results[key] = val; }
						left--;
						if (left === 0) {
							next(null, results);
						}
					}
				};

				defer(mapping, once(onDone), key, val);
			}
		}

		// catch for empty object
		if (left === 0) { next(null, {}); }
	};
};

module.exports = {
	InSeries,
	InParallel,
	PassThrough,
	CatchError,
	Logging,
	Assert,
	ParallelForEach,
	ParallelMap,
	ParallelFilter,
	ParallelObjectMap,
	ParallelObjectFilter,
};
