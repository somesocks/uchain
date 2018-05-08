(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["uchain"] = factory();
	else
		root["uchain"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/** @namespace uchain */

	/**
	* An async callback function.
	*
	* @callback nextFunction
	* @param {error} err
	* @param {...*} results
	*/

	/**
	* An async task function.
	*
	* @callback taskFunction
	* @param {nextFunction} next
	* @param {...*} args
	*/

	/**
	* A string building function.
	*
	* @callback stringBuilder
	* @param {...*} args
	* @returns {string} the string
	*/

	module.exports = {
		Assert: __webpack_require__(2),
		CatchError: __webpack_require__(7),
		FromPromise: __webpack_require__(8),
		If: __webpack_require__(11),
		InParallel: __webpack_require__(12),
		InSeries: __webpack_require__(13),
		InOrder: __webpack_require__(14),
		Logging: __webpack_require__(15),
		ParallelFilter: __webpack_require__(16),
		ParallelForEach: __webpack_require__(18),
		ParallelMap: __webpack_require__(17),
		ParallelObjectFilter: __webpack_require__(19),
		ParallelObjectMap: __webpack_require__(20),
		PassThrough: __webpack_require__(10),
		PromiseWrapper: __webpack_require__(9),
		Promisify: __webpack_require__(21),
		Race: __webpack_require__(22),
		Retry: __webpack_require__(23),
		Switch: __webpack_require__(24),
		Throttle: __webpack_require__(25),
		TimeIn: __webpack_require__(27),
		TimeOut: __webpack_require__(28),
		Timer: __webpack_require__(29),
		ToPromise: __webpack_require__(30),
		TryCatch: __webpack_require__(31),
		While: __webpack_require__(32)
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    nop = _require.nop,
	    noarr = _require.noarr,
	    catchWrapper = _require.catchWrapper,
	    isFunction = _require.isFunction,
	    isString = _require.isString;

	var stringBuilder = function stringBuilder(log) {
		var builder = (isFunction(log) ? log : null) || (isString(log) ? function () {
			return log;
		} : null) || function () {
			return '';
		};

		return builder;
	};

	/**
	* Builds an async assertion task.  When called, if the arguments do not match the validator functions,
	* Assert passes an error to its callback.
	* @param {function} validator - a function that checks the arguments.
	* @param {string} message - an optional error message to throw if the assertion fails, or a message builder function.
	* @returns {taskFunction} an assertion task
	* @memberof uchain
	*/
	var Assert = function Assert(validator, message) {
		validator = validator || nop;
		message = message || 'uchain assert failed';
		message = stringBuilder(message);

		return catchWrapper(function (next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || nop;
			args = args || noarr;
			var err = validator(args) ? null : new Error(message.apply(undefined, _toConsumableArray(args)));
			next.apply(undefined, [err].concat(_toConsumableArray(args)));
		});
	};

	module.exports = Assert;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {'use strict';

	__webpack_require__(5);

	var noarr = [];

	var nop = function nop(err) {
		if (err) {
			console.warn('Warning: uchain ignored error\n', err);
		}
	};

	var once = function once(func) {
		return function () {
			var args = arguments;
			var temp = func || nop;
			func = nop;
			temp.apply(undefined, args);
		};
	};

	var isString = function isString(val) {
		return typeof val === 'string' || val instanceof String;
	};

	var isFunction = function isFunction(val) {
		return typeof val === 'function';
	};

	// const defer = function () {
	// 	const args = arguments;
	// 	console.log('defer args', args, args.length);
	// 	setImmediate.apply(undefined, args);
	// };
	//
	var defer = setImmediate;

	var catchWrapper = function catchWrapper(func) {
		return function (next) {
			var args = arguments;
			try {
				func.apply(undefined, args);
			} catch (err) {
				next = next || nop;
				next(err);
			}
		};
	};

	module.exports = {
		nop: nop,
		noarr: noarr,
		once: once,
		defer: defer,
		catchWrapper: catchWrapper,
		isString: isString,
		isFunction: isFunction
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).setImmediate))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
	            (typeof self !== "undefined" && self) ||
	            window;
	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(scope, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(5);
	// On some exotic environments, it's not clear which object `setimmediate` was
	// able to install onto.  Search each possibility in the same order as the
	// `setimmediate` library.
	exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
	                       (typeof global !== "undefined" && global.setImmediate) ||
	                       (this && this.setImmediate);
	exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
	                         (typeof global !== "undefined" && global.clearImmediate) ||
	                         (this && this.clearImmediate);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop,
	    noarr = _require.noarr;

	/**
	* Errors bypass the normal flow of execution.  They're always returned to the last link in the chain, even if they occur inside nested InSeries or InParallel chains.
	*
	* ```javascript
	*   let chain = InSeries(
	*     (next) => { console.log(1); next(); }
	*     InSeries(
	*       (next) => { console.log(2); next(); }
	*       (next) => { console.log(3); next('Error'); }
	*     ),
	*     InSeries(
	*       (next) => { console.log(4); next();}
	*       (next) => { console.log(5); next();}
	*     )
	*   )(console.log); // prints out 1 2 3 Error, eventually
	* ```
	*
	* If you need to catch an error explicitly at some point, wrap a chain in CatchError, which will return the error as the first argument to the next function.
	*
	* ```javascript
	*   let chain = InSeries(
	*     (next) => { console.log(1); next();}
	*     CatchError(
	*       InSeries(
	*         (next) => { console.log(2); next();}
	*         (next) => { console.log(3); next('Error');}
	*       ),
	*     ),
	*     (next, error) => error != null ? console.log('Error Caught') : null,
	*     InSeries(
	*       (next) => { console.log(4); next();}
	*       (next) => { console.log(5); next();}
	*     )
	*   )(console.log); // prints out 1 2 3 Error Caught 4 5, eventually
	* ```
	*
	* @param {taskFunction} task - a function that checks the arguments.
	* @returns {taskFunction} a wrapper function around the task
	* @memberof uchain
	*/


	var CatchError = function CatchError(task) {
		task = catchWrapper(task);

		return function (next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || nop;
			args = args || noarr;

			task.apply(undefined, [function () {
				for (var _len2 = arguments.length, a = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					a[_key2] = arguments[_key2];
				}

				return next.apply(undefined, [null].concat(_toConsumableArray(a || noarr)));
			}].concat(_toConsumableArray(args)));
		};
	};

	module.exports = CatchError;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	* ```javascript
	*   let chain = InSeries(
	*     function(next, ...args) {...},
	*     FromPromise(
	*       (...args) => new Promise((resolve, reject) => resolve(...args))
	*     ),
	*     function(next, ...args) {},
	*     ...
	*   );
	*
	*   chain(next, ...args);
	* ```
	* Alias for PromiseWrapper
	* Wraps around a promise generator function,
	* to make it easier to integrate with task functions.
	* @param {function} generator - a function that generates a promise from the args.
	* @returns {taskFunction} a task that wraps around the promise
	* @memberof uchain
	*/
	var FromPromise = __webpack_require__(9);

	module.exports = FromPromise;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    catchWrapper = _require.catchWrapper;

	var PassThrough = __webpack_require__(10);

	/**
	* ```javascript
	*   let chain = InSeries(
	*     function(next, ...args) {...},
	*     PromiseWrapper(
	*       (...args) => new Promise((resolve, reject) => resolve(...args))
	*     ),
	*     function(next, ...args) {},
	*     ...
	*   );
	*
	*   chain(next, ...args);
	* ```
	* Wraps around a promise generator function,
	* to make it easier to integrate with task functions.
	* @param {function} generator - a function that generates a promise from the args.
	* @returns {taskFunction} a task that wraps around the promise
	* @memberof uchain
	*/
	var PromiseWrapper = function PromiseWrapper(promiseGenerator) {
		if (promiseGenerator == null) {
			return PassThrough;
		}

		var promiseWrapper = function promiseWrapper(next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			var promise = promiseGenerator.apply(undefined, args);
			return promise.then(function () {
				for (var _len2 = arguments.length, res = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					res[_key2] = arguments[_key2];
				}

				return next.apply(undefined, [null].concat(res));
			}, next);
		};

		return catchWrapper(promiseWrapper);
	};

	module.exports = PromiseWrapper;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    nop = _require.nop;

	/**
	*
	* Sometimes, you need to pass previous arguments along with a new result.  The easiest way to do this is to use PassThrough, which is a convenience method for:
	* ```javascript
	*  (next, ...args) => next(null, ...args),
	* ```
	* @memberof uchain
	*/


	var PassThrough = function PassThrough(next) {
		var args = arguments;
		next = next || nop;
		args[0] = undefined;
		next.apply(undefined, args);
	};

	module.exports = PassThrough;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    noarr = _require.noarr;

	var PassThrough = __webpack_require__(10);

	/**
	*
	* ```javascript
	*   let task = If(
	*     function(next, ...args) {},
	*     function(next, ...args) {},
	*     function(next, ...args) {}
	*   );
	*
	*   chain(next, ...args);
	* ```
	* If accepts up to three tasks and returns a task that conditionally executes some.
	*
	* ```javascript
	*   let logIfEven = If(
	*     (next, num) => next(null, num % 2 === 0)
	*     (next, num) => { console.log('is even!'); next(null, num); },
	*     (next, num) => { console.log('is not even!'); next(null, num); },
	*   );
	*
	*   let onDone = (err, ...results) => console.log(results);
	*
	*   logIfEven(null, 1); // prints out 'is not even!' eventually
	*   logIfEven(null, 2); // prints out 'is even!' eventually
	* ```
	* note: by default, the conditionTask, thenTask, and elseTask are all set to PassThrough
	* note: the conditionTask can return multiple results, but only the first is checked for truthiness
	* @param {taskFunction} conditionTask - a condition task.
	* @param {taskFunction} thenTask - a task to run if the condition returns a truthy value.
	* @param {taskFunction} elseTask - a task to run if the condition returns a falsy value.
	* @returns {taskFunction}
	* @memberof uchain
	*/
	var If = function If(conditionTask, thenTask, elseTask) {
		conditionTask = conditionTask != null ? catchWrapper(conditionTask) : PassThrough;
		thenTask = thenTask != null ? catchWrapper(thenTask) : PassThrough;
		elseTask = elseTask != null ? catchWrapper(elseTask) : PassThrough;

		return function (next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || once(next);
			args = args || noarr;

			var onCondition = function onCondition(err, res) {
				if (err) {
					next(err, res);
				} else if (res) {
					thenTask.apply(undefined, [next].concat(_toConsumableArray(args)));
				} else {
					elseTask.apply(undefined, [next].concat(_toConsumableArray(args)));
				}
			};
			conditionTask.apply(undefined, [onCondition].concat(_toConsumableArray(args)));
		};
	};

	module.exports = If;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop;

	var EMPTY = function EMPTY(next) {
		return (next || nop)();
	};

	/**
	*
	* ```javascript
	*   let chain = InParallel(
	*     function(next, ...args) {},
	*     function(next, ...args) {},
	*     ...
	*   );
	*
	*   chain(next, ...args);
	* ```
	* InParallel accepts a number of functions, and returns a task function that executes all of its child tasks in parallel.
	*
	* ```javascript
	*   let chain = InParallel(
	*     (next) => next(null, 1),
	*     (next) => next(null, 2),
	*     (next) => next(null, 3, 4),
	*   );
	*
	*   let onDone = (err, ...results) => console.log(results);
	*
	*   chain(onDone); // prints out [ 1 ] [ 2 ] [ 3, 4 ], eventually
	* ```
	* note: because the callbacks can return any number of results,
	* the results from each task are autoboxed into an array.
	* This includes an empty array for tasks that don't return results.
	* @param {...taskFunction} tasks - any number of tasks to run in parallel.
	* @returns {taskFunction} a wrapper function that runs the tasks in parallel
	* @memberof uchain
	*/
	var InParallel = function InParallel() {
		var handlers = arguments;

		if (handlers.length === 0) {
			return EMPTY;
		}

		var parallel = function parallel(next) {
			var args = arguments;
			next = once(next);

			var results = Array(handlers.length + 1);
			var done = 0;

			var _loop = function _loop(i) {
				var onDone = function onDone(err) {
					for (var _len = arguments.length, res = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						res[_key - 1] = arguments[_key];
					}

					if (err) {
						next.apply(undefined, [err].concat(res));
					} else {
						results[i + 1] = res;
						done++;
						if (done === handlers.length) {
							next.apply(undefined, results);
						}
					}
				};

				var handler = catchWrapper(handlers[i]).bind(undefined, once(onDone));

				args[0] = handler;
				args.length = args.length > 1 ? args.length : 1;

				defer.apply(undefined, args);
			};

			for (var i = 0; i < handlers.length; i++) {
				_loop(i);
			}
		};

		return parallel;
	};

	module.exports = InParallel;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop;

	var EMPTY = function EMPTY(next) {
		return (next || nop)();
	};

	/**
	* ```javascript
	*   let chain = InSeries(
	*     function(next, ...args) {},
	*     function(next, ...args) {},
	*     ...
	*   );
	*
	*   chain(next, ...args);
	* ```
	* Runs several tasks in series, and passes the results from one down to the next.
	* This works similarly to the 'waterfall' method in caolan's async.
	* ```javascript
	*   let chain = InSeries(
	*     (next) => { console.log(1); next();}
	*     InSeries(
	*       (next) => { console.log(2); next();}
	*       (next) => { console.log(3); next();}
	*     ),
	*     InSeries(
	*       (next) => { console.log(4); next();}
	*       (next) => { console.log(5); next();}
	*     )
	*   )(); // prints out 1 2 3 4 5, eventually
	```
	* @param {...taskFunction} tasks - any number of tasks to run in series.
	* @returns {taskFunction} a wrapper function that runs the tasks in series
	* @memberof uchain
	*/
	var InSeries = function InSeries() {
		var handlers = arguments;

		if (handlers.length === 0) {
			return EMPTY;
		}

		for (var i = 0; i < handlers.length; i++) {
			handlers[i] = catchWrapper(handlers[i]);
		}

		var series = function series(next) {
			var args = arguments;
			next = once(next);

			var index = 0;

			var worker = function worker() {
				var args = arguments;

				if (args[0] != null) {
					next.apply(undefined, args);
				} else if (index >= handlers.length) {
					next.apply(undefined, args);
				} else {
					var handler = handlers[index++].bind(undefined, once(worker));

					args[0] = handler;
					args.length = args.length || 1;
					defer.apply(undefined, args);
				}
			};

			args[0] = undefined;
			worker.apply(undefined, args);
		};

		return series;
	};

	module.exports = InSeries;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop;

	var EMPTY = function EMPTY(next) {
		return (next || nop)();
	};

	/**
	* ```javascript
	*   let chain = InOrder(
	*     function(next, ...args) {},
	*     function(next, ...args) {},
	*     ...
	*   );
	*
	*   chain(next, ...args);
	* ```
	* Runs several asynchronous tasks one after another.
	* Each task gets the arguments that were originally passed into the wrapper.
	* This is different from InSeries, where the output of each is task is passed as the input to the next.
	* ```javascript
	*   let chain = InOrder(
	*     (next, a) => { a.val = 1; console.log(a.val); next();}
	*     (next) => { a.val = 2; console.log(a.val); next();}
	*     (next) => { a.val = 3; console.log(a.val); next();}
	*   )(null, {}); // prints out 1 2 3, eventually
	```
	* @param {...taskFunction} tasks - any number of tasks to run in order.
	* @returns {taskFunction} a wrapper function that runs the tasks in order
	* @memberof uchain
	*/
	var InOrder = function InOrder() {
		var handlers = arguments;

		if (handlers.length === 0) {
			return EMPTY;
		}

		var series = function series(next) {
			var args = arguments;
			next = once(next);

			var index = 0;

			var worker = function worker() {
				var args2 = arguments;

				if (args2[0] != null) {
					args[0] = args2[0];
					next.apply(undefined, args);
				} else if (index >= handlers.length) {
					args[0] = undefined;
					next.apply(undefined, args);
				} else {
					var handler = catchWrapper(handlers[index++]).bind(undefined, once(worker));

					args[0] = handler;
					args.length = args.length || 1;
					defer.apply(undefined, args);
				}
			};

			args[0] = undefined;
			worker.apply(undefined, args);
		};

		return series;
	};

	module.exports = InOrder;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    nop = _require.nop,
	    noarr = _require.noarr,
	    isFunction = _require.isFunction;

	var DEFAULT = function DEFAULT() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return 'Logging [ ' + args + ' ]';
	};

	var logWrapper = function logWrapper(log) {
		var wrapper = (isFunction(log) ? log : null) || function () {
			return log;
		};
		return wrapper;
	};

	/**
	* A logging utility.
	* It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement
	* @param {...} statements - any number of logging values.  Functions are called with the calling arguments, everything else is passed directly to
	* @returns {taskFunction} a logging task
	* @memberof uchain
	*/
	var Logging = function Logging() {
		for (var _len2 = arguments.length, statements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			statements[_key2] = arguments[_key2];
		}

		statements = statements || [DEFAULT];
		statements = statements.map(logWrapper);

		return function (next) {
			var _console;

			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				args[_key3 - 1] = arguments[_key3];
			}

			args = args || noarr;
			next = next || nop;

			var log = statements.map(function (s) {
				return s.apply(undefined, _toConsumableArray(args));
			});

			(_console = console).log.apply(_console, _toConsumableArray(log));

			next.apply(undefined, [null].concat(_toConsumableArray(args)));
		};
	};

	module.exports = Logging;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    nop = _require.nop,
	    noarr = _require.noarr;

	var InSeries = __webpack_require__(13);
	var ParallelMap = __webpack_require__(17);

	/**
	* Builds a task that filters all of its arguments in parallel, and returns the results
	* @param {taskFunction} filter - an asynchronous filter function that returns true or false through its callback.
	* @returns {taskFunction} a filtering task
	* @memberof uchain
	*/
	var ParallelFilter = function ParallelFilter(filter) {
		return function (next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || nop;
			args = args || noarr;

			InSeries(ParallelMap(filter), function (next) {
				for (var _len2 = arguments.length, booleans = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					booleans[_key2 - 1] = arguments[_key2];
				}

				booleans = booleans || noarr;
				var results = args.filter(function (r, i) {
					return booleans[i];
				});
				next.apply(undefined, [null].concat(_toConsumableArray(results)));
			})(next);
		};
	};

	module.exports = ParallelFilter;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    nop = _require.nop,
	    noarr = _require.noarr;

	var InSeries = __webpack_require__(13);
	var InParallel = __webpack_require__(12);

	/**
	* Builds a task wrapper that asynchronously maps each of its arguments to a result.
	* Note: even though the mapping function can return any number of results, ParallelMap only uses the first result
	* @param {taskFunction} task - an asynchronous mapping function.
	* @returns {taskFunction} a parallel map task
	* @memberof uchain
	*/
	var ParallelMap = function ParallelMap(map) {
		return function (next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || nop;
			args = args || noarr;

			var tasks = args.map(function (arg, i) {
				return function (next) {
					return map(next, arg, i);
				};
			});

			InSeries(InParallel.apply(undefined, _toConsumableArray(tasks)), function (next) {
				for (var _len2 = arguments.length, results = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					results[_key2 - 1] = arguments[_key2];
				}

				results = results || noarr;
				results = results.map(function (r) {
					return r[0];
				});
				next.apply(undefined, [null].concat(_toConsumableArray(results)));
			})(next);
		};
	};

	module.exports = ParallelMap;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    nop = _require.nop,
	    noarr = _require.noarr;

	var InSeries = __webpack_require__(13);
	var InParallel = __webpack_require__(12);

	/**
	* Builds a task wrapper that calls a task once on each of its arguments in parallel
	* @param {taskFunction} task - an asynchronous function that gets called once on each argument.
	* @returns {taskFunction} a parallel foreach task
	* @memberof uchain
	*/
	var ParallelForEach = function ParallelForEach(toCall) {
		return function (next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || nop;
			args = args || noarr;

			var tasks = args.map(function (arg) {
				return function (next) {
					return toCall(next, arg);
				};
			});

			InSeries(InParallel.apply(undefined, _toConsumableArray(tasks)), function (next) {
				return next();
			})(next);
		};
	};

	module.exports = ParallelForEach;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper;

	/**
	* Similar to ParallelFilter, but instead of running on an array of arguments, it runs a filter on every key-value pair in an object.
	* @param {taskFunction} task - an asynchronous filter function.
	* @returns {taskFunction} a parallel filter task
	* @memberof uchain
	*/


	var ParallelObjectFilter = function ParallelObjectFilter(mapping) {
		mapping = catchWrapper(mapping);

		return function (next, obj) {
			next = once(next);

			var left = 0;
			var results = {};

			var _loop = function _loop(key) {
				if (obj.hasOwnProperty(key)) {
					left++;
					var val = obj[key];

					var onDone = function onDone(err, pass) {
						if (err) {
							next(err);
						} else {
							if (pass) {
								results[key] = val;
							}
							left--;
							if (left === 0) {
								next(null, results);
							}
						}
					};

					defer(mapping, once(onDone), key, val);
				}
			};

			for (var key in obj) {
				_loop(key);
			}

			// catch for empty object
			if (left === 0) {
				next(null, {});
			}
		};
	};

	module.exports = ParallelObjectFilter;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper;

	/**
	* Similar to ParallelMap, but instead of running on an array of arguments, it runs a filter on every key-value pair in an object.
	* @param {taskFunction} task - an asynchronous map function.
	* @returns {taskFunction} a parallel map task
	* @memberof uchain
	*/


	var ParallelObjectMap = function ParallelObjectMap(mapping) {
		mapping = catchWrapper(mapping);

		return function (next, obj) {
			next = once(next);

			var left = 0;
			var results = {};

			var _loop = function _loop(key) {
				if (obj.hasOwnProperty(key)) {
					left++;
					var val = obj[key];

					var onDone = function onDone(err, newVal) {
						if (err) {
							next(err);
						} else {
							results[key] = newVal;
							left--;
							if (left === 0) {
								next(null, results);
							}
						}
					};

					defer(mapping, once(onDone), key, val);
				}
			};

			for (var key in obj) {
				_loop(key);
			}

			// catch for empty object
			if (left === 0) {
				next(null, {});
			}
		};
	};

	module.exports = ParallelObjectMap;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    catchWrapper = _require.catchWrapper;

	var PassThrough = __webpack_require__(10);

	/**
	* ```javascript
	*
	*   let chain = InSeries(
	*     function(next, ...args) {...},
	*     function(next, ...args) {...},
	*     ...
	*   );
	*
	*  new Promise()
	*    .then(
	*      Promisify(chain)
	*    );
	*
	* ```
	*
	* Wraps around a task function and greates a promise generator,
	* to make it easier to integrate task functions and promises.
	*
	* NOTE: uchain does not come bundled with a promise library,
	* it expects Promise to already exists in the global namespace.
	*
	* NOTE: because uchain can 'return' multiple values through the next callback,
	* Promisify always resolves to an array of the results returned.
	*
	* @param {function} task - a function that generates a promise from the args.
	* @returns {function} a function that generates a Promise when called
	* @memberof uchain
	*/
	var Promisify = function Promisify(task) {
		if (task == null) {
			return PassThrough;
		} else {
			task = catchWrapper(task);
		}

		var taskWrapper = function taskWrapper() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var handler = function handler(resolve, reject) {
				var callback = function callback(err) {
					for (var _len2 = arguments.length, results = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
						results[_key2 - 1] = arguments[_key2];
					}

					if (err) {
						reject(err);
					} else {
						resolve(results);
					}
				};

				task.apply(undefined, [callback].concat(args));
			};

			return new Promise(handler);
		};

		return taskWrapper;
	};

	module.exports = Promisify;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop,
	    noarr = _require.noarr;

	/**
	*
	* ```javascript
	*   let chain = Race(
	*     function(next, ...args) {},
	*     function(next, ...args) {},
	*     ...
	*   );
	*
	*   chain(next, ...args);
	* ```
	*
	* Race accepts a number of functions, and returns a task function that executes all of its child tasks simultaneously.  The first result (or error) is returned, and the remaining results (or errors) are ignored.
	*
	* ```javascript
	*   let chain = Race(
	*     (next) => next(null, 1),
	*     (next) => setTimeout(next, 100, null, 2),
	*     (next) => { throw new Error(); } ,
	*   );
	*
	*   let onDone = (err, ...results) => console.log(results);
	*
	*   chain(onDone); // prints out [ 1 ], eventually
	* ```
	*
	* @param {...taskFunction} tasks - any number of tasks to run in parallel.
	* @returns {taskFunction} a task
	* @memberof uchain
	*/


	var Race = function Race() {
		for (var _len = arguments.length, tasks = Array(_len), _key = 0; _key < _len; _key++) {
			tasks[_key] = arguments[_key];
		}

		tasks = tasks || noarr;

		if (tasks.length === 0) {
			return function (next) {
				return (next || nop)();
			};
		}

		tasks = tasks.map(catchWrapper);

		return function (next) {
			for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				args[_key2 - 1] = arguments[_key2];
			}

			next = once(next);
			args = args || noarr;

			for (var i = 0; i < tasks.length; i++) {
				var task = tasks[i];
				defer.apply(undefined, [task, next].concat(_toConsumableArray(args)));
			}
		};
	};

	module.exports = Race;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    once = _require.once,
	    nop = _require.nop,
	    catchWrapper = _require.catchWrapper;

	var EMPTY_TASK = function EMPTY_TASK(next) {
		return next();
	};

	/**
	* Wraps a task and attempts to retry if it throws an error, with an exponential backoff.
	* @param {taskFunction} task - the task to wrap.
	* @param {object} options - an optional set of retry options.
	* @param {object} options.timeout - maximum time to attempt retries.
	* @param {object} options.retries - maximum number of retries to attempt.
	* @returns {taskFunction} a task
	* @memberof uchain
	*/
	var Retry = function Retry(task, options) {
		task = catchWrapper(task || EMPTY_TASK);
		options = options || {};
		options.timeout = 8192;
		options.retries = 8;

		var wrapper = function wrapper(next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || nop;

			var timeStarted = Date.now();
			var retries = 0;

			var onDone = function onDone(err) {
				for (var _len2 = arguments.length, res = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					res[_key2 - 1] = arguments[_key2];
				}

				var elapsedTime = Date.now() - timeStarted;
				if (err != null && retries < options.retries && elapsedTime < options.timeout) {
					var delay = 1 << retries;
					retries++;
					setTimeout.apply(undefined, [task, delay, onDone].concat(args));
				} else {
					next.apply(undefined, [err].concat(res));
				}
			};

			task.apply(undefined, [onDone].concat(args));
		};

		return wrapper;
	};

	module.exports = Retry;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    noarr = _require.noarr;

	var PassThrough = __webpack_require__(10);

	/**
	* Switch accepts a lookup task and a map.
	* @param {taskFunction} lookupTask - a lookup task.
	* @param {object} caseMap - a task to run if the condition returns a falsy value.
	* @returns {taskFunction}
	* @memberof uchain
	*/
	var Switch = function Switch(lookupTask, caseMap) {
		lookupTask = lookupTask != null ? catchWrapper(lookupTask) : function (next) {
			return next();
		};
		caseMap = caseMap || {};

		return function (next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || once(next);
			args = args || noarr;

			var onLookup = function onLookup(err, key) {
				if (err) {
					next(err, key);
					return;
				}

				var task = caseMap[key] || caseMap.default || PassThrough;
				task.apply(undefined, [next].concat(_toConsumableArray(args)));
			};

			lookupTask.apply(undefined, [onLookup].concat(_toConsumableArray(args)));
		};
	};

	module.exports = Switch;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var PassThrough = __webpack_require__(10);

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop;

	var Queue = __webpack_require__(26);

	/**
	* Wraps a task and ensures that only X number of instances of the task can be run in parallel.
	* Requests are queued up in an unbounded FIFO queue until they can be run.
	* @param {taskFunction} task - the task to throttle
	* @param {number} limit - the number of instances that can run in parallel. default 1.
	* @returns {taskFunction} a task
	* @memberof uchain
	*/
	var Throttle = function Throttle() {
		var task = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PassThrough;
		var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		var queue = new Queue();
		var running = 0;

		var throttle = function throttle(next) {
			for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				rest[_key - 1] = arguments[_key];
			}

			next = once(next);

			var after = function after() {
				running--;
				if (running < limit && queue.length() > 0) {
					var oldArgs = queue.pop();
					throttle.apply(undefined, _toConsumableArray(oldArgs));
				}

				next.apply(undefined, arguments);
			};

			if (running < limit) {
				running++;
				task.apply(undefined, [after].concat(rest));
			} else {
				queue.push([next].concat(rest));
			}
		};

		return throttle;
	};

	module.exports = Throttle;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = function Node(val) {
		_classCallCheck(this, Node);

		this.val = val;
		this.prev = this;
		return this;
	};

	var Queue = function Queue() {
		var _this = this;

		_classCallCheck(this, Queue);

		var tail = new Node();
		var head = tail;
		var length = 0;

		this.push = function (val) {
			if (length === 0) {
				head.val = val;
			} else {
				var node = new Node(val);
				head.prev = node;
				head = node;
			}
			length++;
			return _this;
		};

		this.pop = function () {
			var val = tail.val;
			tail = tail.prev;
			length = length > 0 ? length - 1 : 0;
			if (length === 0) {
				tail.val = undefined;
			}
			return val;
		};

		this.length = function () {
			return length;
		};

		this.empty = function () {
			tail = new Node();
			head = tail;
			length = 0;
		};

		return this;
	};

	module.exports = Queue;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop,
	    noarr = _require.noarr;

	var PassThrough = __webpack_require__(10);
	var InSeries = __webpack_require__(13);
	var InParallel = __webpack_require__(12);

	/**
	*
	* ```javascript
	*   let chain = TimeIn(
	*     function(next, ...args) {},
	*			1000
	*   );
	*
	*   chain(next, ...args);
	* ```
	*
	* TimeIn wraps a single task function, and returns a function that only returns after X ms.
	*
	* @param {taskFunction} task - the task to wrap in a timeout.
	* @param {number} ms - the timein in ms.
	* @returns {taskFunction} a task
	* @memberof uchain
	*/
	var TimeIn = function TimeIn() {
		var task = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PassThrough;
		var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
		return InSeries(InParallel(task, function (next) {
			return setTimeout(next, ms);
		}), function (next, results) {
			return next.apply(undefined, [null].concat(_toConsumableArray(results)));
		});
	};

	module.exports = TimeIn;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    defer = _require.defer,
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop,
	    noarr = _require.noarr;

	var Race = __webpack_require__(22);
	var PassThrough = __webpack_require__(10);

	/**
	*
	* ```javascript
	*   let chain = TimeOut(
	*     function(next, ...args) {},
	*			1000
	*   );
	*
	*   chain(next, ...args);
	* ```
	*
	* TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.
	*
	* NOTE: no error is thrown on a timeout, the result is merely undefined.
	*
	* NOTE: the timeout being triggered will not cancel the original task.
	*
	* @param {taskFunction} task - the task to wrap in a timeout.
	* @param {number} ms - the timeout in ms.
	* @returns {taskFunction} a task
	* @memberof uchain
	*/
	var TimeOut = function TimeOut() {
		var task = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PassThrough;
		var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
		return Race(function (next) {
			return setTimeout(next, ms);
		}, task);
	};

	module.exports = TimeOut;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    once = _require.once,
	    catchWrapper = _require.catchWrapper;

	var EMPTY_TASK = function EMPTY_TASK(next) {
		return next();
	};

	/**
	* Wraps a task and logs how long it takes to finish, or fail.
	* @param {taskFunction} task - the task to wrap.
	* @param {string} label - an optional label to log.
	* @returns {taskFunction} a task
	* @memberof uchain
	*/
	var Timer = function Timer(task, label) {
		task = catchWrapper(task || EMPTY_TASK);
		label = label || task.name || 'task';

		var timer = function timer(next) {
			var start = Date.now();
			next = once(next);

			var done = function done(err) {
				for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					rest[_key2 - 1] = arguments[_key2];
				}

				var end = Date.now();
				console.log(err ? 'Timer: ' + label + ' failed in ' + (end - start) + 'ms' : 'Timer: ' + label + ' finished in ' + (end - start) + 'ms');
				next.apply(undefined, [err].concat(rest));
			};

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			task.apply(undefined, [done].concat(args));
		};

		return timer;
	};

	module.exports = Timer;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	* ```javascript
	*
	*   let chain = InSeries(
	*     function(next, ...args) {...},
	*     function(next, ...args) {...},
	*     ...
	*   );
	*
	*  new Promise()
	*    .then(
	*      ToPromise(chain)
	*    );
	*
	* ```
	*
	* Alias for Promisify
	*
	* Wraps around a task function and greates a promise generator,
	* to make it easier to integrate task functions and promises.
	*
	* NOTE: uchain does not come bundled with a promise library,
	* it expects Promise to already exists in the global namespace.
	*
	* NOTE: because uchain can 'return' multiple values through the next callback,
	* Promisify always resolves to an array of the results returned.
	*
	* @param {function} task - a function that generates a promise from the args.
	* @returns {function} a function that generates a Promise when called
	* @memberof uchain
	*/
	var ToPromise = __webpack_require__(21);

	module.exports = ToPromise;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3),
	    catchWrapper = _require.catchWrapper,
	    nop = _require.nop,
	    noarr = _require.noarr;

	var DEFAULT_TRY = function DEFAULT_TRY(next) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return next.apply(undefined, [null].concat(args));
	};

	var DEFAULT_CATCH = function DEFAULT_CATCH(next, err) {
		for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
			args[_key2 - 2] = arguments[_key2];
		}

		return next.apply(undefined, [err].concat(args));
	};

	var DEFAULT_FINALLY = function DEFAULT_FINALLY(next, err) {
		for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
			args[_key3 - 2] = arguments[_key3];
		}

		return next.apply(undefined, [err].concat(args));
	};

	/**
	* Errors bypass the normal flow of execution.  They always return to the last link in the chain, even if they occur inside nested InSeries or InParallel chains.
	*
	* ```javascript
	*   let chain = InSeries(
	*     (next) => { console.log(1); next(); }
	*     InSeries(
	*       (next) => { console.log(2); next(); }
	*       (next) => { console.log(3); next('Error'); }
	*     ),
	*     InSeries(
	*       (next) => { console.log(4); next();}
	*       (next) => { console.log(5); next();}
	*     )
	*   )(console.log); // prints out 1 2 3 Error, eventually
	* ```
	*
	* If you need to catch an error explicitly at some point, `wrap a chain in CatchError`, which will return the error as the first argument to the next function.
	*
	* ```javascript
	*   let chain = InSeries(
	*     (next) => { console.log(1); next();}
	*     CatchError(
	*       InSeries(
	*         (next) => { console.log(2); next();}
	*         (next) => { console.log(3); next('Error');}
	*       ),
	*     ),
	*     (next, error) => error != null ? console.log('Error Caught') : null,
	*     InSeries(
	*       (next) => { console.log(4); next();}
	*       (next) => { console.log(5); next();}
	*     )
	*   )(console.log); // prints out 1 2 3 Error Caught 4 5, eventually
	* ```
	*
	* @param {taskFunction} _try
	* @param {taskFunction} _catch
	* @param {taskFunction} _finally
	* @returns {taskFunction}
	* @memberof uchain
	*/
	var TryCatch = function TryCatch(_try, _catch, _finally) {
		_try = _try || DEFAULT_TRY;
		_try = catchWrapper(_try);

		_catch = _catch || DEFAULT_CATCH;
		_catch = catchWrapper(_catch);

		_finally = _finally || DEFAULT_FINALLY;
		_finally = catchWrapper(_finally);

		var wrapper = function wrapper(next) {
			var onCatch = function onCatch(err) {
				for (var _len5 = arguments.length, res = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
					res[_key5 - 1] = arguments[_key5];
				}

				_finally.apply(undefined, [next, err].concat(res));
			};

			var onTry = function onTry(err) {
				for (var _len6 = arguments.length, res = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
					res[_key6 - 1] = arguments[_key6];
				}

				if (err) {
					_catch.apply(undefined, [onCatch, err].concat(res));
				} else {
					_finally.apply(undefined, [next, err].concat(res));
				}
			};

			for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
				args[_key4 - 1] = arguments[_key4];
			}

			_try.apply(undefined, [onTry].concat(args));
		};

		return wrapper;
	};

	module.exports = TryCatch;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3),
	    once = _require.once,
	    catchWrapper = _require.catchWrapper,
	    noarr = _require.noarr;

	var PassThrough = __webpack_require__(10);

	/**
	*
	* ```javascript
	*   let task = While(
	*     function(next, ...args) {},
	*     function(next, ...args) {},
	*   );
	*
	*   chain(next, ...args);
	* ```
	* While accepts two tasks and returns a task that conditionally executes some.
	*
	* ```javascript
	*   let incUntil10 = While(
	*     (next, num) => next(null, num < 10),
	*     (next, num) => { console.log('num', nul); next(null, num + 1); },
	*   );
	*
	*   let onDone = (err, ...results) => console.log(results);
	*
	*   incUntil10(null, 1); // prints 1, 2, ... 9
	* ```
	* note: the results of the loop task are saved to pass into the conditionTask, and the loopTask
	* note: when the condition task returns false, those results are passed down the chain
	* @param {taskFunction} conditionTask - a condition task.
	* @param {taskFunction} loopTask - a task to run if the condition returns a truthy value.
	* @returns {taskFunction}
	* @memberof uchain
	*/
	var While = function While(conditionTask, loopTask) {
		conditionTask = conditionTask != null ? catchWrapper(conditionTask) : function (next) {
			return next(null, false);
		};
		loopTask = loopTask != null ? catchWrapper(loopTask) : PassThrough;

		return function (next) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			next = next || once(next);
			args = args || noarr;

			var onCondition = void 0;
			var onLoop = void 0;

			onCondition = function onCondition(err, res) {
				if (err) {
					next(err, res);
				} else if (res) {
					loopTask.apply(undefined, [onLoop].concat(_toConsumableArray(args)));
				} else {
					next.apply(undefined, [null].concat(_toConsumableArray(args)));
				}
			};

			onLoop = function onLoop(err) {
				for (var _len2 = arguments.length, res = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					res[_key2 - 1] = arguments[_key2];
				}

				if (err) {
					next.apply(undefined, [err].concat(res));
				} else {
					args = res;
					conditionTask.apply(undefined, [onCondition].concat(_toConsumableArray(args)));
				}
			};

			conditionTask.apply(undefined, [onCondition].concat(_toConsumableArray(args)));
		};
	};

	module.exports = While;

/***/ })
/******/ ])
});
;