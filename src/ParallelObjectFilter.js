
const { defer, once, catchWrapper } = require('./_base');

const ParallelObjectFilter = (mapping) => {
	mapping = catchWrapper(mapping);

	return (next, obj) => {
		next = once(next);

		let left = 0;
		const results = {};

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				left++;
				const val = obj[key];

				const onDone = (err, pass) => {
					if (err) {
						next(err);
					} else {
						if (pass) { results[key] = val; }
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


module.exports = ParallelObjectFilter;
