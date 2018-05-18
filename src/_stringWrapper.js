import isString from './_isString';
import isFunction from './_isFunction';

export default function (log) {
	if (isFunction(log)) {
		return log;
	} else if (isString(log)) {
		return () => log;
	} else {
		return () => '';
	}
}
