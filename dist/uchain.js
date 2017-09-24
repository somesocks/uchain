!function(r,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.uchain=n():r.uchain=n()}(this,function(){return function(r){function n(e){if(t[e])return t[e].exports;var o=t[e]={exports:{},id:e,loaded:!1};return r[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=r,n.c=t,n.p="",n(0)}([function(r,n,t){r.exports=t(1)},function(r,n,t){"use strict";r.exports={Assert:t(2),CatchError:t(7),FromPromise:t(8),If:t(11),InParallel:t(12),InSeries:t(13),Logging:t(14),ParallelFilter:t(15),ParallelForEach:t(17),ParallelMap:t(16),ParallelObjectFilter:t(18),ParallelObjectMap:t(19),PassThrough:t(10),PromiseWrapper:t(9),Promisify:t(20),Race:t(21),Throttle:t(22),TimeIn:t(24),TimeOut:t(25),Timer:t(26),ToPromise:t(27),While:t(28)}},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.nop,i=o.noarr,c=o.catchWrapper,u=function(r,n){return r=r||a,n=n||"uchain assert failed",c(function(t){for(var o=arguments.length,c=Array(o>1?o-1:0),u=1;u<o;u++)c[u-1]=arguments[u];t=t||a,c=c||i;var f=r(c)?null:new Error(n);t.apply(void 0,[f].concat(e(c)))})};r.exports=u},function(r,n,t){(function(n){"use strict";t(5);var e=[],o=function(r){r&&console.warn("Warning: uchain ignored error\n",r)},a=function(r){return function(){var n=arguments,t=r||o;r=o,t.apply(void 0,n)}},i=n,c=function(r){return function(n){var t=arguments;try{r.apply(void 0,t)}catch(r){n=n||o,n(r)}}};r.exports={nop:o,noarr:e,once:a,defer:i,catchWrapper:c}}).call(n,t(4).setImmediate)},function(r,n,t){function e(r,n){this._id=r,this._clearFn=n}var o=Function.prototype.apply;n.setTimeout=function(){return new e(o.call(setTimeout,window,arguments),clearTimeout)},n.setInterval=function(){return new e(o.call(setInterval,window,arguments),clearInterval)},n.clearTimeout=n.clearInterval=function(r){r&&r.close()},e.prototype.unref=e.prototype.ref=function(){},e.prototype.close=function(){this._clearFn.call(window,this._id)},n.enroll=function(r,n){clearTimeout(r._idleTimeoutId),r._idleTimeout=n},n.unenroll=function(r){clearTimeout(r._idleTimeoutId),r._idleTimeout=-1},n._unrefActive=n.active=function(r){clearTimeout(r._idleTimeoutId);var n=r._idleTimeout;n>=0&&(r._idleTimeoutId=setTimeout(function(){r._onTimeout&&r._onTimeout()},n))},t(5),n.setImmediate=setImmediate,n.clearImmediate=clearImmediate},function(r,n,t){(function(r,n){!function(r,t){"use strict";function e(r){"function"!=typeof r&&(r=new Function(""+r));for(var n=new Array(arguments.length-1),t=0;t<n.length;t++)n[t]=arguments[t+1];var e={callback:r,args:n};return y[h]=e,v(h),h++}function o(r){delete y[r]}function a(r){var n=r.callback,e=r.args;switch(e.length){case 0:n();break;case 1:n(e[0]);break;case 2:n(e[0],e[1]);break;case 3:n(e[0],e[1],e[2]);break;default:n.apply(t,e)}}function i(r){if(d)setTimeout(i,0,r);else{var n=y[r];if(n){d=!0;try{a(n)}finally{o(r),d=!1}}}}function c(){v=function(r){n.nextTick(function(){i(r)})}}function u(){if(r.postMessage&&!r.importScripts){var n=!0,t=r.onmessage;return r.onmessage=function(){n=!1},r.postMessage("","*"),r.onmessage=t,n}}function f(){var n="setImmediate$"+Math.random()+"$",t=function(t){t.source===r&&"string"==typeof t.data&&0===t.data.indexOf(n)&&i(+t.data.slice(n.length))};r.addEventListener?r.addEventListener("message",t,!1):r.attachEvent("onmessage",t),v=function(t){r.postMessage(n+t,"*")}}function l(){var r=new MessageChannel;r.port1.onmessage=function(r){var n=r.data;i(n)},v=function(n){r.port2.postMessage(n)}}function s(){var r=g.documentElement;v=function(n){var t=g.createElement("script");t.onreadystatechange=function(){i(n),t.onreadystatechange=null,r.removeChild(t),t=null},r.appendChild(t)}}function p(){v=function(r){setTimeout(i,0,r)}}if(!r.setImmediate){var v,h=1,y={},d=!1,g=r.document,m=Object.getPrototypeOf&&Object.getPrototypeOf(r);m=m&&m.setTimeout?m:r,"[object process]"==={}.toString.call(r.process)?c():u()?f():r.MessageChannel?l():g&&"onreadystatechange"in g.createElement("script")?s():p(),m.setImmediate=e,m.clearImmediate=o}}("undefined"==typeof self?"undefined"==typeof r?this:r:self)}).call(n,function(){return this}(),t(6))},function(r,n){function t(){throw new Error("setTimeout has not been defined")}function e(){throw new Error("clearTimeout has not been defined")}function o(r){if(l===setTimeout)return setTimeout(r,0);if((l===t||!l)&&setTimeout)return l=setTimeout,setTimeout(r,0);try{return l(r,0)}catch(n){try{return l.call(null,r,0)}catch(n){return l.call(this,r,0)}}}function a(r){if(s===clearTimeout)return clearTimeout(r);if((s===e||!s)&&clearTimeout)return s=clearTimeout,clearTimeout(r);try{return s(r)}catch(n){try{return s.call(null,r)}catch(n){return s.call(this,r)}}}function i(){y&&v&&(y=!1,v.length?h=v.concat(h):d=-1,h.length&&c())}function c(){if(!y){var r=o(i);y=!0;for(var n=h.length;n;){for(v=h,h=[];++d<n;)v&&v[d].run();d=-1,n=h.length}v=null,y=!1,a(r)}}function u(r,n){this.fun=r,this.array=n}function f(){}var l,s,p=r.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:t}catch(r){l=t}try{s="function"==typeof clearTimeout?clearTimeout:e}catch(r){s=e}}();var v,h=[],y=!1,d=-1;p.nextTick=function(r){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];h.push(new u(r,n)),1!==h.length||y||o(c)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=f,p.addListener=f,p.once=f,p.off=f,p.removeListener=f,p.removeAllListeners=f,p.emit=f,p.prependListener=f,p.prependOnceListener=f,p.listeners=function(r){return[]},p.binding=function(r){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(r){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.catchWrapper,i=o.nop,c=o.noarr,u=function(r){return r=a(r),function(n){for(var t=arguments.length,o=Array(t>1?t-1:0),a=1;a<t;a++)o[a-1]=arguments[a];n=n||i,o=o||c,r.apply(void 0,[function(){for(var r=arguments.length,t=Array(r),o=0;o<r;o++)t[o]=arguments[o];return n.apply(void 0,[null].concat(e(t||c)))}].concat(e(o)))}};r.exports=u},function(r,n,t){"use strict";var e=t(9);r.exports=e},function(r,n,t){"use strict";var e=t(3),o=e.catchWrapper,a=t(10),i=function(r){if(null==r)return a;var n=function(n){for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];var a=r.apply(void 0,e);return a.then(function(){for(var r=arguments.length,t=Array(r),e=0;e<r;e++)t[e]=arguments[e];return n.apply(void 0,[null].concat(t))},n)};return o(n)};r.exports=i},function(r,n,t){"use strict";var e=t(3),o=e.nop,a=function(r){var n=arguments;r=r||o,n[0]=void 0,r.apply(void 0,n)};r.exports=a},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.once,i=o.catchWrapper,c=o.noarr,u=t(10),f=function(r,n,t){return r=null!=r?i(r):u,n=null!=n?i(n):u,t=null!=t?i(t):u,function(o){for(var i=arguments.length,u=Array(i>1?i-1:0),f=1;f<i;f++)u[f-1]=arguments[f];o=o||a(o),u=u||c;var l=function(r,a){r?o(r,a):a?n.apply(void 0,[o].concat(e(u))):t.apply(void 0,[o].concat(e(u)))};r.apply(void 0,[l].concat(e(u)))}};r.exports=f},function(r,n,t){"use strict";var e=t(3),o=e.defer,a=e.once,i=e.catchWrapper,c=e.nop,u=function(r){return(r||c)()},f=function(){var r=arguments;if(0===r.length)return u;var n=function(n){var t=arguments;n=a(n);for(var e=Array(r.length+1),c=0,u=function(u){var f=function(t){if(t)n(t);else{for(var o=arguments.length,a=Array(o>1?o-1:0),i=1;i<o;i++)a[i-1]=arguments[i];e[u+1]=a,c++,c===r.length&&n.apply(void 0,e)}},l=i(r[u]).bind(void 0,a(f));t[0]=l,t.length=t.length>1?t.length:1,o.apply(void 0,t)},f=0;f<r.length;f++)u(f)};return n};r.exports=f},function(r,n,t){"use strict";var e=t(3),o=e.defer,a=e.once,i=e.catchWrapper,c=e.nop,u=function(r){return(r||c)()},f=function(){var r=arguments;if(0===r.length)return u;var n=function(n){var t=arguments;n=a(n);var e=0,c=function t(){var c=arguments;if(null!=c[0])n.apply(void 0,c);else if(e>=r.length)n.apply(void 0,c);else{var u=i(r[e++]).bind(void 0,a(t));c[0]=u,c.length=c.length||1,o.apply(void 0,c)}};t[0]=void 0,c.apply(void 0,t)};return n};r.exports=f},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.nop,i=o.noarr,c=function(r){return"string"==typeof r||r instanceof String},u=function(){var r;return(r=console).log.apply(r,arguments)},f=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";r=c(r)?{tag:r}:r,r.tag=null!=r.tag?r.tag:"",r.logger=null!=r.logger?r.logger:u,r.logArgs=null==r.logArgs||r.logArgs;var n=r,t=n.tag,o=n.logger,f=n.logArgs;return function(r){for(var n=arguments.length,c=Array(n>1?n-1:0),u=1;u<n;u++)c[u-1]=arguments[u];c=c||i,f?o.apply(void 0,[t].concat(e(c))):o(t),(r||a).apply(void 0,[null].concat(e(c)))}};r.exports=f},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.nop,i=o.noarr,c=t(13),u=t(16),f=function(r){return function(n){for(var t=arguments.length,o=Array(t>1?t-1:0),f=1;f<t;f++)o[f-1]=arguments[f];n=n||a,o=o||i,c(u(r),function(r){for(var n=arguments.length,t=Array(n>1?n-1:0),a=1;a<n;a++)t[a-1]=arguments[a];t=t||i;var c=o.filter(function(r,n){return t[n]});r.apply(void 0,[null].concat(e(c)))})(n)}};r.exports=f},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.nop,i=o.noarr,c=t(13),u=t(12),f=function(r){return function(n){for(var t=arguments.length,o=Array(t>1?t-1:0),f=1;f<t;f++)o[f-1]=arguments[f];n=n||a,o=o||i;var l=o.map(function(n,t){return function(e){return r(e,n,t)}});c(u.apply(void 0,e(l)),function(r){for(var n=arguments.length,t=Array(n>1?n-1:0),o=1;o<n;o++)t[o-1]=arguments[o];t=t||i,t=t.map(function(r){return r[0]}),r.apply(void 0,[null].concat(e(t)))})(n)}};r.exports=f},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.nop,i=o.noarr,c=t(13),u=t(12),f=function(r){return function(n){for(var t=arguments.length,o=Array(t>1?t-1:0),f=1;f<t;f++)o[f-1]=arguments[f];n=n||a,o=o||i;var l=o.map(function(n){return function(t){return r(t,n)}});c(u.apply(void 0,e(l)),function(r){return r()})(n)}};r.exports=f},function(r,n,t){"use strict";var e=t(3),o=e.defer,a=e.once,i=e.catchWrapper,c=function(r){return r=i(r),function(n,t){n=a(n);var e=0,i={},c=function(c){if(t.hasOwnProperty(c)){e++;var u=t[c],f=function(r,t){r?n(r):(t&&(i[c]=u),e--,0===e&&n(null,i))};o(r,a(f),c,u)}};for(var u in t)c(u);0===e&&n(null,{})}};r.exports=c},function(r,n,t){"use strict";var e=t(3),o=e.defer,a=e.once,i=e.catchWrapper,c=function(r){return r=i(r),function(n,t){n=a(n);var e=0,i={},c=function(c){if(t.hasOwnProperty(c)){e++;var u=t[c],f=function(r,t){r?n(r):(i[c]=t,e--,0===e&&n(null,i))};o(r,a(f),c,u)}};for(var u in t)c(u);0===e&&n(null,{})}};r.exports=c},function(r,n,t){"use strict";var e=t(3),o=e.catchWrapper,a=t(10),i=function(r){if(null==r)return a;r=o(r);var n=function(){for(var n=arguments.length,t=Array(n),e=0;e<n;e++)t[e]=arguments[e];var o=function(n,e){var o=function(r){for(var t=arguments.length,o=Array(t>1?t-1:0),a=1;a<t;a++)o[a-1]=arguments[a];r?e(r):n(o)};r.apply(void 0,[o].concat(t))};return new Promise(o)};return n};r.exports=i},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.defer,i=o.once,c=o.catchWrapper,u=o.nop,f=o.noarr,l=function(){for(var r=arguments.length,n=Array(r),t=0;t<r;t++)n[t]=arguments[t];return n=n||f,0===n.length?function(r){return(r||u)()}:(n=n.map(c),function(r){for(var t=arguments.length,o=Array(t>1?t-1:0),c=1;c<t;c++)o[c-1]=arguments[c];r=i(r),o=o||f;for(var u=0;u<n.length;u++){var l=n[u];a.apply(void 0,[l,r].concat(e(o)))}})};r.exports=l},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(10),a=t(23),i=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=new a,i=0,c=function o(a){for(var c=arguments.length,u=Array(c>1?c-1:0),f=1;f<c;f++)u[f-1]=arguments[f];var l=function(){if(i--,i<n&&t.length()>0){var r=t.pop();o.apply(void 0,e(r))}a.apply(void 0,arguments)};i<n?(i++,r.apply(void 0,[l].concat(u))):t.push([a].concat(u))};return c};r.exports=i},function(r,n){"use strict";function t(r,n){if(!(r instanceof n))throw new TypeError("Cannot call a class as a function")}var e=function r(n){return t(this,r),this.val=n,this.prev=this,this},o=function r(){var n=this;t(this,r);var o=new e,a=o,i=0;return this.push=function(r){if(0===i)a.val=r;else{var t=new e(r);a.prev=t,a=t}return i++,n},this.pop=function(){var r=o.val;return o=o.prev,i=i>0?i-1:0,0===i&&(o.val=void 0),r},this.length=function(){return i},this.empty=function(){o=new e,a=o,i=0},this};r.exports=o},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=(o.defer,o.once,o.catchWrapper,o.nop,o.noarr,t(10)),i=t(13),c=t(12),u=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return i(c(r,function(r){return setTimeout(r,n)}),function(r,n){return r.apply(void 0,[null].concat(e(n)))})};r.exports=u},function(r,n,t){"use strict";var e=t(3),o=(e.defer,e.once,e.catchWrapper,e.nop,e.noarr,t(21)),a=t(10),i=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;return o(function(r){return setTimeout(r,n)},r)};r.exports=i},function(r,n,t){"use strict";var e=t(3),o=e.once,a=e.catchWrapper,i=function(r){return r()},c=function(r,n){r=a(r||i),n=n||r.name||"task";var t=function(t){var e=Date.now();t=o(t);for(var a=function(r){for(var o=arguments.length,a=Array(o>1?o-1:0),i=1;i<o;i++)a[i-1]=arguments[i];var c=Date.now();console.log(r?"Timer: "+n+" failed in "+(c-e)+"ms":"Timer: "+n+" finished in "+(c-e)+"ms"),t.apply(void 0,[r].concat(a))},i=arguments.length,c=Array(i>1?i-1:0),u=1;u<i;u++)c[u-1]=arguments[u];r.apply(void 0,[a].concat(c))};return t};r.exports=c},function(r,n,t){"use strict";var e=t(20);r.exports=e},function(r,n,t){"use strict";function e(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}var o=t(3),a=o.once,i=o.catchWrapper,c=o.noarr,u=t(10),f=function(r,n){return r=null!=r?i(r):function(r){return r(null,!1)},n=null!=n?i(n):u,function(t){for(var o=arguments.length,i=Array(o>1?o-1:0),u=1;u<o;u++)i[u-1]=arguments[u];t=t||a(t),i=i||c;var f=void 0,l=void 0;f=function(r,o){r?t(r,o):o?n.apply(void 0,[l].concat(e(i))):t.apply(void 0,[null].concat(e(i)))},l=function(n){for(var o=arguments.length,a=Array(o>1?o-1:0),c=1;c<o;c++)a[c-1]=arguments[c];n?t.apply(void 0,[n].concat(a)):(i=a,r.apply(void 0,[f].concat(e(i))))},r.apply(void 0,[f].concat(e(i)))}};r.exports=f}])});