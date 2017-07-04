
const PassThrough = (next, ...args) => next(null, ...args);

module.exports = PassThrough;
