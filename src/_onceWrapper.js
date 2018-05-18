
import _nop from './_nop';

export default function (func) {
	return function () {
		const temp = func || _nop;
		func = _nop;
		temp.apply(undefined, arguments);
	};
}
