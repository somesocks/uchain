import { catchWrapper, nop, noarr } from './_common';

/**
* Errors bypass the normal flow of execution.  They're always returned to the last link in the chain, even if they occur inside nested InSeries or InParallel chains.
*
* ```javascript
*   let chain = InSeries(
*     (next) => { console.log(1); next(); }
*     InSeries(
*       (next) => { console.log(2); next(); }
*       (next) => { console.log(3); next('Error'); }
*     ),
*     InSeries(
*       (next) => { console.log(4); next();}
*       (next) => { console.log(5); next();}
*     )
*   )(console.log); // prints out 1 2 3 Error, eventually
* ```
*
* If you need to catch an error explicitly at some point, wrap a chain in CatchError, which will return the error as the first argument to the next function.
*
* ```javascript
*   let chain = InSeries(
*     (next) => { console.log(1); next();}
*     CatchError(
*       InSeries(
*         (next) => { console.log(2); next();}
*         (next) => { console.log(3); next('Error');}
*       ),
*     ),
*     (next, error) => error != null ? console.log('Error Caught') : null,
*     InSeries(
*       (next) => { console.log(4); next();}
*       (next) => { console.log(5); next();}
*     )
*   )(console.log); // prints out 1 2 3 Error Caught 4 5, eventually
* ```
*
* @param {taskFunction} task - a function that checks the arguments.
* @returns {taskFunction} a wrapper function around the task
* @memberof uchain
*/
const CatchError = (task) => {
	task = catchWrapper(task);

	return (next, ...args) => {
		next = next || nop;
		args = args || noarr;

		task(
			(...a) => next(null, ...(a || noarr)),
			...args
		);
	};
};

export default CatchError;
