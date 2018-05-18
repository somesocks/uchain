export default function (a, b) {
	return function () {
		a.apply(this, arguments);
		b.apply(this, arguments);
	};
}
