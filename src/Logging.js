
const Logging = (tag) => (next, ...args) => {
	console.log(tag, args);
	next(null, ...args);
};

module.exports = Logging;
