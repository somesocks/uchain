!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var r=n();for(var e in r)("object"==typeof exports?exports:t)[e]=r[e]}}(this,function(){return function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){t.exports=r(1)},function(t,n,r){"use strict";t.exports={Assert:r(2),CatchError:r(7),InParallel:r(8),InSeries:r(9),Logging:r(10),ParallelFilter:r(11),ParallelForEach:r(13),ParallelMap:r(12),ParallelObjectFilter:r(14),ParallelObjectMap:r(15),PassThrough:r(16),Race:r(17),Throttle:r(18)}},function(t,n,r){"use strict";var e=r(3),o=e.nop,i=function(t,n){return t=t||o,n=n||"uchain assert failed",function(r){for(var e=arguments.length,i=Array(e>1?e-1:0),a=1;a<e;a++)i[a-1]=arguments[a];r=r||o;var u=t(i)?null:new Error(n+"\nargs: "+JSON.stringify(i));r.apply(void 0,[u].concat(i))}};t.exports=i},function(t,n,r){(function(n){"use strict";r(5);var e=function(t){t&&console.warn("Warning: uchain ignored error\n",t)},o=function(t){return function(){var n=t||e;t=e,n.apply(void 0,arguments)}},i=n,a=function(t){return function(n){for(var r=arguments.length,e=Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];try{t.apply(void 0,[n].concat(e))}catch(t){n(t)}}};t.exports={nop:e,once:o,defer:i,catchWrapper:a}}).call(n,r(4).setImmediate)},function(t,n,r){function e(t,n){this._id=t,this._clearFn=n}var o=Function.prototype.apply;n.setTimeout=function(){return new e(o.call(setTimeout,window,arguments),clearTimeout)},n.setInterval=function(){return new e(o.call(setInterval,window,arguments),clearInterval)},n.clearTimeout=n.clearInterval=function(t){t&&t.close()},e.prototype.unref=e.prototype.ref=function(){},e.prototype.close=function(){this._clearFn.call(window,this._id)},n.enroll=function(t,n){clearTimeout(t._idleTimeoutId),t._idleTimeout=n},n.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},n._unrefActive=n.active=function(t){clearTimeout(t._idleTimeoutId);var n=t._idleTimeout;n>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},n))},r(5),n.setImmediate=setImmediate,n.clearImmediate=clearImmediate},function(t,n,r){(function(t,n){!function(t,r){"use strict";function e(t){"function"!=typeof t&&(t=new Function(""+t));for(var n=new Array(arguments.length-1),r=0;r<n.length;r++)n[r]=arguments[r+1];var e={callback:t,args:n};return d[v]=e,h(v),v++}function o(t){delete d[t]}function i(t){var n=t.callback,e=t.args;switch(e.length){case 0:n();break;case 1:n(e[0]);break;case 2:n(e[0],e[1]);break;case 3:n(e[0],e[1],e[2]);break;default:n.apply(r,e)}}function a(t){if(g)setTimeout(a,0,t);else{var n=d[t];if(n){g=!0;try{i(n)}finally{o(t),g=!1}}}}function u(){h=function(t){n.nextTick(function(){a(t)})}}function c(){if(t.postMessage&&!t.importScripts){var n=!0,r=t.onmessage;return t.onmessage=function(){n=!1},t.postMessage("","*"),t.onmessage=r,n}}function l(){var n="setImmediate$"+Math.random()+"$",r=function(r){r.source===t&&"string"==typeof r.data&&0===r.data.indexOf(n)&&a(+r.data.slice(n.length))};t.addEventListener?t.addEventListener("message",r,!1):t.attachEvent("onmessage",r),h=function(r){t.postMessage(n+r,"*")}}function f(){var t=new MessageChannel;t.port1.onmessage=function(t){var n=t.data;a(n)},h=function(n){t.port2.postMessage(n)}}function s(){var t=y.documentElement;h=function(n){var r=y.createElement("script");r.onreadystatechange=function(){a(n),r.onreadystatechange=null,t.removeChild(r),r=null},t.appendChild(r)}}function p(){h=function(t){setTimeout(a,0,t)}}if(!t.setImmediate){var h,v=1,d={},g=!1,y=t.document,m=Object.getPrototypeOf&&Object.getPrototypeOf(t);m=m&&m.setTimeout?m:t,"[object process]"==={}.toString.call(t.process)?u():c()?l():t.MessageChannel?f():y&&"onreadystatechange"in y.createElement("script")?s():p(),m.setImmediate=e,m.clearImmediate=o}}("undefined"==typeof self?"undefined"==typeof t?this:t:self)}).call(n,function(){return this}(),r(6))},function(t,n){function r(){throw new Error("setTimeout has not been defined")}function e(){throw new Error("clearTimeout has not been defined")}function o(t){if(f===setTimeout)return setTimeout(t,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(n){try{return f.call(null,t,0)}catch(n){return f.call(this,t,0)}}}function i(t){if(s===clearTimeout)return clearTimeout(t);if((s===e||!s)&&clearTimeout)return s=clearTimeout,clearTimeout(t);try{return s(t)}catch(n){try{return s.call(null,t)}catch(n){return s.call(this,t)}}}function a(){d&&h&&(d=!1,h.length?v=h.concat(v):g=-1,v.length&&u())}function u(){if(!d){var t=o(a);d=!0;for(var n=v.length;n;){for(h=v,v=[];++g<n;)h&&h[g].run();g=-1,n=v.length}h=null,d=!1,i(t)}}function c(t,n){this.fun=t,this.array=n}function l(){}var f,s,p=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(t){f=r}try{s="function"==typeof clearTimeout?clearTimeout:e}catch(t){s=e}}();var h,v=[],d=!1,g=-1;p.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];v.push(new c(t,n)),1!==v.length||d||o(u)},c.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=l,p.addListener=l,p.once=l,p.off=l,p.removeListener=l,p.removeAllListeners=l,p.emit=l,p.prependListener=l,p.prependOnceListener=l,p.listeners=function(t){return[]},p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(t,n,r){"use strict";var e=r(3),o=e.catchWrapper,i=e.nop,a=function(t){return t=o(t),function(n){for(var r=arguments.length,e=Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];n=n||i,t.apply(void 0,[function(){for(var t=arguments.length,r=Array(t),e=0;e<t;e++)r[e]=arguments[e];return n.apply(void 0,[null].concat(r))}].concat(e))}};t.exports=a},function(t,n,r){"use strict";var e=r(3),o=e.defer,i=e.once,a=e.catchWrapper,u=e.nop,c=function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return 0===n.length?function(t){return(t||u)()}:(n=n.map(a),function(t){for(var r=arguments.length,e=Array(r>1?r-1:0),a=1;a<r;a++)e[a-1]=arguments[a];t=i(t);for(var u=0,c=[],l=function(r){var a=n[r],l=function(e){for(var o=arguments.length,i=Array(o>1?o-1:0),a=1;a<o;a++)i[a-1]=arguments[a];e?t(e):(u++,c[r]=i,u===n.length&&t.apply(void 0,[null].concat(c)))};o.apply(void 0,[a,i(l)].concat(e))},f=0;f<n.length;f++)l(f)})};t.exports=c},function(t,n,r){"use strict";var e=r(3),o=e.defer,i=e.once,a=e.catchWrapper,u=e.nop,c=function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return 0===n.length?function(t){return(t||u)()}:(n=n.map(a),function(t){for(var r=arguments.length,e=Array(r>1?r-1:0),a=1;a<r;a++)e[a-1]=arguments[a];t=i(t);var u=0,c=function r(e){for(var a=arguments.length,c=Array(a>1?a-1:0),l=1;l<a;l++)c[l-1]=arguments[l];if(e||u>=n.length)t.apply(void 0,[e].concat(c));else{var f=n[u++];o.apply(void 0,[f,i(r)].concat(c))}};c.apply(void 0,[null].concat(e))})};t.exports=c},function(t,n,r){"use strict";var e=r(3),o=e.nop,i=function(t){return"string"==typeof t||t instanceof String},a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";t=i(t)?{tag:t}:t,t.tag=null!=t.tag?t.tag:"",t.logger=null!=t.logger?t.logger:console.log,t.logArgs=null==t.logArgs||t.logArgs;var n=t,r=n.tag,e=n.logger,a=n.logArgs;return function(t){for(var n=arguments.length,i=Array(n>1?n-1:0),u=1;u<n;u++)i[u-1]=arguments[u];a?e.apply(void 0,[r].concat(i)):e(r),(t||o).apply(void 0,[null].concat(i))}};t.exports=a},function(t,n,r){"use strict";function e(t){if(Array.isArray(t)){for(var n=0,r=Array(t.length);n<t.length;n++)r[n]=t[n];return r}return Array.from(t)}var o=r(9),i=r(12),a=function(t){return function(n){for(var r=arguments.length,a=Array(r>1?r-1:0),u=1;u<r;u++)a[u-1]=arguments[u];o(i(t),function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];var i=a.filter(function(t,n){return r[n]});t.apply(void 0,[null].concat(e(i)))})(n)}};t.exports=a},function(t,n,r){"use strict";function e(t){if(Array.isArray(t)){for(var n=0,r=Array(t.length);n<t.length;n++)r[n]=t[n];return r}return Array.from(t)}var o=r(9),i=r(8),a=function(t){return function(n){for(var r=arguments.length,a=Array(r>1?r-1:0),u=1;u<r;u++)a[u-1]=arguments[u];var c=a.map(function(n,r){return function(e){return t(e,n,r)}});o(i.apply(void 0,e(c)),function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];r=r.map(function(t){return t[0]}),t.apply(void 0,[null].concat(e(r)))})(n)}};t.exports=a},function(t,n,r){"use strict";function e(t){if(Array.isArray(t)){for(var n=0,r=Array(t.length);n<t.length;n++)r[n]=t[n];return r}return Array.from(t)}var o=r(9),i=r(8),a=function(t){return function(n){for(var r=arguments.length,a=Array(r>1?r-1:0),u=1;u<r;u++)a[u-1]=arguments[u];var c=a.map(function(n){return function(r){return t(r,n)}});o(i.apply(void 0,e(c)),function(t){return t()})(n)}};t.exports=a},function(t,n,r){"use strict";var e=r(3),o=e.defer,i=e.once,a=e.catchWrapper,u=function(t){return t=a(t),function(n,r){n=i(n);var e=0,a={},u=function(u){if(r.hasOwnProperty(u)){e++;var c=r[u],l=function(t,r){t?n(t):(r&&(a[u]=c),e--,0===e&&n(null,a))};o(t,i(l),u,c)}};for(var c in r)u(c);0===e&&n(null,{})}};t.exports=u},function(t,n,r){"use strict";var e=r(3),o=e.defer,i=e.once,a=e.catchWrapper,u=function(t){return t=a(t),function(n,r){n=i(n);var e=0,a={},u=function(u){if(r.hasOwnProperty(u)){e++;var c=r[u],l=function(t,r){t?n(t):(a[u]=r,e--,0===e&&n(null,a))};o(t,i(l),u,c)}};for(var c in r)u(c);0===e&&n(null,{})}};t.exports=u},function(t,n,r){"use strict";var e=r(3),o=e.nop,i=function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),e=1;e<n;e++)r[e-1]=arguments[e];return(t||o).apply(void 0,[null].concat(r))};t.exports=i},function(t,n,r){"use strict";var e=r(3),o=e.defer,i=e.once,a=e.catchWrapper,u=e.nop,c=function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return 0===n.length?function(t){return(t||u)()}:(n=n.map(a),function(t){for(var r=arguments.length,e=Array(r>1?r-1:0),a=1;a<r;a++)e[a-1]=arguments[a];t=i(t);for(var u=0;u<n.length;u++){var c=n[u];o.apply(void 0,[c,t].concat(e))}})};t.exports=c},function(t,n,r){"use strict";function e(t){if(Array.isArray(t)){for(var n=0,r=Array(t.length);n<t.length;n++)r[n]=t[n];return r}return Array.from(t)}function o(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}}(),a=r(16),u=function(){function t(){return o(this,t),this._queue={},this.head=0,this.tail=0,this.churn=0,this.push=this.push.bind(this),this.pop=this.pop.bind(this),this.length=this.length.bind(this),this}return i(t,[{key:"push",value:function(t){return this._queue[this.head]=t,this.head++,this}},{key:"pop",value:function(){if(this.head>this.tail){var t=this._queue[this.tail];return this._queue[this.tail]=null,this.tail++,this.churn++,t}return null}},{key:"length",value:function(){return this.head-this.tail}}]),t}(),c=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=new u,o=0,i=function i(){for(var a=arguments.length,u=Array(a),c=0;c<a;c++)u[c]=arguments[c];var l=u[0],f=u.slice(1),s=function(){if(o--,o<n&&r.length()>0){var t=r.pop();i.apply(void 0,e(t))}l.apply(void 0,arguments)};o<n?(o++,t.apply(void 0,[s].concat(e(f)))):r.push(u)};return i};t.exports=c}])});