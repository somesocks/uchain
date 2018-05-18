
import { onceWrapper, catchWrapper } from './_common';

const EMPTY_TASK = (next) => next();

/**
* Wraps a task and logs how long it takes to finish, or fail.
* @param {taskFunction} task - the task to wrap.
* @param {string} label - an optional label to log.
* @returns {taskFunction} a task
* @memberof uchain
*/
const Timer = function (task, label) {
	task = catchWrapper(task || EMPTY_TASK);
	label = label || task.name || 'task';

	const timer = function (next, ...args) {
		const start = Date.now();
		next = onceWrapper(next);

		const done = (err, ...rest) => {
			const end = Date.now();
			console.log(
				err ?
					`Timer: ${label} failed in ${end - start}ms` :
					`Timer: ${label} finished in ${end - start}ms`
			);
			next(err, ...rest);
		};

		task(done, ...args);
	};

	return timer;
};

export default Timer;
