
import { defer, onceWrapper, catchWrapper, nop, noarr } from './_common';

import Race from './Race';
import PassThrough from './PassThrough';

/**
*
* ```javascript
*   let chain = TimeOut(
*     function(next, ...args) {},
*			1000
*   );
*
*   chain(next, ...args);
* ```
*
* TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.
*
* NOTE: no error is thrown on a timeout, the result is merely undefined.
*
* NOTE: the timeout being triggered will not cancel the original task.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timeout in ms.
* @returns {taskFunction} a task
* @memberof uchain
*/
const TimeOut = (task = PassThrough, ms = 1000) => Race(
	(next) => setTimeout(next, ms),
	task
);

export default TimeOut;
