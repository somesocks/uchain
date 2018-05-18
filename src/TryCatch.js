
import _catchWrapper from './_catchWrapper';

const DEFAULT_TRY = (next, ...args) => next(null, ...args);

const DEFAULT_catchWrapper = (next, err, ...args) => next(err, ...args);

const DEFAULTfinallyTask = (next, err, ...args) => next(err, ...args);

/**
* Errors bypass the normal flow of execution.  They always return to the last link in the chain, even if they occur inside nested InSeries or InParallel chains.
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
* If you need to catch an error explicitly at some point, `wrap a chain in CatchError`, which will return the error as the first argument to the next function.
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
* @param {taskFunction} _try
* @param {taskFunction} _catchWrapper
* @param {taskFunction} finallyTask
* @returns {taskFunction}
* @memberof uchain
*/
const TryCatch = (tryTask, catchTask, finallyTask) => {
	tryTask = tryTask || DEFAULT_TRY;
	tryTask = _catchWrapper(tryTask);

	catchTask = catchTask || DEFAULT_catchWrapper;
	catchTask = _catchWrapper(catchTask);

	finallyTask = finallyTask || DEFAULTfinallyTask;
	finallyTask = _catchWrapper(finallyTask);

	const wrapper = function (next, ...args) {
		const onCatch = function (err, ...res) {
			finallyTask(next, err, ...res);
		};

		const onTry = function (err, ...res) {
			if (err) {
				catchTask(onCatch, err, ...res);
			} else {
				finallyTask(next, err, ...res);
			}
		};

		tryTask(onTry, ...args);
	};

	return wrapper;
};

export default TryCatch;
