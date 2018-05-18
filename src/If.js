import { noarr, onceWrapper, catchWrapper } from './_common';

import PassThrough from './PassThrough';

/**
*
* ```javascript
*   let task = If(
*     function(next, ...args) {},
*     function(next, ...args) {},
*     function(next, ...args) {}
*   );
*
*   chain(next, ...args);
* ```
* If accepts up to three tasks and returns a task that conditionally executes some.
*
* ```javascript
*   let logIfEven = If(
*     (next, num) => next(null, num % 2 === 0)
*     (next, num) => { console.log('is even!'); next(null, num); },
*     (next, num) => { console.log('is not even!'); next(null, num); },
*   );
*
*   let onDone = (err, ...results) => console.log(results);
*
*   logIfEven(null, 1); // prints out 'is not even!' eventually
*   logIfEven(null, 2); // prints out 'is even!' eventually
* ```
* note: by default, the conditionTask, thenTask, and elseTask are all set to PassThrough
* note: the conditionTask can return multiple results, but only the first is checked for truthiness
* @param {taskFunction} conditionTask - a condition task.
* @param {taskFunction} thenTask - a task to run if the condition returns a truthy value.
* @param {taskFunction} elseTask - a task to run if the condition returns a falsy value.
* @returns {taskFunction}
* @memberof uchain
*/
const If = function (conditionTask, thenTask, elseTask) {
	conditionTask = conditionTask != null ? catchWrapper(conditionTask) : PassThrough;
	thenTask = thenTask != null ? catchWrapper(thenTask) : PassThrough;
	elseTask = elseTask != null ? catchWrapper(elseTask) : PassThrough;

	return function (next, ...args) {
		next = next || onceWrapper(next);
		args = args || noarr;

		const onCondition = function (err, res) {
			if (err) {
				next(err, res);
			} else if (res) {
				thenTask(next, ...args);
			} else {
				elseTask(next, ...args);
			}
		};
		conditionTask(onCondition, ...args);
	};
};

export default If;
