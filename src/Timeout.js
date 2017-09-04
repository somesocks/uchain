
const { defer, once, catchWrapper, nop, noarr } = require('./_base');

const Race = require('./Race');
const PassThrough = require('./PassThrough');

/**
*
* ```javascript
*   let chain = Timeout(
*     function(next, ...args) {},
*			1000
*   );
*
*   chain(next, ...args);
* ```
*
* Timeout wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.
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
const Timeout = (task = PassThrough, ms = 1000) => Race(
	(next) => setTimeout(next, ms),
	task
);

module.exports = Timeout;
