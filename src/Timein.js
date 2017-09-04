
const { defer, once, catchWrapper, nop, noarr } = require('./_base');

const Race = require('./Race');
const PassThrough = require('./PassThrough');
const InSeries = require('./InSeries');
const InParallel = require('./InParallel');

/**
*
* ```javascript
*   let chain = Timein(
*     function(next, ...args) {},
*			1000
*   );
*
*   chain(next, ...args);
* ```
*
* Timein wraps a single task function, and returns a function that only returns after X ms.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timein in ms.
* @returns {taskFunction} a task
* @memberof uchain
*/
const Timein = (task = PassThrough, ms = 1000) =>
	InSeries(
		InParallel(
			task,
			(next) => setTimeout(next, ms)
		),
		(next, results) => next(null, ...results)
	);

module.exports = Timein;
