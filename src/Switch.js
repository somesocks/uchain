
import { onceWrapper, catchWrapper, noarr } from './_common';

import PassThrough from './PassThrough';

/**
* Switch accepts a lookup task and a map.
* @param {taskFunction} lookupTask - a lookup task.
* @param {object} caseMap - a task to run if the condition returns a falsy value.
* @returns {taskFunction}
* @memberof uchain
*/
const Switch = function (lookupTask, caseMap) {
	lookupTask = lookupTask != null ? catchWrapper(lookupTask) : (next) => next();
	caseMap = caseMap || {};

	return function (next, ...args) {
		next = next || onceWrapper(next);
		args = args || noarr;

		const onLookup = function (err, key) {
			if (err) {
				next(err, key);
				return;
			}

			const task = caseMap[key] || caseMap.default || PassThrough;
			task(next, ...args);
		};

		lookupTask(onLookup, ...args);
	};
};

export default Switch;
