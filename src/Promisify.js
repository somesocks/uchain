
import { catchWrapper } from './_common';
import PassThrough from './PassThrough';

/**
* ```javascript
*
*   let chain = InSeries(
*     function(next, ...args) {...},
*     function(next, ...args) {...},
*     ...
*   );
*
*  new Promise()
*    .then(
*      Promisify(chain)
*    );
*
* ```
*
* Wraps around a task function and greates a promise generator,
* to make it easier to integrate task functions and promises.
*
* NOTE: uchain does not come bundled with a promise library,
* it expects Promise to already exists in the global namespace.
*
* NOTE: because uchain can 'return' multiple values through the next callback,
* Promisify always resolves to an array of the results returned.
*
* @param {function} task - a function that generates a promise from the args.
* @returns {function} a function that generates a Promise when called
* @memberof uchain
*/
const Promisify = (task) => {
	if (task == null) {
		return PassThrough;
	} else {
		task = catchWrapper(task);
	}

	const taskWrapper = function (...args) {
		const handler = (resolve, reject) => {
			const callback = (err, ...results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			};

			task(callback, ...args);
		};

		return new Promise(handler);
	};

	return taskWrapper;
};

export default Promisify;
