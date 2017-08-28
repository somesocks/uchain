/* eslint-env mocha */

const { InSeries, Assert, CatchError, PassThrough, PromiseWrapper, Logging, Promisify } = require('../dist');

describe('Promisify tests', () => {
	it('Promisify works', (done) => {
		new Promise((resolve) => resolve())
		.then(
			Promisify((next) => next())
		)
		.then(() => done());
	});

	it('Promisify catches callback errors', (done) => {
		const onCatch = (err) => {
			if (err == null) {
				done(new Error('didnt catch'));
			} else {
				done();
			}
		};

		new Promise((resolve) => resolve())
		.then(
			Promisify((next) => next(new Error('throw error')))
		)
		.catch(onCatch);
	});

	it('Promisify catches thrown errors', (done) => {
		const onCatch = (err) => {
			if (err == null) {
				done(new Error('didnt catch'));
			} else {
				done();
			}
		};

		new Promise((resolve) => resolve())
		.then(
			Promisify((next) => { throw new Error('throw error'); })
		)
		.catch(onCatch);
	});
});
