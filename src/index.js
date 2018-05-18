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

/**
* A string building function.
*
* @callback stringBuilder
* @param {...*} args
* @returns {string} the string
*/

// const {
// 	Assert,
// 	PassThrough,
// 	InSeries,
// 	InParallel,
// } = require('./uchain');
//
// module.exports = {
// 	Assert,
// 	InSeries,
// 	InParallel,
// 	PassThrough,
// };

import Assert from './Assert';
import CatchError from './CatchError';
import FromPromise from './FromPromise';
import If from './If';
import InOrder from './InOrder';
import InParallel from './InParallel';
import InSeries from './InSeries';
import Logging from './Logging';
import ParallelFilter from './ParallelFilter';
import ParallelForEach from './ParallelForEach';
import ParallelMap from './ParallelMap';
import ParallelObjectFilter from './ParallelObjectFilter';
import ParallelObjectMap from './ParallelObjectMap';
import PassThrough from './PassThrough';
import PromiseWrapper from './PromiseWrapper';
import Promisify from './Promisify';
import Race from './Race';
import Retry from './Retry';
import Switch from './Switch';
import Throttle from './Throttle';
import TimeIn from './TimeIn';
import TimeOut from './TimeOut';
import Timer from './Timer';
import ToPromise from './ToPromise';
import TryCatch from './TryCatch';
import While from './While';

module.exports = {
	Assert,
	CatchError,
	FromPromise,
	If,
	InOrder,
	InParallel,
	InSeries,
	Logging,
	ParallelFilter,
	ParallelForEach,
	ParallelMap,
	ParallelObjectFilter,
	ParallelObjectMap,
	PassThrough,
	PromiseWrapper,
	Promisify,
	Race,
	Retry,
	Switch,
	Throttle,
	TimeIn,
	TimeOut,
	Timer,
	ToPromise,
	TryCatch,
	While,
};
