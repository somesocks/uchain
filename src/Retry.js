
const { once, nop, catchWrapper } = require('./_base');

const EMPTY_TASK = (next) => next();

/**
* Wraps a task and attempts to retry if it throws an error, with an exponential backoff.
* @param {taskFunction} task - the task to wrap.
* @param {object} options - an optional set of retry options.
* @param {object} options.timeout - maximum time to attempt retries.
* @param {object} options.retries - maximum number of retries to attempt.
* @returns {taskFunction} a task
* @memberof uchain
*/
const Retry = function (task, options) {
	task = catchWrapper(task || EMPTY_TASK);
	options = options || {};
	options.timeout = 8192;
	options.retries = 8;

	const wrapper = function (next, ...args) {
		next = next || nop;

		const timeStarted = Date.now();
		let retries = 0;

		const onDone = (err, ...res) => {
			const elapsedTime = Date.now() - timeStarted;
			if ((err != null) && (retries < options.retries) && (elapsedTime < options.timeout)) {
				const delay = (1 << retries);
				retries++;
				setTimeout(task, delay, onDone, ...args);
			} else {
				next(err, ...res);
			}
		};

		task(onDone, ...args);
	};

	return wrapper;
};

module.exports = Retry;
