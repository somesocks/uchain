import { defer, onceWrapper, catchWrapper, nop } from './_common';

const EMPTY = function (next) { return (next || nop)(); };

/**
*
* ```javascript
*   let chain = InParallel(
*     function(next, ...args) {},
*     function(next, ...args) {},
*     ...
*   );
*
*   chain(next, ...args);
* ```
* InParallel accepts a number of functions, and returns a task function that executes all of its child tasks in parallel.
*
* ```javascript
*   let chain = InParallel(
*     (next) => next(null, 1),
*     (next) => next(null, 2),
*     (next) => next(null, 3, 4),
*   );
*
*   let onDone = (err, ...results) => console.log(results);
*
*   chain(onDone); // prints out [ 1 ] [ 2 ] [ 3, 4 ], eventually
* ```
* note: because the callbacks can return any number of results,
* the results from each task are autoboxed into an array.
* This includes an empty array for tasks that don't return results.
* @param {...taskFunction} tasks - any number of tasks to run in parallel.
* @returns {taskFunction} a wrapper function that runs the tasks in parallel
* @memberof uchain
*/
const InParallel = function () {
	const handlers = arguments;

	if (handlers.length === 0) {
		return EMPTY;
	}

	const parallel = function (next) {
		const args = arguments;
		next = onceWrapper(next);

		const results = Array(handlers.length + 1);
		let done = 0;

		for (let i = 0; i < handlers.length; i++) {
			const onDone = function (err, ...res) {
				if (err) {
					next(err, ...res);
				} else {
					results[i + 1] = res;
					done++;
					if (done === handlers.length) {
						next.apply(undefined, results);
					}
				}
			};

			const handler = catchWrapper(handlers[i])
				.bind(undefined, onceWrapper(onDone));

			args[0] = handler;
			args.length = args.length > 1 ? args.length : 1;

			defer.apply(undefined, args);
		}
	};

	return parallel;
};


export default InParallel;
