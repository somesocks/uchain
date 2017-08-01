
const { defer, once, catchWrapper, nop, noarr } = require('./_base');

const EMPTY = function (next) { return (next || nop)(); };

const InParallel = function () {
	const handlers = arguments;

	if (handlers.length === 0) {
		return EMPTY;
	}

	const parallel = function (next) {
		const args = arguments;
		next = once(next);

		const results = Array(handlers.length + 1);
		let done = 0;

		for (let i = 0; i < handlers.length; i++) {
			const onDone = function (err, ...res) {
				if (err) {
					next(err);
				} else {
					results[i + 1] = res;
					done++;
					if (done === handlers.length) {
						next.apply(undefined, results);
					}
				}
			};

			const handler = catchWrapper(handlers[i])
				.bind(undefined, once(onDone));

			args[0] = handler;
			args.length = args.length > 1 ? args.length : 1;

			defer.apply(undefined, args);
		}
	};

	return parallel;
};


module.exports = InParallel;
