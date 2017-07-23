
const { defer, once, catchWrapper, nop, noarr } = require('./_base');

// const InParallel = (...handlers) => {
// 	if (handlers.length === 0) {
// 		return (next) => (next || nop)();
// 	} else {
// 		handlers = handlers.map(catchWrapper);
//
// 		return (next, ...args) => {
// 			next = once(next);
// 			args = args || noarr;
//
// 			let done = 0;
// 			const results = [];
//
// 			for (let i = 0; i < handlers.length; i++) {
// 				const h = handlers[i];
//
// 				const onDone = (err, ...res) => {
// 					res = res || noarr;
// 					if (err) {
// 						next(err);
// 					} else {
// 						done++;
// 						results[i] = res;
// 						if (done === handlers.length) {
// 							next(null, ...results);
// 						}
// 					}
// 				};
//
// 				defer(h, once(onDone), ...args);
// 			}
// 		};
// 	}
// };


const EMPTY = function (next) { return (next || nop)(); };


const InParallel = function () {
	const handlers = arguments;

	if (handlers.length === 0) {
		return EMPTY;
	}

	const parallel = function () {
		const args = arguments;
		const next = once(args[0]);

		const results = Array(handlers.length + 1);
		let done = 0;

		for (let i = 0; i < handlers.length; i++) {
			const onDone = function () {
				const args = arguments;
				const err = args[0];
				if (err) {
					next(err);
				} else {
					const res = args;
					if (res.length > 0) {
						for (let j = 0; j < res.length; j++) { res[j] = res[j + 1]; }
						res.length--;
					}
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
