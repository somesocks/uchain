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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-libs-browser/node_modules/process/browser.js":
/*!************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/process/browser.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/node-libs-browser/node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {\n    \"use strict\";\n\n    if (global.setImmediate) {\n        return;\n    }\n\n    var nextHandle = 1; // Spec says greater than zero\n    var tasksByHandle = {};\n    var currentlyRunningATask = false;\n    var doc = global.document;\n    var registerImmediate;\n\n    function setImmediate(callback) {\n      // Callback can either be a function or a string\n      if (typeof callback !== \"function\") {\n        callback = new Function(\"\" + callback);\n      }\n      // Copy function arguments\n      var args = new Array(arguments.length - 1);\n      for (var i = 0; i < args.length; i++) {\n          args[i] = arguments[i + 1];\n      }\n      // Store and register the task\n      var task = { callback: callback, args: args };\n      tasksByHandle[nextHandle] = task;\n      registerImmediate(nextHandle);\n      return nextHandle++;\n    }\n\n    function clearImmediate(handle) {\n        delete tasksByHandle[handle];\n    }\n\n    function run(task) {\n        var callback = task.callback;\n        var args = task.args;\n        switch (args.length) {\n        case 0:\n            callback();\n            break;\n        case 1:\n            callback(args[0]);\n            break;\n        case 2:\n            callback(args[0], args[1]);\n            break;\n        case 3:\n            callback(args[0], args[1], args[2]);\n            break;\n        default:\n            callback.apply(undefined, args);\n            break;\n        }\n    }\n\n    function runIfPresent(handle) {\n        // From the spec: \"Wait until any invocations of this algorithm started before this one have completed.\"\n        // So if we're currently running a task, we'll need to delay this invocation.\n        if (currentlyRunningATask) {\n            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a\n            // \"too much recursion\" error.\n            setTimeout(runIfPresent, 0, handle);\n        } else {\n            var task = tasksByHandle[handle];\n            if (task) {\n                currentlyRunningATask = true;\n                try {\n                    run(task);\n                } finally {\n                    clearImmediate(handle);\n                    currentlyRunningATask = false;\n                }\n            }\n        }\n    }\n\n    function installNextTickImplementation() {\n        registerImmediate = function(handle) {\n            process.nextTick(function () { runIfPresent(handle); });\n        };\n    }\n\n    function canUsePostMessage() {\n        // The test against `importScripts` prevents this implementation from being installed inside a web worker,\n        // where `global.postMessage` means something completely different and can't be used for this purpose.\n        if (global.postMessage && !global.importScripts) {\n            var postMessageIsAsynchronous = true;\n            var oldOnMessage = global.onmessage;\n            global.onmessage = function() {\n                postMessageIsAsynchronous = false;\n            };\n            global.postMessage(\"\", \"*\");\n            global.onmessage = oldOnMessage;\n            return postMessageIsAsynchronous;\n        }\n    }\n\n    function installPostMessageImplementation() {\n        // Installs an event handler on `global` for the `message` event: see\n        // * https://developer.mozilla.org/en/DOM/window.postMessage\n        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages\n\n        var messagePrefix = \"setImmediate$\" + Math.random() + \"$\";\n        var onGlobalMessage = function(event) {\n            if (event.source === global &&\n                typeof event.data === \"string\" &&\n                event.data.indexOf(messagePrefix) === 0) {\n                runIfPresent(+event.data.slice(messagePrefix.length));\n            }\n        };\n\n        if (global.addEventListener) {\n            global.addEventListener(\"message\", onGlobalMessage, false);\n        } else {\n            global.attachEvent(\"onmessage\", onGlobalMessage);\n        }\n\n        registerImmediate = function(handle) {\n            global.postMessage(messagePrefix + handle, \"*\");\n        };\n    }\n\n    function installMessageChannelImplementation() {\n        var channel = new MessageChannel();\n        channel.port1.onmessage = function(event) {\n            var handle = event.data;\n            runIfPresent(handle);\n        };\n\n        registerImmediate = function(handle) {\n            channel.port2.postMessage(handle);\n        };\n    }\n\n    function installReadyStateChangeImplementation() {\n        var html = doc.documentElement;\n        registerImmediate = function(handle) {\n            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted\n            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.\n            var script = doc.createElement(\"script\");\n            script.onreadystatechange = function () {\n                runIfPresent(handle);\n                script.onreadystatechange = null;\n                html.removeChild(script);\n                script = null;\n            };\n            html.appendChild(script);\n        };\n    }\n\n    function installSetTimeoutImplementation() {\n        registerImmediate = function(handle) {\n            setTimeout(runIfPresent, 0, handle);\n        };\n    }\n\n    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.\n    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);\n    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;\n\n    // Don't get fooled by e.g. browserify environments.\n    if ({}.toString.call(global.process) === \"[object process]\") {\n        // For Node.js before 0.9\n        installNextTickImplementation();\n\n    } else if (canUsePostMessage()) {\n        // For non-IE10 modern browsers\n        installPostMessageImplementation();\n\n    } else if (global.MessageChannel) {\n        // For web workers, where supported\n        installMessageChannelImplementation();\n\n    } else if (doc && \"onreadystatechange\" in doc.createElement(\"script\")) {\n        // For IE 6–8\n        installReadyStateChangeImplementation();\n\n    } else {\n        // For older browsers\n        installSetTimeoutImplementation();\n    }\n\n    attachTo.setImmediate = setImmediate;\n    attachTo.clearImmediate = clearImmediate;\n}(typeof self === \"undefined\" ? typeof global === \"undefined\" ? this : global : self));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../node-libs-browser/node_modules/process/browser.js */ \"./node_modules/node-libs-browser/node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/setimmediate/setImmediate.js?");

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== \"undefined\" && global) ||\n            (typeof self !== \"undefined\" && self) ||\n            window;\nvar apply = Function.prototype.apply;\n\n// DOM APIs, for completeness\n\nexports.setTimeout = function() {\n  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);\n};\nexports.setInterval = function() {\n  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);\n};\nexports.clearTimeout =\nexports.clearInterval = function(timeout) {\n  if (timeout) {\n    timeout.close();\n  }\n};\n\nfunction Timeout(id, clearFn) {\n  this._id = id;\n  this._clearFn = clearFn;\n}\nTimeout.prototype.unref = Timeout.prototype.ref = function() {};\nTimeout.prototype.close = function() {\n  this._clearFn.call(scope, this._id);\n};\n\n// Does not start the time, just sets up the members needed.\nexports.enroll = function(item, msecs) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = msecs;\n};\n\nexports.unenroll = function(item) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = -1;\n};\n\nexports._unrefActive = exports.active = function(item) {\n  clearTimeout(item._idleTimeoutId);\n\n  var msecs = item._idleTimeout;\n  if (msecs >= 0) {\n    item._idleTimeoutId = setTimeout(function onTimeout() {\n      if (item._onTimeout)\n        item._onTimeout();\n    }, msecs);\n  }\n};\n\n// setimmediate attaches itself to the global object\n__webpack_require__(/*! setimmediate */ \"./node_modules/setimmediate/setImmediate.js\");\n// On some exotic environments, it's not clear which object `setimmediate` was\n// able to install onto.  Search each possibility in the same order as the\n// `setimmediate` library.\nexports.setImmediate = (typeof self !== \"undefined\" && self.setImmediate) ||\n                       (typeof global !== \"undefined\" && global.setImmediate) ||\n                       (this && this.setImmediate);\nexports.clearImmediate = (typeof self !== \"undefined\" && self.clearImmediate) ||\n                         (typeof global !== \"undefined\" && global.clearImmediate) ||\n                         (this && this.clearImmediate);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/timers-browserify/main.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/Assert.js":
/*!***********************!*\
  !*** ./src/Assert.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n* Builds an async assertion task.  When called, if the arguments do not match the validator functions,\n* Assert passes an error to its callback.\n* @param {function} validator - a function that checks the arguments.\n* @param {string} message - an optional error message to throw if the assertion fails, or a message builder function.\n* @returns {taskFunction} an assertion task\n* @memberof uchain\n*/\nvar Assert = function Assert(validator, message) {\n\tvalidator = validator || _common.nop;\n\tmessage = message || 'uchain assert failed';\n\tmessage = (0, _common.stringWrapper)(message);\n\n\treturn (0, _common.catchWrapper)(function (next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || _common.nop;\n\t\targs = args || _common.noarr;\n\t\tvar err = validator.apply(undefined, _toConsumableArray(args)) ? null : new Error(message.apply(undefined, _toConsumableArray(args)));\n\t\tnext.apply(undefined, [err].concat(_toConsumableArray(args)));\n\t});\n};\n\nexports.default = Assert;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Assert.js?");

/***/ }),

/***/ "./src/CatchError.js":
/*!***************************!*\
  !*** ./src/CatchError.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n* Errors bypass the normal flow of execution.  They're always returned to the last link in the chain, even if they occur inside nested InSeries or InParallel chains.\n*\n* ```javascript\n*   let chain = InSeries(\n*     (next) => { console.log(1); next(); }\n*     InSeries(\n*       (next) => { console.log(2); next(); }\n*       (next) => { console.log(3); next('Error'); }\n*     ),\n*     InSeries(\n*       (next) => { console.log(4); next();}\n*       (next) => { console.log(5); next();}\n*     )\n*   )(console.log); // prints out 1 2 3 Error, eventually\n* ```\n*\n* If you need to catch an error explicitly at some point, wrap a chain in CatchError, which will return the error as the first argument to the next function.\n*\n* ```javascript\n*   let chain = InSeries(\n*     (next) => { console.log(1); next();}\n*     CatchError(\n*       InSeries(\n*         (next) => { console.log(2); next();}\n*         (next) => { console.log(3); next('Error');}\n*       ),\n*     ),\n*     (next, error) => error != null ? console.log('Error Caught') : null,\n*     InSeries(\n*       (next) => { console.log(4); next();}\n*       (next) => { console.log(5); next();}\n*     )\n*   )(console.log); // prints out 1 2 3 Error Caught 4 5, eventually\n* ```\n*\n* @param {taskFunction} task - a function that checks the arguments.\n* @returns {taskFunction} a wrapper function around the task\n* @memberof uchain\n*/\nvar CatchError = function CatchError(task) {\n\ttask = (0, _common.catchWrapper)(task);\n\n\treturn function (next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || _common.nop;\n\t\targs = args || _common.noarr;\n\n\t\ttask.apply(undefined, [function () {\n\t\t\tfor (var _len2 = arguments.length, a = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n\t\t\t\ta[_key2] = arguments[_key2];\n\t\t\t}\n\n\t\t\treturn next.apply(undefined, [null].concat(_toConsumableArray(a || _common.noarr)));\n\t\t}].concat(_toConsumableArray(args)));\n\t};\n};\n\nexports.default = CatchError;\n\n//# sourceURL=webpack://%5Bname%5D/./src/CatchError.js?");

/***/ }),

/***/ "./src/FromPromise.js":
/*!****************************!*\
  !*** ./src/FromPromise.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _PromiseWrapper = __webpack_require__(/*! ./PromiseWrapper */ \"./src/PromiseWrapper.js\");\n\nvar _PromiseWrapper2 = _interopRequireDefault(_PromiseWrapper);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _PromiseWrapper2.default;\n/**\n* ```javascript\n*   let chain = InSeries(\n*     function(next, ...args) {...},\n*     FromPromise(\n*       (...args) => new Promise((resolve, reject) => resolve(...args))\n*     ),\n*     function(next, ...args) {},\n*     ...\n*   );\n*\n*   chain(next, ...args);\n* ```\n* Alias for PromiseWrapper\n* Wraps around a promise generator function,\n* to make it easier to integrate with task functions.\n* @param {function} generator - a function that generates a promise from the args.\n* @returns {taskFunction} a task that wraps around the promise\n* @memberof uchain\n*/\n\n//# sourceURL=webpack://%5Bname%5D/./src/FromPromise.js?");

/***/ }),

/***/ "./src/If.js":
/*!*******************!*\
  !*** ./src/If.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n*\n* ```javascript\n*   let task = If(\n*     function(next, ...args) {},\n*     function(next, ...args) {},\n*     function(next, ...args) {}\n*   );\n*\n*   chain(next, ...args);\n* ```\n* If accepts up to three tasks and returns a task that conditionally executes some.\n*\n* ```javascript\n*   let logIfEven = If(\n*     (next, num) => next(null, num % 2 === 0)\n*     (next, num) => { console.log('is even!'); next(null, num); },\n*     (next, num) => { console.log('is not even!'); next(null, num); },\n*   );\n*\n*   let onDone = (err, ...results) => console.log(results);\n*\n*   logIfEven(null, 1); // prints out 'is not even!' eventually\n*   logIfEven(null, 2); // prints out 'is even!' eventually\n* ```\n* note: by default, the conditionTask, thenTask, and elseTask are all set to PassThrough\n* note: the conditionTask can return multiple results, but only the first is checked for truthiness\n* @param {taskFunction} conditionTask - a condition task.\n* @param {taskFunction} thenTask - a task to run if the condition returns a truthy value.\n* @param {taskFunction} elseTask - a task to run if the condition returns a falsy value.\n* @returns {taskFunction}\n* @memberof uchain\n*/\nvar If = function If(conditionTask, thenTask, elseTask) {\n\tconditionTask = conditionTask != null ? (0, _common.catchWrapper)(conditionTask) : _PassThrough2.default;\n\tthenTask = thenTask != null ? (0, _common.catchWrapper)(thenTask) : _PassThrough2.default;\n\telseTask = elseTask != null ? (0, _common.catchWrapper)(elseTask) : _PassThrough2.default;\n\n\treturn function (next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || (0, _common.onceWrapper)(next);\n\t\targs = args || _common.noarr;\n\n\t\tvar onCondition = function onCondition(err, res) {\n\t\t\tif (err) {\n\t\t\t\tnext(err, res);\n\t\t\t} else if (res) {\n\t\t\t\tthenTask.apply(undefined, [next].concat(_toConsumableArray(args)));\n\t\t\t} else {\n\t\t\t\telseTask.apply(undefined, [next].concat(_toConsumableArray(args)));\n\t\t\t}\n\t\t};\n\t\tconditionTask.apply(undefined, [onCondition].concat(_toConsumableArray(args)));\n\t};\n};\n\nexports.default = If;\n\n//# sourceURL=webpack://%5Bname%5D/./src/If.js?");

/***/ }),

/***/ "./src/InOrder.js":
/*!************************!*\
  !*** ./src/InOrder.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar EMPTY = function EMPTY(next) {\n\treturn (next || _common.nop)();\n};\n\n/**\n* ```javascript\n*   let chain = InOrder(\n*     function(next, ...args) {},\n*     function(next, ...args) {},\n*     ...\n*   );\n*\n*   chain(next, ...args);\n* ```\n* Runs several asynchronous tasks one after another.\n* Each task gets the arguments that were originally passed into the wrapper.\n* This is different from InSeries, where the output of each is task is passed as the input to the next.\n* ```javascript\n*   let chain = InOrder(\n*     (next, a) => { a.val = 1; console.log(a.val); next();}\n*     (next) => { a.val = 2; console.log(a.val); next();}\n*     (next) => { a.val = 3; console.log(a.val); next();}\n*   )(null, {}); // prints out 1 2 3, eventually\n```\n* @param {...taskFunction} tasks - any number of tasks to run in order.\n* @returns {taskFunction} a wrapper function that runs the tasks in order\n* @memberof uchain\n*/\nvar InOrder = function InOrder() {\n\tvar handlers = arguments;\n\n\tif (handlers.length === 0) {\n\t\treturn EMPTY;\n\t}\n\n\tvar series = function series(next) {\n\t\tvar args = arguments;\n\t\tnext = (0, _common.onceWrapper)(next);\n\n\t\tvar index = 0;\n\n\t\tvar worker = function worker() {\n\t\t\tvar args2 = arguments;\n\n\t\t\tif (args2[0] != null) {\n\t\t\t\targs[0] = args2[0];\n\t\t\t\tnext.apply(undefined, args);\n\t\t\t} else if (index >= handlers.length) {\n\t\t\t\targs[0] = undefined;\n\t\t\t\tnext.apply(undefined, args);\n\t\t\t} else {\n\t\t\t\tvar handler = (0, _common.catchWrapper)(handlers[index++]).bind(undefined, (0, _common.onceWrapper)(worker));\n\n\t\t\t\targs[0] = handler;\n\t\t\t\targs.length = args.length || 1;\n\t\t\t\t_common.defer.apply(undefined, args);\n\t\t\t}\n\t\t};\n\n\t\targs[0] = undefined;\n\t\tworker.apply(undefined, args);\n\t};\n\n\treturn series;\n};\n\nexports.default = InOrder;\n\n//# sourceURL=webpack://%5Bname%5D/./src/InOrder.js?");

/***/ }),

/***/ "./src/InParallel.js":
/*!***************************!*\
  !*** ./src/InParallel.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar EMPTY = function EMPTY(next) {\n\treturn (next || _common.nop)();\n};\n\n/**\n*\n* ```javascript\n*   let chain = InParallel(\n*     function(next, ...args) {},\n*     function(next, ...args) {},\n*     ...\n*   );\n*\n*   chain(next, ...args);\n* ```\n* InParallel accepts a number of functions, and returns a task function that executes all of its child tasks in parallel.\n*\n* ```javascript\n*   let chain = InParallel(\n*     (next) => next(null, 1),\n*     (next) => next(null, 2),\n*     (next) => next(null, 3, 4),\n*   );\n*\n*   let onDone = (err, ...results) => console.log(results);\n*\n*   chain(onDone); // prints out [ 1 ] [ 2 ] [ 3, 4 ], eventually\n* ```\n* note: because the callbacks can return any number of results,\n* the results from each task are autoboxed into an array.\n* This includes an empty array for tasks that don't return results.\n* @param {...taskFunction} tasks - any number of tasks to run in parallel.\n* @returns {taskFunction} a wrapper function that runs the tasks in parallel\n* @memberof uchain\n*/\nvar InParallel = function InParallel() {\n\tvar handlers = arguments;\n\n\tif (handlers.length === 0) {\n\t\treturn EMPTY;\n\t}\n\n\tvar parallel = function parallel(next) {\n\t\tvar args = arguments;\n\t\tnext = (0, _common.onceWrapper)(next);\n\n\t\tvar results = Array(handlers.length + 1);\n\t\tvar done = 0;\n\n\t\tvar _loop = function _loop(i) {\n\t\t\tvar onDone = function onDone(err) {\n\t\t\t\tfor (var _len = arguments.length, res = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\t\t\tres[_key - 1] = arguments[_key];\n\t\t\t\t}\n\n\t\t\t\tif (err) {\n\t\t\t\t\tnext.apply(undefined, [err].concat(res));\n\t\t\t\t} else {\n\t\t\t\t\tresults[i + 1] = res;\n\t\t\t\t\tdone++;\n\t\t\t\t\tif (done === handlers.length) {\n\t\t\t\t\t\tnext.apply(undefined, results);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tvar handler = (0, _common.catchWrapper)(handlers[i]).bind(undefined, (0, _common.onceWrapper)(onDone));\n\n\t\t\targs[0] = handler;\n\t\t\targs.length = args.length > 1 ? args.length : 1;\n\n\t\t\t_common.defer.apply(undefined, args);\n\t\t};\n\n\t\tfor (var i = 0; i < handlers.length; i++) {\n\t\t\t_loop(i);\n\t\t}\n\t};\n\n\treturn parallel;\n};\n\nexports.default = InParallel;\n\n//# sourceURL=webpack://%5Bname%5D/./src/InParallel.js?");

/***/ }),

/***/ "./src/InSeries.js":
/*!*************************!*\
  !*** ./src/InSeries.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar EMPTY = function EMPTY(next) {\n\treturn (next || _common.nop)();\n};\n\n/**\n* ```javascript\n*   let chain = InSeries(\n*     function(next, ...args) {},\n*     function(next, ...args) {},\n*     ...\n*   );\n*\n*   chain(next, ...args);\n* ```\n* Runs several tasks in series, and passes the results from one down to the next.\n* This works similarly to the 'waterfall' method in caolan's async.\n* ```javascript\n*   let chain = InSeries(\n*     (next) => { console.log(1); next();}\n*     InSeries(\n*       (next) => { console.log(2); next();}\n*       (next) => { console.log(3); next();}\n*     ),\n*     InSeries(\n*       (next) => { console.log(4); next();}\n*       (next) => { console.log(5); next();}\n*     )\n*   )(); // prints out 1 2 3 4 5, eventually\n```\n* @param {...taskFunction} tasks - any number of tasks to run in series.\n* @returns {taskFunction} a wrapper function that runs the tasks in series\n* @memberof uchain\n*/\nvar InSeries = function InSeries() {\n\tvar handlers = arguments;\n\n\tif (handlers.length === 0) {\n\t\treturn EMPTY;\n\t}\n\n\tfor (var i = 0; i < handlers.length; i++) {\n\t\thandlers[i] = (0, _common.catchWrapper)(handlers[i]);\n\t}\n\n\tvar series = function series(next) {\n\t\tvar args = arguments;\n\t\tnext = (0, _common.onceWrapper)(next);\n\n\t\tvar index = 0;\n\n\t\tvar worker = function worker() {\n\t\t\tvar args = arguments;\n\n\t\t\tif (args[0] != null) {\n\t\t\t\tnext.apply(undefined, args);\n\t\t\t} else if (index >= handlers.length) {\n\t\t\t\tnext.apply(undefined, args);\n\t\t\t} else {\n\t\t\t\tvar handler = handlers[index++].bind(undefined, (0, _common.onceWrapper)(worker));\n\n\t\t\t\targs[0] = handler;\n\t\t\t\targs.length = args.length || 1;\n\t\t\t\t_common.defer.apply(undefined, args);\n\t\t\t}\n\t\t};\n\n\t\targs[0] = undefined;\n\t\tworker.apply(undefined, args);\n\t};\n\n\treturn series;\n};\n\nexports.default = InSeries;\n\n//# sourceURL=webpack://%5Bname%5D/./src/InSeries.js?");

/***/ }),

/***/ "./src/Logging.js":
/*!************************!*\
  !*** ./src/Logging.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar DEFAULT = function DEFAULT() {\n\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\targs[_key] = arguments[_key];\n\t}\n\n\treturn 'Logging [ ' + args + ' ]';\n};\n\nvar logWrapper = function logWrapper(log) {\n\tvar wrapper = ((0, _common.isFunction)(log) ? log : null) || function () {\n\t\treturn log;\n\t};\n\treturn wrapper;\n};\n\n/**\n* A logging utility.\n* It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement\n* @param {...} statements - any number of logging values.  Functions are called with the calling arguments, everything else is passed directly to\n* @returns {taskFunction} a logging task\n* @memberof uchain\n*/\nvar Logging = function Logging() {\n\tfor (var _len2 = arguments.length, statements = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n\t\tstatements[_key2] = arguments[_key2];\n\t}\n\n\tstatements = statements || [DEFAULT];\n\tstatements = statements.map(logWrapper);\n\n\treturn function (next) {\n\t\tvar _console;\n\n\t\tfor (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {\n\t\t\targs[_key3 - 1] = arguments[_key3];\n\t\t}\n\n\t\targs = args || _common.noarr;\n\t\tnext = next || _common.nop;\n\n\t\tvar log = statements.map(function (s) {\n\t\t\treturn s.apply(undefined, _toConsumableArray(args));\n\t\t});\n\n\t\t(_console = console).log.apply(_console, _toConsumableArray(log));\n\n\t\tnext.apply(undefined, [null].concat(_toConsumableArray(args)));\n\t};\n};\n\nexports.default = Logging;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Logging.js?");

/***/ }),

/***/ "./src/ParallelFilter.js":
/*!*******************************!*\
  !*** ./src/ParallelFilter.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _InSeries = __webpack_require__(/*! ./InSeries */ \"./src/InSeries.js\");\n\nvar _InSeries2 = _interopRequireDefault(_InSeries);\n\nvar _ParallelMap = __webpack_require__(/*! ./ParallelMap */ \"./src/ParallelMap.js\");\n\nvar _ParallelMap2 = _interopRequireDefault(_ParallelMap);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n* Builds a task that filters all of its arguments in parallel, and returns the results\n* @param {taskFunction} filter - an asynchronous filter function that returns true or false through its callback.\n* @returns {taskFunction} a filtering task\n* @memberof uchain\n*/\nvar ParallelFilter = function ParallelFilter(filter) {\n\treturn function (next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || _common.nop;\n\t\targs = args || _common.noarr;\n\n\t\t(0, _InSeries2.default)((0, _ParallelMap2.default)(filter), function (next) {\n\t\t\tfor (var _len2 = arguments.length, booleans = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n\t\t\t\tbooleans[_key2 - 1] = arguments[_key2];\n\t\t\t}\n\n\t\t\tbooleans = booleans || _common.noarr;\n\t\t\tvar results = args.filter(function (r, i) {\n\t\t\t\treturn booleans[i];\n\t\t\t});\n\t\t\tnext.apply(undefined, [null].concat(_toConsumableArray(results)));\n\t\t})(next);\n\t};\n};\n\nexports.default = ParallelFilter;\n\n//# sourceURL=webpack://%5Bname%5D/./src/ParallelFilter.js?");

/***/ }),

/***/ "./src/ParallelForEach.js":
/*!********************************!*\
  !*** ./src/ParallelForEach.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _InSeries = __webpack_require__(/*! ./InSeries */ \"./src/InSeries.js\");\n\nvar _InSeries2 = _interopRequireDefault(_InSeries);\n\nvar _InParallel = __webpack_require__(/*! ./InParallel */ \"./src/InParallel.js\");\n\nvar _InParallel2 = _interopRequireDefault(_InParallel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n* Builds a task wrapper that calls a task once on each of its arguments in parallel\n* @param {taskFunction} task - an asynchronous function that gets called once on each argument.\n* @returns {taskFunction} a parallel foreach task\n* @memberof uchain\n*/\nvar ParallelForEach = function ParallelForEach(toCall) {\n\treturn function (next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || _common.nop;\n\t\targs = args || _common.noarr;\n\n\t\tvar tasks = args.map(function (arg) {\n\t\t\treturn function (next) {\n\t\t\t\treturn toCall(next, arg);\n\t\t\t};\n\t\t});\n\n\t\t(0, _InSeries2.default)(_InParallel2.default.apply(undefined, _toConsumableArray(tasks)), function (next) {\n\t\t\treturn next();\n\t\t})(next);\n\t};\n};\n\nexports.default = ParallelForEach;\n\n//# sourceURL=webpack://%5Bname%5D/./src/ParallelForEach.js?");

/***/ }),

/***/ "./src/ParallelMap.js":
/*!****************************!*\
  !*** ./src/ParallelMap.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _InSeries = __webpack_require__(/*! ./InSeries */ \"./src/InSeries.js\");\n\nvar _InSeries2 = _interopRequireDefault(_InSeries);\n\nvar _InParallel = __webpack_require__(/*! ./InParallel */ \"./src/InParallel.js\");\n\nvar _InParallel2 = _interopRequireDefault(_InParallel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n* Builds a task wrapper that asynchronously maps each of its arguments to a result.\n* Note: even though the mapping function can return any number of results, ParallelMap only uses the first result\n* @param {taskFunction} task - an asynchronous mapping function.\n* @returns {taskFunction} a parallel map task\n* @memberof uchain\n*/\nvar ParallelMap = function ParallelMap(map) {\n\treturn function (next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || _common.nop;\n\t\targs = args || _common.noarr;\n\n\t\tvar tasks = args.map(function (arg, i) {\n\t\t\treturn function (next) {\n\t\t\t\treturn map(next, arg, i);\n\t\t\t};\n\t\t});\n\n\t\t(0, _InSeries2.default)(_InParallel2.default.apply(undefined, _toConsumableArray(tasks)), function (next) {\n\t\t\tfor (var _len2 = arguments.length, results = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n\t\t\t\tresults[_key2 - 1] = arguments[_key2];\n\t\t\t}\n\n\t\t\tresults = results || _common.noarr;\n\t\t\tresults = results.map(function (r) {\n\t\t\t\treturn r[0];\n\t\t\t});\n\t\t\tnext.apply(undefined, [null].concat(_toConsumableArray(results)));\n\t\t})(next);\n\t};\n};\n\nexports.default = ParallelMap;\n\n//# sourceURL=webpack://%5Bname%5D/./src/ParallelMap.js?");

/***/ }),

/***/ "./src/ParallelObjectFilter.js":
/*!*************************************!*\
  !*** ./src/ParallelObjectFilter.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\n/**\n* Similar to ParallelFilter, but instead of running on an array of arguments, it runs a filter on every key-value pair in an object.\n* @param {taskFunction} task - an asynchronous filter function.\n* @returns {taskFunction} a parallel filter task\n* @memberof uchain\n*/\nvar ParallelObjectFilter = function ParallelObjectFilter(mapping) {\n\tmapping = (0, _common.catchWrapper)(mapping);\n\n\treturn function (next, obj) {\n\t\tnext = (0, _common.onceWrapper)(next);\n\n\t\tvar left = 0;\n\t\tvar results = {};\n\n\t\tvar _loop = function _loop(key) {\n\t\t\tif (obj.hasOwnProperty(key)) {\n\t\t\t\tleft++;\n\t\t\t\tvar val = obj[key];\n\n\t\t\t\tvar onDone = function onDone(err, pass) {\n\t\t\t\t\tif (err) {\n\t\t\t\t\t\tnext(err);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tif (pass) {\n\t\t\t\t\t\t\tresults[key] = val;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tleft--;\n\t\t\t\t\t\tif (left === 0) {\n\t\t\t\t\t\t\tnext(null, results);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t};\n\n\t\t\t\t(0, _common.defer)(mapping, (0, _common.onceWrapper)(onDone), key, val);\n\t\t\t}\n\t\t};\n\n\t\tfor (var key in obj) {\n\t\t\t_loop(key);\n\t\t}\n\n\t\t// catch for empty object\n\t\tif (left === 0) {\n\t\t\tnext(null, {});\n\t\t}\n\t};\n};\n\nexports.default = ParallelObjectFilter;\n\n//# sourceURL=webpack://%5Bname%5D/./src/ParallelObjectFilter.js?");

/***/ }),

/***/ "./src/ParallelObjectMap.js":
/*!**********************************!*\
  !*** ./src/ParallelObjectMap.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\n/**\n* Similar to ParallelMap, but instead of running on an array of arguments, it runs a filter on every key-value pair in an object.\n* @param {taskFunction} task - an asynchronous map function.\n* @returns {taskFunction} a parallel map task\n* @memberof uchain\n*/\nvar ParallelObjectMap = function ParallelObjectMap(mapping) {\n\tmapping = (0, _common.catchWrapper)(mapping);\n\n\treturn function (next, obj) {\n\t\tnext = (0, _common.onceWrapper)(next);\n\n\t\tvar left = 0;\n\t\tvar results = {};\n\n\t\tvar _loop = function _loop(key) {\n\t\t\tif (obj.hasOwnProperty(key)) {\n\t\t\t\tleft++;\n\t\t\t\tvar val = obj[key];\n\n\t\t\t\tvar onDone = function onDone(err, newVal) {\n\t\t\t\t\tif (err) {\n\t\t\t\t\t\tnext(err);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tresults[key] = newVal;\n\t\t\t\t\t\tleft--;\n\t\t\t\t\t\tif (left === 0) {\n\t\t\t\t\t\t\tnext(null, results);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t};\n\n\t\t\t\t(0, _common.defer)(mapping, (0, _common.onceWrapper)(onDone), key, val);\n\t\t\t}\n\t\t};\n\n\t\tfor (var key in obj) {\n\t\t\t_loop(key);\n\t\t}\n\n\t\t// catch for empty object\n\t\tif (left === 0) {\n\t\t\tnext(null, {});\n\t\t}\n\t};\n};\n\nexports.default = ParallelObjectMap;\n\n//# sourceURL=webpack://%5Bname%5D/./src/ParallelObjectMap.js?");

/***/ }),

/***/ "./src/PassThrough.js":
/*!****************************!*\
  !*** ./src/PassThrough.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\n/**\n*\n* Sometimes, you need to pass previous arguments along with a new result.  The easiest way to do this is to use PassThrough, which is a convenience method for:\n* ```javascript\n*  (next, ...args) => next(null, ...args),\n* ```\n* @memberof uchain\n*/\nvar PassThrough = function PassThrough(next) {\n\tvar args = arguments;\n\tnext = next || _common.nop;\n\targs[0] = undefined;\n\tnext.apply(undefined, args);\n};\n\nexports.default = PassThrough;\n\n//# sourceURL=webpack://%5Bname%5D/./src/PassThrough.js?");

/***/ }),

/***/ "./src/PromiseWrapper.js":
/*!*******************************!*\
  !*** ./src/PromiseWrapper.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n* ```javascript\n*   let chain = InSeries(\n*     function(next, ...args) {...},\n*     PromiseWrapper(\n*       (...args) => new Promise((resolve, reject) => resolve(...args))\n*     ),\n*     function(next, ...args) {},\n*     ...\n*   );\n*\n*   chain(next, ...args);\n* ```\n* Wraps around a promise generator function,\n* to make it easier to integrate with task functions.\n* @param {function} generator - a function that generates a promise from the args.\n* @returns {taskFunction} a task that wraps around the promise\n* @memberof uchain\n*/\nvar PromiseWrapper = function PromiseWrapper(promiseGenerator) {\n\tif (promiseGenerator == null) {\n\t\treturn _PassThrough2.default;\n\t}\n\n\tvar promiseWrapper = function promiseWrapper(next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tvar promise = promiseGenerator.apply(undefined, args);\n\t\treturn promise.then(function () {\n\t\t\tfor (var _len2 = arguments.length, res = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n\t\t\t\tres[_key2] = arguments[_key2];\n\t\t\t}\n\n\t\t\treturn next.apply(undefined, [null].concat(res));\n\t\t}, next);\n\t};\n\n\treturn (0, _common.catchWrapper)(promiseWrapper);\n};\n\nexports.default = PromiseWrapper;\n\n//# sourceURL=webpack://%5Bname%5D/./src/PromiseWrapper.js?");

/***/ }),

/***/ "./src/Promisify.js":
/*!**************************!*\
  !*** ./src/Promisify.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n* ```javascript\n*\n*   let chain = InSeries(\n*     function(next, ...args) {...},\n*     function(next, ...args) {...},\n*     ...\n*   );\n*\n*  new Promise()\n*    .then(\n*      Promisify(chain)\n*    );\n*\n* ```\n*\n* Wraps around a task function and greates a promise generator,\n* to make it easier to integrate task functions and promises.\n*\n* NOTE: uchain does not come bundled with a promise library,\n* it expects Promise to already exists in the global namespace.\n*\n* NOTE: because uchain can 'return' multiple values through the next callback,\n* Promisify always resolves to an array of the results returned.\n*\n* @param {function} task - a function that generates a promise from the args.\n* @returns {function} a function that generates a Promise when called\n* @memberof uchain\n*/\nvar Promisify = function Promisify(task) {\n\tif (task == null) {\n\t\treturn _PassThrough2.default;\n\t} else {\n\t\ttask = (0, _common.catchWrapper)(task);\n\t}\n\n\tvar taskWrapper = function taskWrapper() {\n\t\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\t\targs[_key] = arguments[_key];\n\t\t}\n\n\t\tvar handler = function handler(resolve, reject) {\n\t\t\tvar callback = function callback(err) {\n\t\t\t\tfor (var _len2 = arguments.length, results = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n\t\t\t\t\tresults[_key2 - 1] = arguments[_key2];\n\t\t\t\t}\n\n\t\t\t\tif (err) {\n\t\t\t\t\treject(err);\n\t\t\t\t} else {\n\t\t\t\t\tresolve(results);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\ttask.apply(undefined, [callback].concat(args));\n\t\t};\n\n\t\treturn new Promise(handler);\n\t};\n\n\treturn taskWrapper;\n};\n\nexports.default = Promisify;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Promisify.js?");

/***/ }),

/***/ "./src/Queue.js":
/*!**********************!*\
  !*** ./src/Queue.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Node = function Node(val) {\n\t_classCallCheck(this, Node);\n\n\tthis.val = val;\n\tthis.prev = this;\n\treturn this;\n};\n\nvar Queue = function Queue() {\n\tvar _this = this;\n\n\t_classCallCheck(this, Queue);\n\n\tvar tail = new Node();\n\tvar head = tail;\n\tvar length = 0;\n\n\tthis.push = function (val) {\n\t\tif (length === 0) {\n\t\t\thead.val = val;\n\t\t} else {\n\t\t\tvar node = new Node(val);\n\t\t\thead.prev = node;\n\t\t\thead = node;\n\t\t}\n\t\tlength++;\n\t\treturn _this;\n\t};\n\n\tthis.pop = function () {\n\t\tvar val = tail.val;\n\t\ttail = tail.prev;\n\t\tlength = length > 0 ? length - 1 : 0;\n\t\tif (length === 0) {\n\t\t\ttail.val = undefined;\n\t\t}\n\t\treturn val;\n\t};\n\n\tthis.length = function () {\n\t\treturn length;\n\t};\n\n\tthis.empty = function () {\n\t\ttail = new Node();\n\t\thead = tail;\n\t\tlength = 0;\n\t};\n\n\treturn this;\n};\n\nexports.default = Queue;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Queue.js?");

/***/ }),

/***/ "./src/Race.js":
/*!*********************!*\
  !*** ./src/Race.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n*\n* ```javascript\n*   let chain = Race(\n*     function(next, ...args) {},\n*     function(next, ...args) {},\n*     ...\n*   );\n*\n*   chain(next, ...args);\n* ```\n*\n* Race accepts a number of functions, and returns a task function that executes all of its child tasks simultaneously.  The first result (or error) is returned, and the remaining results (or errors) are ignored.\n*\n* ```javascript\n*   let chain = Race(\n*     (next) => next(null, 1),\n*     (next) => setTimeout(next, 100, null, 2),\n*     (next) => { throw new Error(); } ,\n*   );\n*\n*   let onDone = (err, ...results) => console.log(results);\n*\n*   chain(onDone); // prints out [ 1 ], eventually\n* ```\n*\n* @param {...taskFunction} tasks - any number of tasks to run in parallel.\n* @returns {taskFunction} a task\n* @memberof uchain\n*/\nvar Race = function Race() {\n\tfor (var _len = arguments.length, tasks = Array(_len), _key = 0; _key < _len; _key++) {\n\t\ttasks[_key] = arguments[_key];\n\t}\n\n\ttasks = tasks || _common.noarr;\n\n\tif (tasks.length === 0) {\n\t\treturn function (next) {\n\t\t\treturn (next || _common.nop)();\n\t\t};\n\t}\n\n\ttasks = tasks.map(_common.catchWrapper);\n\n\treturn function (next) {\n\t\tfor (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n\t\t\targs[_key2 - 1] = arguments[_key2];\n\t\t}\n\n\t\tnext = (0, _common.onceWrapper)(next);\n\t\targs = args || _common.noarr;\n\n\t\tfor (var i = 0; i < tasks.length; i++) {\n\t\t\tvar task = tasks[i];\n\t\t\t_common.defer.apply(undefined, [task, next].concat(_toConsumableArray(args)));\n\t\t}\n\t};\n};\n\nexports.default = Race;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Race.js?");

/***/ }),

/***/ "./src/Retry.js":
/*!**********************!*\
  !*** ./src/Retry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar EMPTY_TASK = function EMPTY_TASK(next) {\n\treturn next();\n};\n\n/**\n* Wraps a task and attempts to retry if it throws an error, with an exponential backoff.\n* @param {taskFunction} task - the task to wrap.\n* @param {object} options - an optional set of retry options.\n* @param {object} options.timeout - maximum time to attempt retries.\n* @param {object} options.retries - maximum number of retries to attempt.\n* @returns {taskFunction} a task\n* @memberof uchain\n*/\nvar Retry = function Retry(task, options) {\n\ttask = (0, _common.catchWrapper)(task || EMPTY_TASK);\n\toptions = options || {};\n\toptions.timeout = 8192;\n\toptions.retries = 8;\n\n\tvar wrapper = function wrapper(next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || _common.nop;\n\n\t\tvar timeStarted = Date.now();\n\t\tvar retries = 0;\n\n\t\tvar onDone = function onDone(err) {\n\t\t\tfor (var _len2 = arguments.length, res = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n\t\t\t\tres[_key2 - 1] = arguments[_key2];\n\t\t\t}\n\n\t\t\tvar elapsedTime = Date.now() - timeStarted;\n\t\t\tif (err != null && retries < options.retries && elapsedTime < options.timeout) {\n\t\t\t\tvar delay = 1 << retries;\n\t\t\t\tretries++;\n\t\t\t\tsetTimeout.apply(undefined, [task, delay, onDone].concat(args));\n\t\t\t} else {\n\t\t\t\tnext.apply(undefined, [err].concat(res));\n\t\t\t}\n\t\t};\n\n\t\ttask.apply(undefined, [onDone].concat(args));\n\t};\n\n\treturn wrapper;\n};\n\nexports.default = Retry;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Retry.js?");

/***/ }),

/***/ "./src/Switch.js":
/*!***********************!*\
  !*** ./src/Switch.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n* Switch accepts a lookup task and a map.\n* @param {taskFunction} lookupTask - a lookup task.\n* @param {object} caseMap - a task to run if the condition returns a falsy value.\n* @returns {taskFunction}\n* @memberof uchain\n*/\nvar Switch = function Switch(lookupTask, caseMap) {\n\tlookupTask = lookupTask != null ? (0, _common.catchWrapper)(lookupTask) : function (next) {\n\t\treturn next();\n\t};\n\tcaseMap = caseMap || {};\n\n\treturn function (next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || (0, _common.onceWrapper)(next);\n\t\targs = args || _common.noarr;\n\n\t\tvar onLookup = function onLookup(err, key) {\n\t\t\tif (err) {\n\t\t\t\tnext(err, key);\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar task = caseMap[key] || caseMap.default || _PassThrough2.default;\n\t\t\ttask.apply(undefined, [next].concat(_toConsumableArray(args)));\n\t\t};\n\n\t\tlookupTask.apply(undefined, [onLookup].concat(_toConsumableArray(args)));\n\t};\n};\n\nexports.default = Switch;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Switch.js?");

/***/ }),

/***/ "./src/Throttle.js":
/*!*************************!*\
  !*** ./src/Throttle.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nvar _Queue = __webpack_require__(/*! ./Queue */ \"./src/Queue.js\");\n\nvar _Queue2 = _interopRequireDefault(_Queue);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n* Wraps a task and ensures that only X number of instances of the task can be run in parallel.\n* Requests are queued up in an unbounded FIFO queue until they can be run.\n* @param {taskFunction} task - the task to throttle\n* @param {number} limit - the number of instances that can run in parallel. default 1.\n* @returns {taskFunction} a task\n* @memberof uchain\n*/\nvar Throttle = function Throttle() {\n\tvar task = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _PassThrough2.default;\n\tvar limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n\n\tvar queue = new Throttle.Queue();\n\tvar running = 0;\n\n\tvar throttle = function throttle(next) {\n\t\tfor (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\trest[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = (0, _common.onceWrapper)(next);\n\n\t\tvar after = function after() {\n\t\t\trunning--;\n\t\t\tif (running < limit && queue.length() > 0) {\n\t\t\t\tvar oldArgs = queue.pop();\n\t\t\t\tthrottle.apply(undefined, _toConsumableArray(oldArgs));\n\t\t\t}\n\n\t\t\tnext.apply(undefined, arguments);\n\t\t};\n\n\t\tif (running < limit) {\n\t\t\trunning++;\n\t\t\ttask.apply(undefined, [after].concat(rest));\n\t\t} else {\n\t\t\tqueue.push([next].concat(rest));\n\t\t}\n\t};\n\n\treturn throttle;\n};\n\nThrottle.Queue = _Queue2.default;\n\nexports.default = Throttle;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Throttle.js?");

/***/ }),

/***/ "./src/TimeIn.js":
/*!***********************!*\
  !*** ./src/TimeIn.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nvar _InSeries = __webpack_require__(/*! ./InSeries */ \"./src/InSeries.js\");\n\nvar _InSeries2 = _interopRequireDefault(_InSeries);\n\nvar _InParallel = __webpack_require__(/*! ./InParallel */ \"./src/InParallel.js\");\n\nvar _InParallel2 = _interopRequireDefault(_InParallel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n*\n* ```javascript\n*   let chain = TimeIn(\n*     function(next, ...args) {},\n*\t\t\t1000\n*   );\n*\n*   chain(next, ...args);\n* ```\n*\n* TimeIn wraps a single task function, and returns a function that only returns after X ms.\n*\n* @param {taskFunction} task - the task to wrap in a timeout.\n* @param {number} ms - the timein in ms.\n* @returns {taskFunction} a task\n* @memberof uchain\n*/\nvar TimeIn = function TimeIn() {\n\tvar task = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _PassThrough2.default;\n\tvar ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;\n\treturn (0, _InSeries2.default)((0, _InParallel2.default)(task, function (next) {\n\t\treturn setTimeout(next, ms);\n\t}), function (next, results) {\n\t\treturn next.apply(undefined, [null].concat(_toConsumableArray(results)));\n\t});\n};\n\nmodule.exports = TimeIn;\n\n//# sourceURL=webpack://%5Bname%5D/./src/TimeIn.js?");

/***/ }),

/***/ "./src/TimeOut.js":
/*!************************!*\
  !*** ./src/TimeOut.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _Race = __webpack_require__(/*! ./Race */ \"./src/Race.js\");\n\nvar _Race2 = _interopRequireDefault(_Race);\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n*\n* ```javascript\n*   let chain = TimeOut(\n*     function(next, ...args) {},\n*\t\t\t1000\n*   );\n*\n*   chain(next, ...args);\n* ```\n*\n* TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.\n*\n* NOTE: no error is thrown on a timeout, the result is merely undefined.\n*\n* NOTE: the timeout being triggered will not cancel the original task.\n*\n* @param {taskFunction} task - the task to wrap in a timeout.\n* @param {number} ms - the timeout in ms.\n* @returns {taskFunction} a task\n* @memberof uchain\n*/\nvar TimeOut = function TimeOut() {\n\tvar task = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _PassThrough2.default;\n\tvar ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;\n\treturn (0, _Race2.default)(function (next) {\n\t\treturn setTimeout(next, ms);\n\t}, task);\n};\n\nexports.default = TimeOut;\n\n//# sourceURL=webpack://%5Bname%5D/./src/TimeOut.js?");

/***/ }),

/***/ "./src/Timer.js":
/*!**********************!*\
  !*** ./src/Timer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar EMPTY_TASK = function EMPTY_TASK(next) {\n\treturn next();\n};\n\n/**\n* Wraps a task and logs how long it takes to finish, or fail.\n* @param {taskFunction} task - the task to wrap.\n* @param {string} label - an optional label to log.\n* @returns {taskFunction} a task\n* @memberof uchain\n*/\nvar Timer = function Timer(task, label) {\n\ttask = (0, _common.catchWrapper)(task || EMPTY_TASK);\n\tlabel = label || task.name || 'task';\n\n\tvar timer = function timer(next) {\n\t\tvar start = Date.now();\n\t\tnext = (0, _common.onceWrapper)(next);\n\n\t\tvar done = function done(err) {\n\t\t\tfor (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n\t\t\t\trest[_key2 - 1] = arguments[_key2];\n\t\t\t}\n\n\t\t\tvar end = Date.now();\n\t\t\tconsole.log(err ? 'Timer: ' + label + ' failed in ' + (end - start) + 'ms' : 'Timer: ' + label + ' finished in ' + (end - start) + 'ms');\n\t\t\tnext.apply(undefined, [err].concat(rest));\n\t\t};\n\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\ttask.apply(undefined, [done].concat(args));\n\t};\n\n\treturn timer;\n};\n\nexports.default = Timer;\n\n//# sourceURL=webpack://%5Bname%5D/./src/Timer.js?");

/***/ }),

/***/ "./src/ToPromise.js":
/*!**************************!*\
  !*** ./src/ToPromise.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Promisify = __webpack_require__(/*! ./Promisify */ \"./src/Promisify.js\");\n\nvar _Promisify2 = _interopRequireDefault(_Promisify);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _Promisify2.default;\n/**\n* ```javascript\n*\n*   let chain = InSeries(\n*     function(next, ...args) {...},\n*     function(next, ...args) {...},\n*     ...\n*   );\n*\n*  new Promise()\n*    .then(\n*      ToPromise(chain)\n*    );\n*\n* ```\n*\n* Alias for Promisify\n*\n* Wraps around a task function and greates a promise generator,\n* to make it easier to integrate task functions and promises.\n*\n* NOTE: uchain does not come bundled with a promise library,\n* it expects Promise to already exists in the global namespace.\n*\n* NOTE: because uchain can 'return' multiple values through the next callback,\n* Promisify always resolves to an array of the results returned.\n*\n* @param {function} task - a function that generates a promise from the args.\n* @returns {function} a function that generates a Promise when called\n* @memberof uchain\n*/\n\n//# sourceURL=webpack://%5Bname%5D/./src/ToPromise.js?");

/***/ }),

/***/ "./src/TryCatch.js":
/*!*************************!*\
  !*** ./src/TryCatch.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar DEFAULT_TRY = function DEFAULT_TRY(next) {\n\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\targs[_key - 1] = arguments[_key];\n\t}\n\n\treturn next.apply(undefined, [null].concat(args));\n};\n\nvar DEFAULT_CATCH = function DEFAULT_CATCH(next, err) {\n\tfor (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {\n\t\targs[_key2 - 2] = arguments[_key2];\n\t}\n\n\treturn next.apply(undefined, [err].concat(args));\n};\n\nvar DEFAULT_FINALLY = function DEFAULT_FINALLY(next, err) {\n\tfor (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {\n\t\targs[_key3 - 2] = arguments[_key3];\n\t}\n\n\treturn next.apply(undefined, [err].concat(args));\n};\n\n/**\n* Errors bypass the normal flow of execution.  They always return to the last link in the chain, even if they occur inside nested InSeries or InParallel chains.\n*\n* ```javascript\n*   let chain = InSeries(\n*     (next) => { console.log(1); next(); }\n*     InSeries(\n*       (next) => { console.log(2); next(); }\n*       (next) => { console.log(3); next('Error'); }\n*     ),\n*     InSeries(\n*       (next) => { console.log(4); next();}\n*       (next) => { console.log(5); next();}\n*     )\n*   )(console.log); // prints out 1 2 3 Error, eventually\n* ```\n*\n* If you need to catch an error explicitly at some point, `wrap a chain in CatchError`, which will return the error as the first argument to the next function.\n*\n* ```javascript\n*   let chain = InSeries(\n*     (next) => { console.log(1); next();}\n*     CatchError(\n*       InSeries(\n*         (next) => { console.log(2); next();}\n*         (next) => { console.log(3); next('Error');}\n*       ),\n*     ),\n*     (next, error) => error != null ? console.log('Error Caught') : null,\n*     InSeries(\n*       (next) => { console.log(4); next();}\n*       (next) => { console.log(5); next();}\n*     )\n*   )(console.log); // prints out 1 2 3 Error Caught 4 5, eventually\n* ```\n*\n* @param {taskFunction} _try\n* @param {taskFunction} _catch\n* @param {taskFunction} _finally\n* @returns {taskFunction}\n* @memberof uchain\n*/\nvar TryCatch = function TryCatch(_try, _catch, _finally) {\n\t_try = _try || DEFAULT_TRY;\n\t_try = (0, _common.catchWrapper)(_try);\n\n\t_catch = _catch || DEFAULT_CATCH;\n\t_catch = (0, _common.catchWrapper)(_catch);\n\n\t_finally = _finally || DEFAULT_FINALLY;\n\t_finally = (0, _common.catchWrapper)(_finally);\n\n\tvar wrapper = function wrapper(next) {\n\t\tvar onCatch = function onCatch(err) {\n\t\t\tfor (var _len5 = arguments.length, res = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {\n\t\t\t\tres[_key5 - 1] = arguments[_key5];\n\t\t\t}\n\n\t\t\t_finally.apply(undefined, [next, err].concat(res));\n\t\t};\n\n\t\tvar onTry = function onTry(err) {\n\t\t\tfor (var _len6 = arguments.length, res = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {\n\t\t\t\tres[_key6 - 1] = arguments[_key6];\n\t\t\t}\n\n\t\t\tif (err) {\n\t\t\t\t_catch.apply(undefined, [onCatch, err].concat(res));\n\t\t\t} else {\n\t\t\t\t_finally.apply(undefined, [next, err].concat(res));\n\t\t\t}\n\t\t};\n\n\t\tfor (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {\n\t\t\targs[_key4 - 1] = arguments[_key4];\n\t\t}\n\n\t\t_try.apply(undefined, [onTry].concat(args));\n\t};\n\n\treturn wrapper;\n};\n\nexports.default = TryCatch;\n\n//# sourceURL=webpack://%5Bname%5D/./src/TryCatch.js?");

/***/ }),

/***/ "./src/While.js":
/*!**********************!*\
  !*** ./src/While.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _common = __webpack_require__(/*! ./_common */ \"./src/_common.js\");\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n*\n* ```javascript\n*   let task = While(\n*     function(next, ...args) {},\n*     function(next, ...args) {},\n*   );\n*\n*   chain(next, ...args);\n* ```\n* While accepts two tasks and returns a task that conditionally executes some.\n*\n* ```javascript\n*   let incUntil10 = While(\n*     (next, num) => next(null, num < 10),\n*     (next, num) => { console.log('num', nul); next(null, num + 1); },\n*   );\n*\n*   let onDone = (err, ...results) => console.log(results);\n*\n*   incUntil10(null, 1); // prints 1, 2, ... 9\n* ```\n* note: the results of the loop task are saved to pass into the conditionTask, and the loopTask\n* note: when the condition task returns false, those results are passed down the chain\n* @param {taskFunction} conditionTask - a condition task.\n* @param {taskFunction} loopTask - a task to run if the condition returns a truthy value.\n* @returns {taskFunction}\n* @memberof uchain\n*/\nvar While = function While(conditionTask, loopTask) {\n\tconditionTask = conditionTask != null ? (0, _common.catchWrapper)(conditionTask) : function (next) {\n\t\treturn next(null, false);\n\t};\n\tloopTask = loopTask != null ? (0, _common.catchWrapper)(loopTask) : _PassThrough2.default;\n\n\treturn function (next) {\n\t\tfor (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n\t\t\targs[_key - 1] = arguments[_key];\n\t\t}\n\n\t\tnext = next || (0, _common.onceWrapper)(next);\n\t\targs = args || _common.noarr;\n\n\t\tvar onCondition = void 0;\n\t\tvar onLoop = void 0;\n\n\t\tonCondition = function onCondition(err, res) {\n\t\t\tif (err) {\n\t\t\t\tnext(err, res);\n\t\t\t} else if (res) {\n\t\t\t\tloopTask.apply(undefined, [onLoop].concat(_toConsumableArray(args)));\n\t\t\t} else {\n\t\t\t\tnext.apply(undefined, [null].concat(_toConsumableArray(args)));\n\t\t\t}\n\t\t};\n\n\t\tonLoop = function onLoop(err) {\n\t\t\tfor (var _len2 = arguments.length, res = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n\t\t\t\tres[_key2 - 1] = arguments[_key2];\n\t\t\t}\n\n\t\t\tif (err) {\n\t\t\t\tnext.apply(undefined, [err].concat(res));\n\t\t\t} else {\n\t\t\t\targs = res;\n\t\t\t\tconditionTask.apply(undefined, [onCondition].concat(_toConsumableArray(args)));\n\t\t\t}\n\t\t};\n\n\t\tconditionTask.apply(undefined, [onCondition].concat(_toConsumableArray(args)));\n\t};\n};\n\nexports.default = While;\n\n//# sourceURL=webpack://%5Bname%5D/./src/While.js?");

/***/ }),

/***/ "./src/_common.js":
/*!************************!*\
  !*** ./src/_common.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(setImmediate) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.stringWrapper = exports.catchWrapper = exports.onceWrapper = exports.isFunction = exports.isString = exports.defer = exports.noarr = exports.nop = undefined;\n\n__webpack_require__(/*! setimmediate */ \"./node_modules/setimmediate/setImmediate.js\");\n\nvar defer = setImmediate;\n\nvar noarr = [];\n\nvar nop = function nop(err) {\n\tif (err) {\n\t\tconsole.warn('Warning: uchain ignored error\\n', err);\n\t}\n};\n\nvar isString = function isString(val) {\n\treturn typeof val === 'string' || val instanceof String;\n};\n\nvar isFunction = function isFunction(val) {\n\treturn typeof val === 'function';\n};\n\n// const defer = function () {\n// \tconst args = arguments;\n// \tconsole.log('defer args', args, args.length);\n// \tsetImmediate.apply(undefined, args);\n// };\n//\n\nvar onceWrapper = function onceWrapper(func) {\n\treturn function () {\n\t\tvar args = arguments;\n\t\tvar temp = func || nop;\n\t\tfunc = nop;\n\t\ttemp.apply(undefined, args);\n\t};\n};\n\nvar catchWrapper = function catchWrapper(func) {\n\treturn function (next) {\n\t\tvar args = arguments;\n\t\ttry {\n\t\t\tfunc.apply(undefined, args);\n\t\t} catch (err) {\n\t\t\tnext = next || nop;\n\t\t\tnext(err);\n\t\t}\n\t};\n};\n\nvar stringWrapper = function stringWrapper(log) {\n\tvar builder = (isFunction(log) ? log : null) || (isString(log) ? function () {\n\t\treturn log;\n\t} : null) || function () {\n\t\treturn '';\n\t};\n\n\treturn builder;\n};\n\nexports.nop = nop;\nexports.noarr = noarr;\nexports.defer = defer;\nexports.isString = isString;\nexports.isFunction = isFunction;\nexports.onceWrapper = onceWrapper;\nexports.catchWrapper = catchWrapper;\nexports.stringWrapper = stringWrapper;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/timers-browserify/main.js */ \"./node_modules/timers-browserify/main.js\").setImmediate))\n\n//# sourceURL=webpack://%5Bname%5D/./src/_common.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Assert = __webpack_require__(/*! ./Assert */ \"./src/Assert.js\");\n\nvar _Assert2 = _interopRequireDefault(_Assert);\n\nvar _CatchError = __webpack_require__(/*! ./CatchError */ \"./src/CatchError.js\");\n\nvar _CatchError2 = _interopRequireDefault(_CatchError);\n\nvar _FromPromise = __webpack_require__(/*! ./FromPromise */ \"./src/FromPromise.js\");\n\nvar _FromPromise2 = _interopRequireDefault(_FromPromise);\n\nvar _If = __webpack_require__(/*! ./If */ \"./src/If.js\");\n\nvar _If2 = _interopRequireDefault(_If);\n\nvar _InOrder = __webpack_require__(/*! ./InOrder */ \"./src/InOrder.js\");\n\nvar _InOrder2 = _interopRequireDefault(_InOrder);\n\nvar _InParallel = __webpack_require__(/*! ./InParallel */ \"./src/InParallel.js\");\n\nvar _InParallel2 = _interopRequireDefault(_InParallel);\n\nvar _InSeries = __webpack_require__(/*! ./InSeries */ \"./src/InSeries.js\");\n\nvar _InSeries2 = _interopRequireDefault(_InSeries);\n\nvar _Logging = __webpack_require__(/*! ./Logging */ \"./src/Logging.js\");\n\nvar _Logging2 = _interopRequireDefault(_Logging);\n\nvar _ParallelFilter = __webpack_require__(/*! ./ParallelFilter */ \"./src/ParallelFilter.js\");\n\nvar _ParallelFilter2 = _interopRequireDefault(_ParallelFilter);\n\nvar _ParallelForEach = __webpack_require__(/*! ./ParallelForEach */ \"./src/ParallelForEach.js\");\n\nvar _ParallelForEach2 = _interopRequireDefault(_ParallelForEach);\n\nvar _ParallelMap = __webpack_require__(/*! ./ParallelMap */ \"./src/ParallelMap.js\");\n\nvar _ParallelMap2 = _interopRequireDefault(_ParallelMap);\n\nvar _ParallelObjectFilter = __webpack_require__(/*! ./ParallelObjectFilter */ \"./src/ParallelObjectFilter.js\");\n\nvar _ParallelObjectFilter2 = _interopRequireDefault(_ParallelObjectFilter);\n\nvar _ParallelObjectMap = __webpack_require__(/*! ./ParallelObjectMap */ \"./src/ParallelObjectMap.js\");\n\nvar _ParallelObjectMap2 = _interopRequireDefault(_ParallelObjectMap);\n\nvar _PassThrough = __webpack_require__(/*! ./PassThrough */ \"./src/PassThrough.js\");\n\nvar _PassThrough2 = _interopRequireDefault(_PassThrough);\n\nvar _PromiseWrapper = __webpack_require__(/*! ./PromiseWrapper */ \"./src/PromiseWrapper.js\");\n\nvar _PromiseWrapper2 = _interopRequireDefault(_PromiseWrapper);\n\nvar _Promisify = __webpack_require__(/*! ./Promisify */ \"./src/Promisify.js\");\n\nvar _Promisify2 = _interopRequireDefault(_Promisify);\n\nvar _Race = __webpack_require__(/*! ./Race */ \"./src/Race.js\");\n\nvar _Race2 = _interopRequireDefault(_Race);\n\nvar _Retry = __webpack_require__(/*! ./Retry */ \"./src/Retry.js\");\n\nvar _Retry2 = _interopRequireDefault(_Retry);\n\nvar _Switch = __webpack_require__(/*! ./Switch */ \"./src/Switch.js\");\n\nvar _Switch2 = _interopRequireDefault(_Switch);\n\nvar _Throttle = __webpack_require__(/*! ./Throttle */ \"./src/Throttle.js\");\n\nvar _Throttle2 = _interopRequireDefault(_Throttle);\n\nvar _TimeIn = __webpack_require__(/*! ./TimeIn */ \"./src/TimeIn.js\");\n\nvar _TimeIn2 = _interopRequireDefault(_TimeIn);\n\nvar _TimeOut = __webpack_require__(/*! ./TimeOut */ \"./src/TimeOut.js\");\n\nvar _TimeOut2 = _interopRequireDefault(_TimeOut);\n\nvar _Timer = __webpack_require__(/*! ./Timer */ \"./src/Timer.js\");\n\nvar _Timer2 = _interopRequireDefault(_Timer);\n\nvar _ToPromise = __webpack_require__(/*! ./ToPromise */ \"./src/ToPromise.js\");\n\nvar _ToPromise2 = _interopRequireDefault(_ToPromise);\n\nvar _TryCatch = __webpack_require__(/*! ./TryCatch */ \"./src/TryCatch.js\");\n\nvar _TryCatch2 = _interopRequireDefault(_TryCatch);\n\nvar _While = __webpack_require__(/*! ./While */ \"./src/While.js\");\n\nvar _While2 = _interopRequireDefault(_While);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/** @namespace uchain */\n\n/**\n* An async callback function.\n*\n* @callback nextFunction\n* @param {error} err\n* @param {...*} results\n*/\n\n/**\n* An async task function.\n*\n* @callback taskFunction\n* @param {nextFunction} next\n* @param {...*} args\n*/\n\n/**\n* A string building function.\n*\n* @callback stringBuilder\n* @param {...*} args\n* @returns {string} the string\n*/\n\n// const {\n// \tAssert,\n// \tPassThrough,\n// \tInSeries,\n// \tInParallel,\n// } = require('./uchain');\n//\n// module.exports = {\n// \tAssert,\n// \tInSeries,\n// \tInParallel,\n// \tPassThrough,\n// };\n\nmodule.exports = {\n\tAssert: _Assert2.default,\n\tCatchError: _CatchError2.default,\n\tFromPromise: _FromPromise2.default,\n\tIf: _If2.default,\n\tInOrder: _InOrder2.default,\n\tInParallel: _InParallel2.default,\n\tInSeries: _InSeries2.default,\n\tLogging: _Logging2.default,\n\tParallelFilter: _ParallelFilter2.default,\n\tParallelForEach: _ParallelForEach2.default,\n\tParallelMap: _ParallelMap2.default,\n\tParallelObjectFilter: _ParallelObjectFilter2.default,\n\tParallelObjectMap: _ParallelObjectMap2.default,\n\tPassThrough: _PassThrough2.default,\n\tPromiseWrapper: _PromiseWrapper2.default,\n\tPromisify: _Promisify2.default,\n\tRace: _Race2.default,\n\tRetry: _Retry2.default,\n\tSwitch: _Switch2.default,\n\tThrottle: _Throttle2.default,\n\tTimeIn: _TimeIn2.default,\n\tTimeOut: _TimeOut2.default,\n\tTimer: _Timer2.default,\n\tToPromise: _ToPromise2.default,\n\tTryCatch: _TryCatch2.default,\n\tWhile: _While2.default\n};\n\n//# sourceURL=webpack://%5Bname%5D/./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack://%5Bname%5D/multi_./src/index.js?");

/***/ })

/******/ });
});