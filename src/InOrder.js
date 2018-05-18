
import _catchWrapper from './_catchWrapper';
import _defer from './_defer';
import _nop from './_nop';
import _onceWrapper from './_onceWrapper';

const EMPTY = function (next) { return (next || _nop)(); };

/**
* ```javascript
*   let chain = InOrder(
*     function(next, ...args) {},
*     function(next, ...args) {},
*     ...
*   );
*
*   chain(next, ...args);
* ```
* Runs several asynchronous tasks one after another.
* Each task gets the arguments that were originally passed into the wrapper.
* This is different from InSeries, where the output of each is task is passed as the input to the next.
* ```javascript
*   let chain = InOrder(
*     (next, a) => { a.val = 1; console.log(a.val); next();}
*     (next) => { a.val = 2; console.log(a.val); next();}
*     (next) => { a.val = 3; console.log(a.val); next();}
*   )(null, {}); // prints out 1 2 3, eventually
```
* @param {...taskFunction} tasks - any number of tasks to run in order.
* @returns {taskFunction} a wrapper function that runs the tasks in order
* @memberof uchain
*/
const InOrder = function () {
	const handlers = arguments;

	if (handlers.length === 0) {
		return EMPTY;
	}

	const series = function (next) {
		const args = arguments;
		next = _onceWrapper(next);

		let index = 0;

		const worker = function () {
			const args2 = arguments;

			if (args2[0] != null) {
				args[0] = args2[0];
				next.apply(undefined, args);
			} else if (index >= handlers.length) {
				args[0] = undefined;
				next.apply(undefined, args);
			} else {
				const handler = _catchWrapper(handlers[index++])
					.bind(undefined, _onceWrapper(worker));

				args[0] = handler;
				args.length = args.length || 1;
				_defer.apply(undefined, args);
			}
		};

		args[0] = undefined;
		worker.apply(undefined, args);
	};

	return series;
};

export default InOrder;
