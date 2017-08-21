
const { catchWrapper } = require('./_base');
const PassThrough = require('./PassThrough');

/**
* Wraps around a promise generator function, to make it easier t.
* @param {function} generator - a function that generates a promise from the args.
* @returns {taskFunction} a task that wraps around the promise
* @memberof uchain
*/
const PromiseWrapper = (promiseGenerator) => {
	if (promiseGenerator == null) {
		return PassThrough;
	}

	const promiseWrapper = (next, ...args) => {
		const promise = promiseGenerator(...args);
		return promise
			.then(
				(...res) => next(null, ...res),
				next
			);
	};

	return catchWrapper(promiseWrapper);
};

module.exports = PromiseWrapper;
