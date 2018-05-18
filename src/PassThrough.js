
import _nop from './_nop';

/**
*
* Sometimes, you need to pass previous arguments along with a new result.  The easiest way to do this is to use PassThrough, which is a convenience method for:
* ```javascript
*  (next, ...args) => next(null, ...args),
* ```
* @memberof uchain
*/
const PassThrough = function (next) {
	const args = arguments;
	next = next || _nop;
	args[0] = undefined;
	next.apply(undefined, args);
};

export default PassThrough;
