
/**
* ```javascript
*   let chain = InSeries(
*     function(next, ...args) {...},
*     FromPromise(
*       (...args) => new Promise((resolve, reject) => resolve(...args))
*     ),
*     function(next, ...args) {},
*     ...
*   );
*
*   chain(next, ...args);
* ```
* Alias for PromiseWrapper
* Wraps around a promise generator function,
* to make it easier to integrate with task functions.
* @param {function} generator - a function that generates a promise from the args.
* @returns {taskFunction} a task that wraps around the promise
* @memberof uchain
*/
const FromPromise = require('./PromiseWrapper');

module.exports = FromPromise;
