
const { defer, once, catchWrapper, nop, StackError } = require('./_base');

const EMPTY = function (next) { return (next || nop)(); };

const InSeries = function () {
	const handlers = arguments;

	if (handlers.length === 0) {
		return EMPTY;
	}

	const series = function () {
		const args = arguments;
		const next = once(args[0]);

		let index = 0;

		const worker = function () {
			const args = arguments;

			if (args[0] != null) {
				next.apply(undefined, args);
			} else if (index >= handlers.length) {
				next.apply(undefined, args);
			} else {
				const handler = catchWrapper(handlers[index++])
					.bind(undefined, once(worker));

				args[0] = handler;
				args.length = args.length || 1;
				defer.apply(undefined, args);
			}
		};

		args[0] = undefined;
		worker.apply(undefined, args);
	};

	return series;
};

module.exports = InSeries;
