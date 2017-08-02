
const { defer, once, catchWrapper } = require('./_base');

/**
* Similar to ParallelMap, but instead of running on an array of arguments, it runs a filter on every key-value pair in an object.
* @param {taskFunction} task - an asynchronous map function.
* @returns {taskFunction} a parallel map task
* @memberof uchain
*/
const ParallelObjectMap = (mapping) => {
	mapping = catchWrapper(mapping);

	return (next, obj) => {
		next = once(next);

		let left = 0;
		const results = {};

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				left++;
				const val = obj[key];

				const onDone = (err, newVal) => {
					if (err) {
						next(err);
					} else {
						results[key] = newVal;
						left--;
						if (left === 0) {
							next(null, results);
						}
					}
				};

				defer(mapping, once(onDone), key, val);
			}
		}

		// catch for empty object
		if (left === 0) { next(null, {}); }
	};
};


module.exports = ParallelObjectMap;
