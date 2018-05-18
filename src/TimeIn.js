
import PassThrough from './PassThrough';
import InSeries from './InSeries';
import InParallel from './InParallel';

/**
*
* ```javascript
*   let chain = TimeIn(
*     function(next, ...args) {},
*			1000
*   );
*
*   chain(next, ...args);
* ```
*
* TimeIn wraps a single task function, and returns a function that only returns after X ms.
*
* @param {taskFunction} task - the task to wrap in a timeout.
* @param {number} ms - the timein in ms.
* @returns {taskFunction} a task
* @memberof uchain
*/
const TimeIn = (task = PassThrough, ms = 1000) =>
	InSeries(
		InParallel(
			task,
			(next) => setTimeout(next, ms)
		),
		(next, results) => next(null, ...results)
	);

module.exports = TimeIn;
