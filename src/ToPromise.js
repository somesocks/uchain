
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
*      ToPromise(chain)
*    );
*
* ```
*
* Alias for Promisify
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
import ToPromise from './Promisify';

export default ToPromise;
