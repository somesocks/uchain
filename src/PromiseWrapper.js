
import _catchWrapper from './_catchWrapper';
import PassThrough from './PassThrough';

/**
* ```javascript
*   let chain = InSeries(
*     function(next, ...args) {...},
*     PromiseWrapper(
*       (...args) => new Promise((resolve, reject) => resolve(...args))
*     ),
*     function(next, ...args) {},
*     ...
*   );
*
*   chain(next, ...args);
* ```
* Wraps around a promise generator function,
* to make it easier to integrate with task functions.
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

	return _catchWrapper(promiseWrapper);
};

export default PromiseWrapper;
