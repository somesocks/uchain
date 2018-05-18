
import { defer, onceWrapper, catchWrapper, nop } from './_common';

const EMPTY = function (next) { return (next || nop)(); };

/**
* ```javascript
*   let chain = InSeries(
*     function(next, ...args) {},
*     function(next, ...args) {},
*     ...
*   );
*
*   chain(next, ...args);
* ```
* Runs several tasks in series, and passes the results from one down to the next.
* This works similarly to the 'waterfall' method in caolan's async.
* ```javascript
*   let chain = InSeries(
*     (next) => { console.log(1); next();}
*     InSeries(
*       (next) => { console.log(2); next();}
*       (next) => { console.log(3); next();}
*     ),
*     InSeries(
*       (next) => { console.log(4); next();}
*       (next) => { console.log(5); next();}
*     )
*   )(); // prints out 1 2 3 4 5, eventually
```
* @param {...taskFunction} tasks - any number of tasks to run in series.
* @returns {taskFunction} a wrapper function that runs the tasks in series
* @memberof uchain
*/
const InSeries = function () {
	const handlers = arguments;

	if (handlers.length === 0) {
		return EMPTY;
	}

	for (let i = 0; i < handlers.length; i++) {
		handlers[i] = catchWrapper(handlers[i]);
	}

	const series = function (next) {
		const args = arguments;
		next = onceWrapper(next);

		let index = 0;

		const worker = function () {
			const args = arguments;

			if (args[0] != null) {
				next.apply(undefined, args);
			} else if (index >= handlers.length) {
				next.apply(undefined, args);
			} else {
				const handler = handlers[index++].bind(undefined, onceWrapper(worker));

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

export default InSeries;
