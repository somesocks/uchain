
import { catchWrapper, nop, noarr } from './_common';

const DEFAULT_TRY = (next, ...args) => next(null, ...args);

const DEFAULT_CATCH = (next, err, ...args) => next(err, ...args);

const DEFAULT_FINALLY = (next, err, ...args) => next(err, ...args);

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
* @param {taskFunction} _catch
* @param {taskFunction} _finally
* @returns {taskFunction}
* @memberof uchain
*/
const TryCatch = (_try, _catch, _finally) => {
	_try = _try || DEFAULT_TRY;
	_try = catchWrapper(_try);

	_catch = _catch || DEFAULT_CATCH;
	_catch = catchWrapper(_catch);

	_finally = _finally || DEFAULT_FINALLY;
	_finally = catchWrapper(_finally);

	const wrapper = function (next, ...args) {
		const onCatch = function (err, ...res) {
			_finally(next, err, ...res);
		};

		const onTry = function (err, ...res) {
			if (err) {
				_catch(onCatch, err, ...res);
			} else {
				_finally(next, err, ...res);
			}
		};

		_try(onTry, ...args);
	};

	return wrapper;
};

export default TryCatch;
