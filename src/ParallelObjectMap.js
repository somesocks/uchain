
import _catchWrapper from './_catchWrapper';
import _defer from './_defer';
import _onceWrapper from './_onceWrapper';

/**
* Similar to ParallelMap, but instead of running on an array of arguments, it runs a filter on every key-value pair in an object.
* @param {taskFunction} task - an asynchronous map function.
* @returns {taskFunction} a parallel map task
* @memberof uchain
*/
const ParallelObjectMap = (mapping) => {
	mapping = _catchWrapper(mapping);

	return (next, obj) => {
		next = _onceWrapper(next);

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

				_defer(mapping, _onceWrapper(onDone), key, val);
			}
		}

		// catch for empty object
		if (left === 0) { next(null, {}); }
	};
};


export default ParallelObjectMap;
