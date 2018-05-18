import _nop from './_nop';

export default function (func) {
	return function (next) {
		try {
			func.apply(undefined, arguments);
		} catch (err) {
			next = next || _nop;
			next(err);
		}
	};
}
