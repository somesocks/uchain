
class Node {
	constructor(val) {
		this.val = val;
		this.prev = this;
		return this;
	}
}

class Queue {
	constructor() {
		let tail = new Node();
		let head = tail;
		let length = 0;

		this.push = (val) => {
			if (length === 0) {
				head.val = val;
			} else {
				const node = new Node(val);
				head.prev = node;
				head = node;
			}
			length++;
			return this;
		};

		this.pop = () => {
			const val = tail.val;
			tail = tail.prev;
			length = length > 0 ? length - 1 : 0;
			if (length === 0) {
				tail.val = undefined;
			}
			return val;
		};

		this.length = () => length;

		this.empty = () => {
			tail = new Node();
			head = tail;
			length = 0;
		};

		return this;
	}

}

module.exports = Queue;
