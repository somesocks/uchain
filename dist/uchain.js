!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){(function(t){"use strict";n(3);var r=function(e){return function(){return e=null!=e?e.apply(void 0,arguments):null}},o=t,i=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,i=Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];e=r(e);for(var c=0,u=[],l=function(n){var a=t[n],l=r(function(r){for(var o=arguments.length,i=Array(o>1?o-1:0),a=1;a<o;a++)i[a-1]=arguments[a];r?e(r):(c++,u[n]=1===i.length?i[0]:i,c===t.length&&e.apply(void 0,[null].concat(u)))});o.apply(void 0,[a,l].concat(i))},f=0;f<t.length;f++)l(f)}},a=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,i=Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];e=r(e);var c=0,u=function n(i){for(var a=arguments.length,u=Array(a>1?a-1:0),l=1;l<a;l++)u[l-1]=arguments[l];if(i||c>=t.length)e.apply(void 0,[i].concat(u));else{var f=t[c++];o.apply(void 0,[f,r(n)].concat(u))}};u.apply(void 0,[null].concat(i))}},c=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e.apply(void 0,[null].concat(n))},u=function(e){return function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];e.apply(void 0,[function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return t.apply(void 0,[null].concat(n))}].concat(r))}},l=function(e){return function(t){for(var n,r=arguments.length,o=Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];(n=console).log.apply(n,[e].concat(o)),t.apply(void 0,[null].concat(o))}};e.exports={InSeries:a,InParallel:i,CatchError:u,Logging:l,PassThrough:c}}).call(t,n(2).setImmediate)},function(e,t,n){function r(e,t){this._id=e,this._clearFn=t}var o=Function.prototype.apply;t.setTimeout=function(){return new r(o.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new r(o.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(3),t.setImmediate=setImmediate,t.clearImmediate=clearImmediate},function(e,t,n){(function(e,t){!function(e,n){"use strict";function r(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var r={callback:e,args:t};return h[m]=r,d(m),m++}function o(e){delete h[e]}function i(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}function a(e){if(v)setTimeout(a,0,e);else{var t=h[e];if(t){v=!0;try{i(t)}finally{o(e),v=!1}}}}function c(){d=function(e){t.nextTick(function(){a(e)})}}function u(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}function l(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&a(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),d=function(n){e.postMessage(t+n,"*")}}function f(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;a(t)},d=function(t){e.port2.postMessage(t)}}function s(){var e=y.documentElement;d=function(t){var n=y.createElement("script");n.onreadystatechange=function(){a(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}function p(){d=function(e){setTimeout(a,0,e)}}if(!e.setImmediate){var d,m=1,h={},v=!1,y=e.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(e);g=g&&g.setTimeout?g:e,"[object process]"==={}.toString.call(e.process)?c():u()?l():e.MessageChannel?f():y&&"onreadystatechange"in y.createElement("script")?s():p(),g.setImmediate=r,g.clearImmediate=o}}("undefined"==typeof self?"undefined"==typeof e?this:e:self)}).call(t,function(){return this}(),n(4))},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(f===setTimeout)return setTimeout(e,0);if((f===n||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(t){try{return f.call(null,e,0)}catch(t){return f.call(this,e,0)}}}function i(e){if(s===clearTimeout)return clearTimeout(e);if((s===r||!s)&&clearTimeout)return s=clearTimeout,clearTimeout(e);try{return s(e)}catch(t){try{return s.call(null,e)}catch(t){return s.call(this,e)}}}function a(){h&&d&&(h=!1,d.length?m=d.concat(m):v=-1,m.length&&c())}function c(){if(!h){var e=o(a);h=!0;for(var t=m.length;t;){for(d=m,m=[];++v<t;)d&&d[v].run();v=-1,t=m.length}d=null,h=!1,i(e)}}function u(e,t){this.fun=e,this.array=t}function l(){}var f,s,p=e.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:n}catch(e){f=n}try{s="function"==typeof clearTimeout?clearTimeout:r}catch(e){s=r}}();var d,m=[],h=!1,v=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new u(e,t)),1!==m.length||h||o(c)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=l,p.addListener=l,p.once=l,p.off=l,p.removeListener=l,p.removeAllListeners=l,p.emit=l,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}}])});