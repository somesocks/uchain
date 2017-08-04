/** @namespace uchain */

/**
* An async callback function.
*
* @callback nextFunction
* @param {error} err
* @param {...*} results
*/


/**
* An async task function.
*
* @callback taskFunction
* @param {nextFunction} next
* @param {...*} args
*/

module.exports = {
	Assert: require('./Assert'),
	CatchError: require('./CatchError'),
	If: require('./If'),
	InParallel: require('./InParallel'),
	InSeries: require('./InSeries'),
	Logging: require('./Logging'),
	ParallelFilter: require('./ParallelFilter'),
	ParallelForEach: require('./ParallelForEach'),
	ParallelMap: require('./ParallelMap'),
	ParallelObjectFilter: require('./ParallelObjectFilter'),
	ParallelObjectMap: require('./ParallelObjectMap'),
	PassThrough: require('./PassThrough'),
	Race: require('./Race'),
	Throttle: require('./Throttle'),
	Timer: require('./Timer'),
};
