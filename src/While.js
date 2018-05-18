
import _catchWrapper from './_catchWrapper';
import _noarr from './_noarr';
import _onceWrapper from './_onceWrapper';

import PassThrough from './PassThrough';

/**
*
* ```javascript
*   let task = While(
*     function(next, ...args) {},
*     function(next, ...args) {},
*   );
*
*   chain(next, ...args);
* ```
* While accepts two tasks and returns a task that conditionally executes some.
*
* ```javascript
*   let incUntil10 = While(
*     (next, num) => next(null, num < 10),
*     (next, num) => { console.log('num', nul); next(null, num + 1); },
*   );
*
*   let onDone = (err, ...results) => console.log(results);
*
*   incUntil10(null, 1); // prints 1, 2, ... 9
* ```
* note: the results of the loop task are saved to pass into the conditionTask, and the loopTask
* note: when the condition task returns false, those results are passed down the chain
* @param {taskFunction} conditionTask - a condition task.
* @param {taskFunction} loopTask - a task to run if the condition returns a truthy value.
* @returns {taskFunction}
* @memberof uchain
*/
const While = function (conditionTask, loopTask) {
	conditionTask = conditionTask != null ? _catchWrapper(conditionTask) : (next) => next(null, false);
	loopTask = loopTask != null ? _catchWrapper(loopTask) : PassThrough;

	return function (next, ...args) {
		next = next || _onceWrapper(next);
		args = args || _noarr;

		let onCondition;
		let onLoop;

		onCondition = function (err, res) {
			if (err) {
				next(err, res);
			} else if (res) {
				loopTask(onLoop, ...args);
			} else {
				next(null, ...args);
			}
		};

		onLoop = function (err, ...res) {
			if (err) {
				next(err, ...res);
			} else {
				args = res;
				conditionTask(onCondition, ...args);
			}
		};

		conditionTask(onCondition, ...args);
	};
};

export default While;
