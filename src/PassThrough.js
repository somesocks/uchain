
const { nop } = require('./_base');

/**
*
* Sometimes, you need to pass previous arguments along with a new result.  The easiest way to do this is to use PassThrough, which is a convenience method for:
* ```javascript
*  (next, ...args) => next(null, ...args),
* ```
* @memberof uchain
*/
const PassThrough = function () {
	const args = arguments;
	const next = args[0] || nop;
	args[0] = undefined;
	next.apply(undefined, args);
};

module.exports = PassThrough;
