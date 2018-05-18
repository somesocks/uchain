
import _catchWrapper from './_catchWrapper';
import _defer from './_defer';
import _noarr from './_noarr';
import _nop from './_nop';
import _onceWrapper from './_onceWrapper';

/**
*
* ```javascript
*   let chain = Race(
*     function(next, ...args) {},
*     function(next, ...args) {},
*     ...
*   );
*
*   chain(next, ...args);
* ```
*
* Race accepts a number of functions, and returns a task function that executes all of its child tasks simultaneously.  The first result (or error) is returned, and the remaining results (or errors) are ignored.
*
* ```javascript
*   let chain = Race(
*     (next) => next(null, 1),
*     (next) => setTimeout(next, 100, null, 2),
*     (next) => { throw new Error(); } ,
*   );
*
*   let onDone = (err, ...results) => console.log(results);
*
*   chain(onDone); // prints out [ 1 ], eventually
* ```
*
* @param {...taskFunction} tasks - any number of tasks to run in parallel.
* @returns {taskFunction} a task
* @memberof uchain
*/
const Race = (...tasks) => {
	tasks = tasks || _noarr;

	if (tasks.length === 0) {
		return (next) => (next || _nop)();
	}

	tasks = tasks.map(_catchWrapper);

	return (next, ...args) => {
		next = _onceWrapper(next);
		args = args || _noarr;

		for (let i = 0; i < tasks.length; i++) {
			const task = tasks[i];
			_defer(task, next, ...args);
		}
	};
};

export default Race;
