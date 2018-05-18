
import _catchWrapper from './_catchWrapper';
import _onceWrapper from './_onceWrapper';
import Queue from './_queue';

import PassThrough from './PassThrough';

/**
* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
* Requests are queued up in an unbounded FIFO queue until they can be run.
* @param {taskFunction} task - the task to throttle
* @param {number} limit - the number of instances that can run in parallel. default 1.
* @returns {taskFunction} a task
* @memberof uchain
*/
const Throttle = (task = PassThrough, limit = 1) => {
	const queue = new Throttle.Queue();
	let running = 0;

	const throttle = (next, ...rest) => {
		next = _onceWrapper(next);

		const after = (...results) => {
			running--;
			if (running < limit && queue.length() > 0) {
				const oldArgs = queue.pop();
				throttle(...oldArgs);
			}

			next(...results);
		};

		if (running < limit) {
			running++;
			task(after, ...rest);
		} else {
			queue.push([ next, ...rest ]);
		}
	};

	return throttle;
};

Throttle.Queue = Queue;

export default Throttle;
