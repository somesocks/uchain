const PassThrough = require('./PassThrough');

class Queue {
	constructor() {
		this._queue = {};
		this.head = 0;
		this.tail = 0;
		this.churn = 0;

		this.push = this.push.bind(this);
		this.pop = this.pop.bind(this);
		this.length = this.length.bind(this);

		return this;
	}

	push(thing) {
		this._queue[this.head] = thing;
		this.head++;
		return this;
	}

	pop() {
		if (this.head > this.tail) {
			const thing = this._queue[this.tail];
			this._queue[this.tail] = null;
			this.tail++;
			this.churn++;

			return thing;
		} else {
			return null;
		}
	}

	length() { return this.head - this.tail; }
}


const Throttle = (task = PassThrough, limit = 1) => {
	const queue = new Queue();
	let running = 0;

	const throttle = (next, ...rest) => {
		const after = (...results) => {
			running--;
			if (running < limit && queue.length() > 0) {
				const oldArgs = queue.pop();
				throttle(...oldArgs);
			}

			next(...results);
		};

		if (running < limit) {
			running++;
			task(after, ...rest);
		} else {
			queue.push([ next, ...rest ]);
		}
	};

	return throttle;
};

module.exports = Throttle;
