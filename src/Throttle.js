const PassThrough = require('./PassThrough');

const Queue = require('./Queue');

/**
* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
* Requests are queued up in an unbounded FIFO queue until they can be run.
* @param {taskFunction} task - the task to throttle
* @param {number} limit - the number of instances that can run in parallel. default 1.
* @returns {taskFunction} a task
* @memberof uchain
*/
const Throttle = (task = PassThrough, limit = 1) => {
	const queue = new Queue();
	let running = 0;

	const throttle = (next, ...rest) => {
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

module.exports = Throttle;
