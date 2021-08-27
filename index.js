
/*
* anime.js v3.2.1
* (c) 2020 Julian Garnier
* Released under the MIT license
* animejs.com
*/

!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.anime=e()}(this,function(){"use strict";var n={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},e={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},t=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],r={CSS:{},springs:{}};function a(n,e,t){return Math.min(Math.max(n,e),t)}function o(n,e){return n.indexOf(e)>-1}function u(n,e){return n.apply(null,e)}var i={arr:function(n){return Array.isArray(n)},obj:function(n){return o(Object.prototype.toString.call(n),"Object")},pth:function(n){return i.obj(n)&&n.hasOwnProperty("totalLength")},svg:function(n){return n instanceof SVGElement},inp:function(n){return n instanceof HTMLInputElement},dom:function(n){return n.nodeType||i.svg(n)},str:function(n){return"string"==typeof n},fnc:function(n){return"function"==typeof n},und:function(n){return void 0===n},nil:function(n){return i.und(n)||null===n},hex:function(n){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)},rgb:function(n){return/^rgb/.test(n)},hsl:function(n){return/^hsl/.test(n)},col:function(n){return i.hex(n)||i.rgb(n)||i.hsl(n)},key:function(t){return!n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&"targets"!==t&&"keyframes"!==t}};function c(n){var e=/\(([^)]+)\)/.exec(n);return e?e[1].split(",").map(function(n){return parseFloat(n)}):[]}function s(n,e){var t=c(n),o=a(i.und(t[0])?1:t[0],.1,100),u=a(i.und(t[1])?100:t[1],.1,100),s=a(i.und(t[2])?10:t[2],.1,100),f=a(i.und(t[3])?0:t[3],.1,100),l=Math.sqrt(u/o),d=s/(2*Math.sqrt(u*o)),p=d<1?l*Math.sqrt(1-d*d):0,v=1,h=d<1?(d*l-f)/p:-f+l;function g(n){var t=e?e*n/1e3:n;return t=d<1?Math.exp(-t*d*l)*(v*Math.cos(p*t)+h*Math.sin(p*t)):(v+h*t)*Math.exp(-t*l),0===n||1===n?n:1-t}return e?g:function(){var e=r.springs[n];if(e)return e;for(var t=0,a=0;;)if(1===g(t+=1/6)){if(++a>=16)break}else a=0;var o=t*(1/6)*1e3;return r.springs[n]=o,o}}function f(n){return void 0===n&&(n=10),function(e){return Math.ceil(a(e,1e-6,1)*n)*(1/n)}}var l,d,p=function(){var n=11,e=1/(n-1);function t(n,e){return 1-3*e+3*n}function r(n,e){return 3*e-6*n}function a(n){return 3*n}function o(n,e,o){return((t(e,o)*n+r(e,o))*n+a(e))*n}function u(n,e,o){return 3*t(e,o)*n*n+2*r(e,o)*n+a(e)}return function(t,r,a,i){if(0<=t&&t<=1&&0<=a&&a<=1){var c=new Float32Array(n);if(t!==r||a!==i)for(var s=0;s<n;++s)c[s]=o(s*e,t,a);return function(n){return t===r&&a===i?n:0===n||1===n?n:o(f(n),r,i)}}function f(r){for(var i=0,s=1,f=n-1;s!==f&&c[s]<=r;++s)i+=e;var l=i+(r-c[--s])/(c[s+1]-c[s])*e,d=u(l,t,a);return d>=.001?function(n,e,t,r){for(var a=0;a<4;++a){var i=u(e,t,r);if(0===i)return e;e-=(o(e,t,r)-n)/i}return e}(r,l,t,a):0===d?l:function(n,e,t,r,a){for(var u,i,c=0;(u=o(i=e+(t-e)/2,r,a)-n)>0?t=i:e=i,Math.abs(u)>1e-7&&++c<10;);return i}(r,i,i+e,t,a)}}}(),v=(l={linear:function(){return function(n){return n}}},d={Sine:function(){return function(n){return 1-Math.cos(n*Math.PI/2)}},Circ:function(){return function(n){return 1-Math.sqrt(1-n*n)}},Back:function(){return function(n){return n*n*(3*n-2)}},Bounce:function(){return function(n){for(var e,t=4;n<((e=Math.pow(2,--t))-1)/11;);return 1/Math.pow(4,3-t)-7.5625*Math.pow((3*e-2)/22-n,2)}},Elastic:function(n,e){void 0===n&&(n=1),void 0===e&&(e=.5);var t=a(n,1,10),r=a(e,.1,2);return function(n){return 0===n||1===n?n:-t*Math.pow(2,10*(n-1))*Math.sin((n-1-r/(2*Math.PI)*Math.asin(1/t))*(2*Math.PI)/r)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach(function(n,e){d[n]=function(){return function(n){return Math.pow(n,e+2)}}}),Object.keys(d).forEach(function(n){var e=d[n];l["easeIn"+n]=e,l["easeOut"+n]=function(n,t){return function(r){return 1-e(n,t)(1-r)}},l["easeInOut"+n]=function(n,t){return function(r){return r<.5?e(n,t)(2*r)/2:1-e(n,t)(-2*r+2)/2}},l["easeOutIn"+n]=function(n,t){return function(r){return r<.5?(1-e(n,t)(1-2*r))/2:(e(n,t)(2*r-1)+1)/2}}}),l);function h(n,e){if(i.fnc(n))return n;var t=n.split("(")[0],r=v[t],a=c(n);switch(t){case"spring":return s(n,e);case"cubicBezier":return u(p,a);case"steps":return u(f,a);default:return u(r,a)}}function g(n){try{return document.querySelectorAll(n)}catch(n){return}}function m(n,e){for(var t=n.length,r=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<t;o++)if(o in n){var u=n[o];e.call(r,u,o,n)&&a.push(u)}return a}function y(n){return n.reduce(function(n,e){return n.concat(i.arr(e)?y(e):e)},[])}function b(n){return i.arr(n)?n:(i.str(n)&&(n=g(n)||n),n instanceof NodeList||n instanceof HTMLCollection?[].slice.call(n):[n])}function M(n,e){return n.some(function(n){return n===e})}function x(n){var e={};for(var t in n)e[t]=n[t];return e}function w(n,e){var t=x(n);for(var r in n)t[r]=e.hasOwnProperty(r)?e[r]:n[r];return t}function k(n,e){var t=x(n);for(var r in e)t[r]=i.und(n[r])?e[r]:n[r];return t}function O(n){return i.rgb(n)?(t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e=n))?"rgba("+t[1]+",1)":e:i.hex(n)?(r=n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(n,e,t,r){return e+e+t+t+r+r}),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),"rgba("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):i.hsl(n)?function(n){var e,t,r,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),o=parseInt(a[1],10)/360,u=parseInt(a[2],10)/100,i=parseInt(a[3],10)/100,c=a[4]||1;function s(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+6*(e-n)*t:t<.5?e:t<2/3?n+(e-n)*(2/3-t)*6:n}if(0==u)e=t=r=i;else{var f=i<.5?i*(1+u):i+u-i*u,l=2*i-f;e=s(l,f,o+1/3),t=s(l,f,o),r=s(l,f,o-1/3)}return"rgba("+255*e+","+255*t+","+255*r+","+c+")"}(n):void 0;var e,t,r,a}function C(n){var e=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n);if(e)return e[1]}function P(n,e){return i.fnc(n)?n(e.target,e.id,e.total):n}function I(n,e){return n.getAttribute(e)}function D(n,e,t){if(M([t,"deg","rad","turn"],C(e)))return e;var a=r.CSS[e+t];if(!i.und(a))return a;var o=document.createElement(n.tagName),u=n.parentNode&&n.parentNode!==document?n.parentNode:document.body;u.appendChild(o),o.style.position="absolute",o.style.width=100+t;var c=100/o.offsetWidth;u.removeChild(o);var s=c*parseFloat(e);return r.CSS[e+t]=s,s}function B(n,e,t){if(e in n.style){var r=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=n.style[e]||getComputedStyle(n).getPropertyValue(r)||"0";return t?D(n,a,t):a}}function T(n,e){return i.dom(n)&&!i.inp(n)&&(!i.nil(I(n,e))||i.svg(n)&&n[e])?"attribute":i.dom(n)&&M(t,e)?"transform":i.dom(n)&&"transform"!==e&&B(n,e)?"css":null!=n[e]?"object":void 0}function E(n){if(i.dom(n)){for(var e,t=n.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map;e=r.exec(t);)a.set(e[1],e[2]);return a}}function F(n,e,t,r){var a,u=o(e,"scale")?1:0+(o(a=e,"translate")||"perspective"===a?"px":o(a,"rotate")||o(a,"skew")?"deg":void 0),i=E(n).get(e)||u;return t&&(t.transforms.list.set(e,i),t.transforms.last=e),r?D(n,i,r):i}function A(n,e,t,r){switch(T(n,e)){case"transform":return F(n,e,r,t);case"css":return B(n,e,t);case"attribute":return I(n,e);default:return n[e]||0}}function N(n,e){var t=/^(\*=|\+=|-=)/.exec(n);if(!t)return n;var r=C(n)||0,a=parseFloat(e),o=parseFloat(n.replace(t[0],""));switch(t[0][0]){case"+":return a+o+r;case"-":return a-o+r;case"*":return a*o+r}}function S(n,e){if(i.col(n))return O(n);if(/\s/g.test(n))return n;var t=C(n),r=t?n.substr(0,n.length-t.length):n;return e?r+e:r}function L(n,e){return Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2))}function j(n){for(var e,t=n.points,r=0,a=0;a<t.numberOfItems;a++){var o=t.getItem(a);a>0&&(r+=L(e,o)),e=o}return r}function q(n){if(n.getTotalLength)return n.getTotalLength();switch(n.tagName.toLowerCase()){case"circle":return o=n,2*Math.PI*I(o,"r");case"rect":return 2*I(a=n,"width")+2*I(a,"height");case"line":return L({x:I(r=n,"x1"),y:I(r,"y1")},{x:I(r,"x2"),y:I(r,"y2")});case"polyline":return j(n);case"polygon":return t=(e=n).points,j(e)+L(t.getItem(t.numberOfItems-1),t.getItem(0))}var e,t,r,a,o}function H(n,e){var t=e||{},r=t.el||function(n){for(var e=n.parentNode;i.svg(e)&&i.svg(e.parentNode);)e=e.parentNode;return e}(n),a=r.getBoundingClientRect(),o=I(r,"viewBox"),u=a.width,c=a.height,s=t.viewBox||(o?o.split(" "):[0,0,u,c]);return{el:r,viewBox:s,x:s[0]/1,y:s[1]/1,w:u,h:c,vW:s[2],vH:s[3]}}function V(n,e,t){function r(t){void 0===t&&(t=0);var r=e+t>=1?e+t:0;return n.el.getPointAtLength(r)}var a=H(n.el,n.svg),o=r(),u=r(-1),i=r(1),c=t?1:a.w/a.vW,s=t?1:a.h/a.vH;switch(n.property){case"x":return(o.x-a.x)*c;case"y":return(o.y-a.y)*s;case"angle":return 180*Math.atan2(i.y-u.y,i.x-u.x)/Math.PI}}function $(n,e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=S(i.pth(n)?n.totalLength:n,e)+"";return{original:r,numbers:r.match(t)?r.match(t).map(Number):[0],strings:i.str(n)||e?r.split(t):[]}}function W(n){return m(n?y(i.arr(n)?n.map(b):b(n)):[],function(n,e,t){return t.indexOf(n)===e})}function X(n){var e=W(n);return e.map(function(n,t){return{target:n,id:t,total:e.length,transforms:{list:E(n)}}})}function Y(n,e){var t=x(e);if(/^spring/.test(t.easing)&&(t.duration=s(t.easing)),i.arr(n)){var r=n.length;2===r&&!i.obj(n[0])?n={value:n}:i.fnc(e.duration)||(t.duration=e.duration/r)}var a=i.arr(n)?n:[n];return a.map(function(n,t){var r=i.obj(n)&&!i.pth(n)?n:{value:n};return i.und(r.delay)&&(r.delay=t?0:e.delay),i.und(r.endDelay)&&(r.endDelay=t===a.length-1?e.endDelay:0),r}).map(function(n){return k(n,t)})}function Z(n,e){var t=[],r=e.keyframes;for(var a in r&&(e=k(function(n){for(var e=m(y(n.map(function(n){return Object.keys(n)})),function(n){return i.key(n)}).reduce(function(n,e){return n.indexOf(e)<0&&n.push(e),n},[]),t={},r=function(r){var a=e[r];t[a]=n.map(function(n){var e={};for(var t in n)i.key(t)?t==a&&(e.value=n[t]):e[t]=n[t];return e})},a=0;a<e.length;a++)r(a);return t}(r),e)),e)i.key(a)&&t.push({name:a,tweens:Y(e[a],n)});return t}function G(n,e){var t;return n.tweens.map(function(r){var a=function(n,e){var t={};for(var r in n){var a=P(n[r],e);i.arr(a)&&1===(a=a.map(function(n){return P(n,e)})).length&&(a=a[0]),t[r]=a}return t.duration=parseFloat(t.duration),t.delay=parseFloat(t.delay),t}(r,e),o=a.value,u=i.arr(o)?o[1]:o,c=C(u),s=A(e.target,n.name,c,e),f=t?t.to.original:s,l=i.arr(o)?o[0]:f,d=C(l)||C(s),p=c||d;return i.und(u)&&(u=f),a.from=$(l,p),a.to=$(N(u,l),p),a.start=t?t.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=h(a.easing,a.duration),a.isPath=i.pth(o),a.isPathTargetInsideSVG=a.isPath&&i.svg(e.target),a.isColor=i.col(a.from.original),a.isColor&&(a.round=1),t=a,a})}var Q={css:function(n,e,t){return n.style[e]=t},attribute:function(n,e,t){return n.setAttribute(e,t)},object:function(n,e,t){return n[e]=t},transform:function(n,e,t,r,a){if(r.list.set(e,t),e===r.last||a){var o="";r.list.forEach(function(n,e){o+=e+"("+n+") "}),n.style.transform=o}}};function z(n,e){X(n).forEach(function(n){for(var t in e){var r=P(e[t],n),a=n.target,o=C(r),u=A(a,t,o,n),i=N(S(r,o||C(u)),u),c=T(a,t);Q[c](a,t,i,n.transforms,!0)}})}function _(n,e){return m(y(n.map(function(n){return e.map(function(e){return function(n,e){var t=T(n.target,e.name);if(t){var r=G(e,n),a=r[r.length-1];return{type:t,property:e.name,animatable:n,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}(n,e)})})),function(n){return!i.und(n)})}function R(n,e){var t=n.length,r=function(n){return n.timelineOffset?n.timelineOffset:0},a={};return a.duration=t?Math.max.apply(Math,n.map(function(n){return r(n)+n.duration})):e.duration,a.delay=t?Math.min.apply(Math,n.map(function(n){return r(n)+n.delay})):e.delay,a.endDelay=t?a.duration-Math.max.apply(Math,n.map(function(n){return r(n)+n.duration-n.endDelay})):e.endDelay,a}var J=0;var K=[],U=function(){var n;function e(t){for(var r=K.length,a=0;a<r;){var o=K[a];o.paused?(K.splice(a,1),r--):(o.tick(t),a++)}n=a>0?requestAnimationFrame(e):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",function(){en.suspendWhenDocumentHidden&&(nn()?n=cancelAnimationFrame(n):(K.forEach(function(n){return n._onDocumentVisibility()}),U()))}),function(){n||nn()&&en.suspendWhenDocumentHidden||!(K.length>0)||(n=requestAnimationFrame(e))}}();function nn(){return!!document&&document.hidden}function en(t){void 0===t&&(t={});var r,o=0,u=0,i=0,c=0,s=null;function f(n){var e=window.Promise&&new Promise(function(n){return s=n});return n.finished=e,e}var l,d,p,v,h,g,y,b,M=(d=w(n,l=t),p=w(e,l),v=Z(p,l),h=X(l.targets),g=_(h,v),y=R(g,p),b=J,J++,k(d,{id:b,children:[],animatables:h,animations:g,duration:y.duration,delay:y.delay,endDelay:y.endDelay}));f(M);function x(){var n=M.direction;"alternate"!==n&&(M.direction="normal"!==n?"normal":"reverse"),M.reversed=!M.reversed,r.forEach(function(n){return n.reversed=M.reversed})}function O(n){return M.reversed?M.duration-n:n}function C(){o=0,u=O(M.currentTime)*(1/en.speed)}function P(n,e){e&&e.seek(n-e.timelineOffset)}function I(n){for(var e=0,t=M.animations,r=t.length;e<r;){var o=t[e],u=o.animatable,i=o.tweens,c=i.length-1,s=i[c];c&&(s=m(i,function(e){return n<e.end})[0]||s);for(var f=a(n-s.start-s.delay,0,s.duration)/s.duration,l=isNaN(f)?1:s.easing(f),d=s.to.strings,p=s.round,v=[],h=s.to.numbers.length,g=void 0,y=0;y<h;y++){var b=void 0,x=s.to.numbers[y],w=s.from.numbers[y]||0;b=s.isPath?V(s.value,l*x,s.isPathTargetInsideSVG):w+l*(x-w),p&&(s.isColor&&y>2||(b=Math.round(b*p)/p)),v.push(b)}var k=d.length;if(k){g=d[0];for(var O=0;O<k;O++){d[O];var C=d[O+1],P=v[O];isNaN(P)||(g+=C?P+C:P+" ")}}else g=v[0];Q[o.type](u.target,o.property,g,u.transforms),o.currentValue=g,e++}}function D(n){M[n]&&!M.passThrough&&M[n](M)}function B(n){var e=M.duration,t=M.delay,l=e-M.endDelay,d=O(n);M.progress=a(d/e*100,0,100),M.reversePlayback=d<M.currentTime,r&&function(n){if(M.reversePlayback)for(var e=c;e--;)P(n,r[e]);else for(var t=0;t<c;t++)P(n,r[t])}(d),!M.began&&M.currentTime>0&&(M.began=!0,D("begin")),!M.loopBegan&&M.currentTime>0&&(M.loopBegan=!0,D("loopBegin")),d<=t&&0!==M.currentTime&&I(0),(d>=l&&M.currentTime!==e||!e)&&I(e),d>t&&d<l?(M.changeBegan||(M.changeBegan=!0,M.changeCompleted=!1,D("changeBegin")),D("change"),I(d)):M.changeBegan&&(M.changeCompleted=!0,M.changeBegan=!1,D("changeComplete")),M.currentTime=a(d,0,e),M.began&&D("update"),n>=e&&(u=0,M.remaining&&!0!==M.remaining&&M.remaining--,M.remaining?(o=i,D("loopComplete"),M.loopBegan=!1,"alternate"===M.direction&&x()):(M.paused=!0,M.completed||(M.completed=!0,D("loopComplete"),D("complete"),!M.passThrough&&"Promise"in window&&(s(),f(M)))))}return M.reset=function(){var n=M.direction;M.passThrough=!1,M.currentTime=0,M.progress=0,M.paused=!0,M.began=!1,M.loopBegan=!1,M.changeBegan=!1,M.completed=!1,M.changeCompleted=!1,M.reversePlayback=!1,M.reversed="reverse"===n,M.remaining=M.loop,r=M.children;for(var e=c=r.length;e--;)M.children[e].reset();(M.reversed&&!0!==M.loop||"alternate"===n&&1===M.loop)&&M.remaining++,I(M.reversed?M.duration:0)},M._onDocumentVisibility=C,M.set=function(n,e){return z(n,e),M},M.tick=function(n){i=n,o||(o=i),B((i+(u-o))*en.speed)},M.seek=function(n){B(O(n))},M.pause=function(){M.paused=!0,C()},M.play=function(){M.paused&&(M.completed&&M.reset(),M.paused=!1,K.push(M),C(),U())},M.reverse=function(){x(),M.completed=!M.reversed,C()},M.restart=function(){M.reset(),M.play()},M.remove=function(n){rn(W(n),M)},M.reset(),M.autoplay&&M.play(),M}function tn(n,e){for(var t=e.length;t--;)M(n,e[t].animatable.target)&&e.splice(t,1)}function rn(n,e){var t=e.animations,r=e.children;tn(n,t);for(var a=r.length;a--;){var o=r[a],u=o.animations;tn(n,u),u.length||o.children.length||r.splice(a,1)}t.length||r.length||e.pause()}return en.version="3.2.1",en.speed=1,en.suspendWhenDocumentHidden=!0,en.running=K,en.remove=function(n){for(var e=W(n),t=K.length;t--;)rn(e,K[t])},en.get=A,en.set=z,en.convertPx=D,en.path=function(n,e){var t=i.str(n)?g(n)[0]:n,r=e||100;return function(n){return{property:n,el:t,svg:H(t),totalLength:q(t)*(r/100)}}},en.setDashoffset=function(n){var e=q(n);return n.setAttribute("stroke-dasharray",e),e},en.stagger=function(n,e){void 0===e&&(e={});var t=e.direction||"normal",r=e.easing?h(e.easing):null,a=e.grid,o=e.axis,u=e.from||0,c="first"===u,s="center"===u,f="last"===u,l=i.arr(n),d=l?parseFloat(n[0]):parseFloat(n),p=l?parseFloat(n[1]):0,v=C(l?n[1]:n)||0,g=e.start||0+(l?d:0),m=[],y=0;return function(n,e,i){if(c&&(u=0),s&&(u=(i-1)/2),f&&(u=i-1),!m.length){for(var h=0;h<i;h++){if(a){var b=s?(a[0]-1)/2:u%a[0],M=s?(a[1]-1)/2:Math.floor(u/a[0]),x=b-h%a[0],w=M-Math.floor(h/a[0]),k=Math.sqrt(x*x+w*w);"x"===o&&(k=-x),"y"===o&&(k=-w),m.push(k)}else m.push(Math.abs(u-h));y=Math.max.apply(Math,m)}r&&(m=m.map(function(n){return r(n/y)*y})),"reverse"===t&&(m=m.map(function(n){return o?n<0?-1*n:-n:Math.abs(y-n)}))}return g+(l?(p-d)/y:d)*(Math.round(100*m[e])/100)+v}},en.timeline=function(n){void 0===n&&(n={});var t=en(n);return t.duration=0,t.add=function(r,a){var o=K.indexOf(t),u=t.children;function c(n){n.passThrough=!0}o>-1&&K.splice(o,1);for(var s=0;s<u.length;s++)c(u[s]);var f=k(r,w(e,n));f.targets=f.targets||n.targets;var l=t.duration;f.autoplay=!1,f.direction=t.direction,f.timelineOffset=i.und(a)?l:N(a,l),c(t),t.seek(f.timelineOffset);var d=en(f);c(d),u.push(d);var p=R(u,n);return t.delay=p.delay,t.endDelay=p.endDelay,t.duration=p.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t},en.easing=h,en.penner=v,en.random=function(n,e){return Math.floor(Math.random()*(e-n+1))+n},en});

!function(){"use strict";function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset))},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){for(;o!==t.body&&!1===(e=p(l=o,"Y")&&a(l,"Y"),r=p(l,"X")&&a(l,"X"),e||r);)o=o.parentNode||o.host;var l,e,r;return o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function n(o,t){this.scrollLeft=o,this.scrollTop=t}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return"Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return"auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t))}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o()}();

!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");

/* axios v0.21.1 | (c) 2020 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new i(e),n=s(i.prototype.request,t);return o.extend(n,i.prototype,t),o.extend(n,t),n}var o=n(2),s=n(3),i=n(4),a=n(22),u=n(10),c=r(u);c.Axios=i,c.create=function(e){return r(a(c.defaults,e))},c.Cancel=n(23),c.CancelToken=n(24),c.isCancel=n(9),c.all=function(e){return Promise.all(e)},c.spread=n(25),c.isAxiosError=n(26),e.exports=c,e.exports.default=c},function(e,t,n){"use strict";function r(e){return"[object Array]"===R.call(e)}function o(e){return"undefined"==typeof e}function s(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function i(e){return"[object ArrayBuffer]"===R.call(e)}function a(e){return"undefined"!=typeof FormData&&e instanceof FormData}function u(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function c(e){return"string"==typeof e}function f(e){return"number"==typeof e}function p(e){return null!==e&&"object"==typeof e}function d(e){if("[object Object]"!==R.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function l(e){return"[object Date]"===R.call(e)}function h(e){return"[object File]"===R.call(e)}function m(e){return"[object Blob]"===R.call(e)}function y(e){return"[object Function]"===R.call(e)}function g(e){return p(e)&&y(e.pipe)}function v(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function x(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function w(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function b(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}function E(){function e(e,n){d(t[n])&&d(e)?t[n]=E(t[n],e):d(e)?t[n]=E({},e):r(e)?t[n]=e.slice():t[n]=e}for(var t={},n=0,o=arguments.length;n<o;n++)b(arguments[n],e);return t}function j(e,t,n){return b(t,function(t,r){n&&"function"==typeof t?e[r]=S(t,n):e[r]=t}),e}function C(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}var S=n(3),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:i,isBuffer:s,isFormData:a,isArrayBufferView:u,isString:c,isNumber:f,isObject:p,isPlainObject:d,isUndefined:o,isDate:l,isFile:h,isBlob:m,isFunction:y,isStream:g,isURLSearchParams:v,isStandardBrowserEnv:w,forEach:b,merge:E,extend:j,trim:x,stripBOM:C}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var o=n(2),s=n(5),i=n(6),a=n(7),u=n(22);r.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=u(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},r.prototype.getUri=function(e){return e=u(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(u(n||{},{method:e,url:t,data:(n||{}).data}))}}),o.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(u(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(o.isURLSearchParams(t))s=t.toString();else{var i=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))}))}),s=i.join("&")}if(s){var a=e.indexOf("#");a!==-1&&(e=e.slice(0,a)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),s=n(8),i=n(9),a=n(10);e.exports=function(e){r(e),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||a.adapter;return t(e).then(function(t){return r(e),t.data=s(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(r(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e,t){!s.isUndefined(e)&&s.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(12):"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)&&(e=n(12)),e}var s=n(2),i=n(11),a={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:o(),transformRequest:[function(e,t){return i(t,"Accept"),i(t,"Content-Type"),s.isFormData(e)||s.isArrayBuffer(e)||s.isBuffer(e)||s.isStream(e)||s.isFile(e)||s.isBlob(e)?e:s.isArrayBufferView(e)?e.buffer:s.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):s.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},s.forEach(["delete","get","head"],function(e){u.headers[e]={}}),s.forEach(["post","put","patch"],function(e){u.headers[e]=s.merge(a)}),e.exports=u},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(13),s=n(16),i=n(5),a=n(17),u=n(20),c=n(21),f=n(14);e.exports=function(e){return new Promise(function(t,n){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(h+":"+m)}var y=a(e.baseURL,e.url);if(l.open(e.method.toUpperCase(),i(y,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l.onreadystatechange=function(){if(l&&4===l.readyState&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in l?u(l.getAllResponseHeaders()):null,s=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:s,status:l.status,statusText:l.statusText,headers:r,config:e,request:l};o(t,n,i),l=null}},l.onabort=function(){l&&(n(f("Request aborted",e,"ECONNABORTED",l)),l=null)},l.onerror=function(){n(f("Network Error",e,null,l)),l=null},l.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(f(t,e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var g=(e.withCredentials||c(y))&&e.xsrfCookieName?s.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),r.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),n(e),l=null)}),p||(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(14);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(15);e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),i===!0&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";var r=n(18),o=n(19);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?i[t]=(i[t]?i[t]:[]).concat([n]):i[t]=i[t]?i[t]+", "+n:n}}),i):i}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){function n(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function o(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(s[o]=n(void 0,e[o])):s[o]=n(e[o],t[o])}t=t||{};var s={},i=["url","method","data"],a=["headers","auth","proxy","params"],u=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],c=["validateStatus"];r.forEach(i,function(e){r.isUndefined(t[e])||(s[e]=n(void 0,t[e]))}),r.forEach(a,o),r.forEach(u,function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(s[o]=n(void 0,e[o])):s[o]=n(void 0,t[o])}),r.forEach(c,function(r){r in t?s[r]=n(e[r],t[r]):r in e&&(s[r]=n(void 0,e[r]))});var f=i.concat(a).concat(u).concat(c),p=Object.keys(e).concat(Object.keys(t)).filter(function(e){return f.indexOf(e)===-1});return r.forEach(p,o),s}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t){"use strict";e.exports=function(e){return"object"==typeof e&&e.isAxiosError===!0}}])});
function quest_87695_features () {
    let actionAnims = {};
    let scrollTriggersFired = [];
    let fireScrollOffTriggers = [];
    let questVars = {};
  let actualInput = null;let actualCheckbox = null;
    let checkDiv = null;
  
        
      let anim_87695_4_in_87695_5 = actionAnims["anim_87695_4_in_87695_5"];
    
        if (anim_87695_4_in_87695_5) {
          anim_87695_4_in_87695_5.restart();
        }
        else {
      
      let anim_87695_4_in_87695_5 = anime({
        targets: "#I-am-Aiman-Shaikh-1",
        scale: { value: [1.1, 1], duration: 1500, delay: 500, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1500, delay: 500, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 500, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_4_in_87695_5"] = anim_87695_4_in_87695_5;
    
      }
    
      
        
      let anim_87695_5_in_87695_6 = actionAnims["anim_87695_5_in_87695_6"];
    
        if (anim_87695_5_in_87695_6) {
          anim_87695_5_in_87695_6.restart();
        }
        else {
      
      let anim_87695_5_in_87695_6 = anime({
        targets: "#Hi--1",
        scale: { value: [1.5, 1], duration: 750, delay: 500, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 750, delay: 500, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 500, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_5_in_87695_6"] = anim_87695_5_in_87695_6;
    
      }
    
      
        
      let anim_87695_7_in_87695_8 = actionAnims["anim_87695_7_in_87695_8"];
    
        if (anim_87695_7_in_87695_8) {
          anim_87695_7_in_87695_8.restart();
        }
        else {
      
      let anim_87695_7_in_87695_8 = anime({
        targets: "#A-UI-and-Front-end-w-1",
        opacity: { value: [0, 1], duration: 750, delay: 500, easing: "easeOutExpo" },});
    
      actionAnims["anim_87695_7_in_87695_8"] = anim_87695_7_in_87695_8;
    
      }
    
      
        
      let anim_87695_8_in_87695_9 = actionAnims["anim_87695_8_in_87695_9"];
    
        if (anim_87695_8_in_87695_9) {
          anim_87695_8_in_87695_9.restart();
        }
        else {
      
      let anim_87695_8_in_87695_9 = anime({
        targets: "#UI-designer---Full-s-1",
        translateY: { value: [50, 0], duration: 1250, delay: 500, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 500, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_8_in_87695_9"] = anim_87695_8_in_87695_9;
    
      }
    
      
      let anim_87695_9_in_87695_10 = anime({
        targets: "#About-me--1",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_9_in_87695_10.pause();
      anim_87695_9_in_87695_10.reverse();
      anim_87695_9_in_87695_10.seek(0);
    
      actionAnims["anim_87695_9_in_87695_10"] = anim_87695_9_in_87695_10;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("About-me--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:61");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:61",
              featureId: "87695:9",
            });
    
            fireScrollOffTriggers.push("87695:12:61");
    
            
      let anim_87695_9_in_87695_10 = actionAnims["anim_87695_9_in_87695_10"];
    
        if (anim_87695_9_in_87695_10) {
          anim_87695_9_in_87695_10.pause();
          anim_87695_9_in_87695_10.reverse();
          anim_87695_9_in_87695_10.play();
        }
        else {
      
      let anim_87695_9_in_87695_10 = anime({
        targets: "#About-me--1",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_9_in_87695_10"] = anim_87695_9_in_87695_10;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:61"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:61");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:61"
            );
            
      let anim_87695_9_in_87695_10 = actionAnims["anim_87695_9_in_87695_10"];
      if (anim_87695_9_in_87695_10) {
        anim_87695_9_in_87695_10.pause();
        anim_87695_9_in_87695_10.reverse();
        anim_87695_9_in_87695_10.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_10_in_87695_11 = anime({
        targets: "#I-am-an-undergraduat-1",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_10_in_87695_11.pause();
      anim_87695_10_in_87695_11.reverse();
      anim_87695_10_in_87695_11.seek(0);
    
      actionAnims["anim_87695_10_in_87695_11"] = anim_87695_10_in_87695_11;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("I-am-an-undergraduat-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:65");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:65",
              featureId: "87695:10",
            });
    
            fireScrollOffTriggers.push("87695:12:65");
    
            
      let anim_87695_10_in_87695_11 = actionAnims["anim_87695_10_in_87695_11"];
    
        if (anim_87695_10_in_87695_11) {
          anim_87695_10_in_87695_11.pause();
          anim_87695_10_in_87695_11.reverse();
          anim_87695_10_in_87695_11.play();
        }
        else {
      
      let anim_87695_10_in_87695_11 = anime({
        targets: "#I-am-an-undergraduat-1",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_10_in_87695_11"] = anim_87695_10_in_87695_11;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:65"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:65");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:65"
            );
            
      let anim_87695_10_in_87695_11 = actionAnims["anim_87695_10_in_87695_11"];
      if (anim_87695_10_in_87695_11) {
        anim_87695_10_in_87695_11.pause();
        anim_87695_10_in_87695_11.reverse();
        anim_87695_10_in_87695_11.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_11_in_87695_12 = anime({
        targets: "#Resume--1",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_11_in_87695_12.pause();
      anim_87695_11_in_87695_12.reverse();
      anim_87695_11_in_87695_12.seek(0);
    
      actionAnims["anim_87695_11_in_87695_12"] = anim_87695_11_in_87695_12;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Resume--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:63");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:63",
              featureId: "87695:11",
            });
    
            fireScrollOffTriggers.push("87695:12:63");
    
            
      let anim_87695_11_in_87695_12 = actionAnims["anim_87695_11_in_87695_12"];
    
        if (anim_87695_11_in_87695_12) {
          anim_87695_11_in_87695_12.pause();
          anim_87695_11_in_87695_12.reverse();
          anim_87695_11_in_87695_12.play();
        }
        else {
      
      let anim_87695_11_in_87695_12 = anime({
        targets: "#Resume--1",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_11_in_87695_12"] = anim_87695_11_in_87695_12;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:63"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:63");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:63"
            );
            
      let anim_87695_11_in_87695_12 = actionAnims["anim_87695_11_in_87695_12"];
      if (anim_87695_11_in_87695_12) {
        anim_87695_11_in_87695_12.pause();
        anim_87695_11_in_87695_12.reverse();
        anim_87695_11_in_87695_12.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_13_in_87695_14 = anime({
        targets: "#Group-59",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_13_in_87695_14.pause();
      anim_87695_13_in_87695_14.reverse();
      anim_87695_13_in_87695_14.seek(0);
    
      actionAnims["anim_87695_13_in_87695_14"] = anim_87695_13_in_87695_14;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-59").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:62");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:62",
              featureId: "87695:13",
            });
    
            fireScrollOffTriggers.push("87695:12:62");
    
            
      let anim_87695_13_in_87695_14 = actionAnims["anim_87695_13_in_87695_14"];
    
        if (anim_87695_13_in_87695_14) {
          anim_87695_13_in_87695_14.pause();
          anim_87695_13_in_87695_14.reverse();
          anim_87695_13_in_87695_14.play();
        }
        else {
      
      let anim_87695_13_in_87695_14 = anime({
        targets: "#Group-59",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_13_in_87695_14"] = anim_87695_13_in_87695_14;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:62"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:62");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:62"
            );
            
      let anim_87695_13_in_87695_14 = actionAnims["anim_87695_13_in_87695_14"];
      if (anim_87695_13_in_87695_14) {
        anim_87695_13_in_87695_14.pause();
        anim_87695_13_in_87695_14.reverse();
        anim_87695_13_in_87695_14.play();
      }
    
          
          }
        }, {passive: true});
      
        
      let anim_87695_14_in_87695_15 = actionAnims["anim_87695_14_in_87695_15"];
    
        if (anim_87695_14_in_87695_15) {
          anim_87695_14_in_87695_15.restart();
        }
        else {
      
      let anim_87695_14_in_87695_15 = anime({
        targets: "#image-1-1",
        translateX: { value: [-100, 0], duration: 750, delay: 500, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 500, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_14_in_87695_15"] = anim_87695_14_in_87695_15;
    
      }
    
      
      let anim_87695_15_in_87695_16 = anime({
        targets: "#Email---aimanshaikh5",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_15_in_87695_16.pause();
      anim_87695_15_in_87695_16.reverse();
      anim_87695_15_in_87695_16.seek(0);
    
      actionAnims["anim_87695_15_in_87695_16"] = anim_87695_15_in_87695_16;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Email---aimanshaikh5").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:103:162");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:103:162",
              featureId: "87695:15",
            });
    
            fireScrollOffTriggers.push("87695:103:162");
    
            
      let anim_87695_15_in_87695_16 = actionAnims["anim_87695_15_in_87695_16"];
    
        if (anim_87695_15_in_87695_16) {
          anim_87695_15_in_87695_16.pause();
          anim_87695_15_in_87695_16.reverse();
          anim_87695_15_in_87695_16.play();
        }
        else {
      
      let anim_87695_15_in_87695_16 = anime({
        targets: "#Email---aimanshaikh5",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_15_in_87695_16"] = anim_87695_15_in_87695_16;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:103:162"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:103:162");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:103:162"
            );
            
      let anim_87695_15_in_87695_16 = actionAnims["anim_87695_15_in_87695_16"];
      if (anim_87695_15_in_87695_16) {
        anim_87695_15_in_87695_16.pause();
        anim_87695_15_in_87695_16.reverse();
        anim_87695_15_in_87695_16.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_16_in_87695_17 = anime({
        targets: "#Skillset-1",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_16_in_87695_17.pause();
      anim_87695_16_in_87695_17.reverse();
      anim_87695_16_in_87695_17.seek(0);
    
      actionAnims["anim_87695_16_in_87695_17"] = anim_87695_16_in_87695_17;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Skillset-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:77");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:77",
              featureId: "87695:16",
            });
    
            fireScrollOffTriggers.push("87695:12:77");
    
            
      let anim_87695_16_in_87695_17 = actionAnims["anim_87695_16_in_87695_17"];
    
        if (anim_87695_16_in_87695_17) {
          anim_87695_16_in_87695_17.pause();
          anim_87695_16_in_87695_17.reverse();
          anim_87695_16_in_87695_17.play();
        }
        else {
      
      let anim_87695_16_in_87695_17 = anime({
        targets: "#Skillset-1",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_16_in_87695_17"] = anim_87695_16_in_87695_17;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:77"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:77");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:77"
            );
            
      let anim_87695_16_in_87695_17 = actionAnims["anim_87695_16_in_87695_17"];
      if (anim_87695_16_in_87695_17) {
        anim_87695_16_in_87695_17.pause();
        anim_87695_16_in_87695_17.reverse();
        anim_87695_16_in_87695_17.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_17_in_87695_18 = anime({
        targets: "#With-skills-in-UI-de-1",
        translateY: { value: [-50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_17_in_87695_18.pause();
      anim_87695_17_in_87695_18.reverse();
      anim_87695_17_in_87695_18.seek(0);
    
      actionAnims["anim_87695_17_in_87695_18"] = anim_87695_17_in_87695_18;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("With-skills-in-UI-de-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:76");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:76",
              featureId: "87695:17",
            });
    
            fireScrollOffTriggers.push("87695:12:76");
    
            
      let anim_87695_17_in_87695_18 = actionAnims["anim_87695_17_in_87695_18"];
    
        if (anim_87695_17_in_87695_18) {
          anim_87695_17_in_87695_18.pause();
          anim_87695_17_in_87695_18.reverse();
          anim_87695_17_in_87695_18.play();
        }
        else {
      
      let anim_87695_17_in_87695_18 = anime({
        targets: "#With-skills-in-UI-de-1",
        translateY: { value: [-50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_17_in_87695_18"] = anim_87695_17_in_87695_18;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:76"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:76");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:76"
            );
            
      let anim_87695_17_in_87695_18 = actionAnims["anim_87695_17_in_87695_18"];
      if (anim_87695_17_in_87695_18) {
        anim_87695_17_in_87695_18.pause();
        anim_87695_17_in_87695_18.reverse();
        anim_87695_17_in_87695_18.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_18_in_87695_19 = anime({
        targets: "#Group-19-9",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_18_in_87695_19.pause();
      anim_87695_18_in_87695_19.reverse();
      anim_87695_18_in_87695_19.seek(0);
    
      actionAnims["anim_87695_18_in_87695_19"] = anim_87695_18_in_87695_19;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-19-9").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:79");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:79",
              featureId: "87695:18",
            });
    
            fireScrollOffTriggers.push("87695:12:79");
    
            
      let anim_87695_18_in_87695_19 = actionAnims["anim_87695_18_in_87695_19"];
    
        if (anim_87695_18_in_87695_19) {
          anim_87695_18_in_87695_19.pause();
          anim_87695_18_in_87695_19.reverse();
          anim_87695_18_in_87695_19.play();
        }
        else {
      
      let anim_87695_18_in_87695_19 = anime({
        targets: "#Group-19-9",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_18_in_87695_19"] = anim_87695_18_in_87695_19;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:79"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:79");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:79"
            );
            
      let anim_87695_18_in_87695_19 = actionAnims["anim_87695_18_in_87695_19"];
      if (anim_87695_18_in_87695_19) {
        anim_87695_18_in_87695_19.pause();
        anim_87695_18_in_87695_19.reverse();
        anim_87695_18_in_87695_19.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_19_in_87695_20 = anime({
        targets: "#Frame-19",
        translateY: { value: [-50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_19_in_87695_20.pause();
      anim_87695_19_in_87695_20.reverse();
      anim_87695_19_in_87695_20.seek(0);
    
      actionAnims["anim_87695_19_in_87695_20"] = anim_87695_19_in_87695_20;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-19").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:90");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:90",
              featureId: "87695:19",
            });
    
            fireScrollOffTriggers.push("87695:12:90");
    
            
      let anim_87695_19_in_87695_20 = actionAnims["anim_87695_19_in_87695_20"];
    
        if (anim_87695_19_in_87695_20) {
          anim_87695_19_in_87695_20.pause();
          anim_87695_19_in_87695_20.reverse();
          anim_87695_19_in_87695_20.play();
        }
        else {
      
      let anim_87695_19_in_87695_20 = anime({
        targets: "#Frame-19",
        translateY: { value: [-50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_19_in_87695_20"] = anim_87695_19_in_87695_20;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:90"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:90");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:90"
            );
            
      let anim_87695_19_in_87695_20 = actionAnims["anim_87695_19_in_87695_20"];
      if (anim_87695_19_in_87695_20) {
        anim_87695_19_in_87695_20.pause();
        anim_87695_19_in_87695_20.reverse();
        anim_87695_19_in_87695_20.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_20_in_87695_21 = anime({
        targets: "#Frame-20",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_20_in_87695_21.pause();
      anim_87695_20_in_87695_21.reverse();
      anim_87695_20_in_87695_21.seek(0);
    
      actionAnims["anim_87695_20_in_87695_21"] = anim_87695_20_in_87695_21;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-20").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:83");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:83",
              featureId: "87695:20",
            });
    
            fireScrollOffTriggers.push("87695:12:83");
    
            
      let anim_87695_20_in_87695_21 = actionAnims["anim_87695_20_in_87695_21"];
    
        if (anim_87695_20_in_87695_21) {
          anim_87695_20_in_87695_21.pause();
          anim_87695_20_in_87695_21.reverse();
          anim_87695_20_in_87695_21.play();
        }
        else {
      
      let anim_87695_20_in_87695_21 = anime({
        targets: "#Frame-20",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_20_in_87695_21"] = anim_87695_20_in_87695_21;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:83"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:83");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:83"
            );
            
      let anim_87695_20_in_87695_21 = actionAnims["anim_87695_20_in_87695_21"];
      if (anim_87695_20_in_87695_21) {
        anim_87695_20_in_87695_21.pause();
        anim_87695_20_in_87695_21.reverse();
        anim_87695_20_in_87695_21.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_21_in_87695_22 = anime({
        targets: "#Frame-21",
        translateY: { value: [-50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_21_in_87695_22.pause();
      anim_87695_21_in_87695_22.reverse();
      anim_87695_21_in_87695_22.seek(0);
    
      actionAnims["anim_87695_21_in_87695_22"] = anim_87695_21_in_87695_22;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-21").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:97");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:97",
              featureId: "87695:21",
            });
    
            fireScrollOffTriggers.push("87695:12:97");
    
            
      let anim_87695_21_in_87695_22 = actionAnims["anim_87695_21_in_87695_22"];
    
        if (anim_87695_21_in_87695_22) {
          anim_87695_21_in_87695_22.pause();
          anim_87695_21_in_87695_22.reverse();
          anim_87695_21_in_87695_22.play();
        }
        else {
      
      let anim_87695_21_in_87695_22 = anime({
        targets: "#Frame-21",
        translateY: { value: [-50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_21_in_87695_22"] = anim_87695_21_in_87695_22;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:97"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:97");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:97"
            );
            
      let anim_87695_21_in_87695_22 = actionAnims["anim_87695_21_in_87695_22"];
      if (anim_87695_21_in_87695_22) {
        anim_87695_21_in_87695_22.pause();
        anim_87695_21_in_87695_22.reverse();
        anim_87695_21_in_87695_22.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_22_in_87695_23 = anime({
        targets: "#Frame-43-6",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_22_in_87695_23.pause();
      anim_87695_22_in_87695_23.reverse();
      anim_87695_22_in_87695_23.seek(0);
    
      actionAnims["anim_87695_22_in_87695_23"] = anim_87695_22_in_87695_23;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-43-6").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:95:2");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:95:2",
              featureId: "87695:22",
            });
    
            fireScrollOffTriggers.push("87695:95:2");
    
            
      let anim_87695_22_in_87695_23 = actionAnims["anim_87695_22_in_87695_23"];
    
        if (anim_87695_22_in_87695_23) {
          anim_87695_22_in_87695_23.pause();
          anim_87695_22_in_87695_23.reverse();
          anim_87695_22_in_87695_23.play();
        }
        else {
      
      let anim_87695_22_in_87695_23 = anime({
        targets: "#Frame-43-6",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_22_in_87695_23"] = anim_87695_22_in_87695_23;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:95:2"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:95:2");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:95:2"
            );
            
      let anim_87695_22_in_87695_23 = actionAnims["anim_87695_22_in_87695_23"];
      if (anim_87695_22_in_87695_23) {
        anim_87695_22_in_87695_23.pause();
        anim_87695_22_in_87695_23.reverse();
        anim_87695_22_in_87695_23.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_23_in_87695_24 = anime({
        targets: "#Frame-44-2",
        translateY: { value: [-50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_23_in_87695_24.pause();
      anim_87695_23_in_87695_24.reverse();
      anim_87695_23_in_87695_24.seek(0);
    
      actionAnims["anim_87695_23_in_87695_24"] = anim_87695_23_in_87695_24;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-44-2").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:95:9");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:95:9",
              featureId: "87695:23",
            });
    
            fireScrollOffTriggers.push("87695:95:9");
    
            
      let anim_87695_23_in_87695_24 = actionAnims["anim_87695_23_in_87695_24"];
    
        if (anim_87695_23_in_87695_24) {
          anim_87695_23_in_87695_24.pause();
          anim_87695_23_in_87695_24.reverse();
          anim_87695_23_in_87695_24.play();
        }
        else {
      
      let anim_87695_23_in_87695_24 = anime({
        targets: "#Frame-44-2",
        translateY: { value: [-50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_23_in_87695_24"] = anim_87695_23_in_87695_24;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:95:9"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:95:9");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:95:9"
            );
            
      let anim_87695_23_in_87695_24 = actionAnims["anim_87695_23_in_87695_24"];
      if (anim_87695_23_in_87695_24) {
        anim_87695_23_in_87695_24.pause();
        anim_87695_23_in_87695_24.reverse();
        anim_87695_23_in_87695_24.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_24_in_87695_25 = anime({
        targets: "#MY-PROJECTS-1",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_24_in_87695_25.pause();
      anim_87695_24_in_87695_25.reverse();
      anim_87695_24_in_87695_25.seek(0);
    
      actionAnims["anim_87695_24_in_87695_25"] = anim_87695_24_in_87695_25;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("MY-PROJECTS-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:52:4");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:52:4",
              featureId: "87695:24",
            });
    
            fireScrollOffTriggers.push("87695:52:4");
    
            
      let anim_87695_24_in_87695_25 = actionAnims["anim_87695_24_in_87695_25"];
    
        if (anim_87695_24_in_87695_25) {
          anim_87695_24_in_87695_25.pause();
          anim_87695_24_in_87695_25.reverse();
          anim_87695_24_in_87695_25.play();
        }
        else {
      
      let anim_87695_24_in_87695_25 = anime({
        targets: "#MY-PROJECTS-1",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_24_in_87695_25"] = anim_87695_24_in_87695_25;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:52:4"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:52:4");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:52:4"
            );
            
      let anim_87695_24_in_87695_25 = actionAnims["anim_87695_24_in_87695_25"];
      if (anim_87695_24_in_87695_25) {
        anim_87695_24_in_87695_25.pause();
        anim_87695_24_in_87695_25.reverse();
        anim_87695_24_in_87695_25.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_25_in_87695_26 = anime({
        targets: "#Work-that-I-ve-done--1",
        translateY: { value: [50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_25_in_87695_26.pause();
      anim_87695_25_in_87695_26.reverse();
      anim_87695_25_in_87695_26.seek(0);
    
      actionAnims["anim_87695_25_in_87695_26"] = anim_87695_25_in_87695_26;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Work-that-I-ve-done--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:52:5");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:52:5",
              featureId: "87695:25",
            });
    
            fireScrollOffTriggers.push("87695:52:5");
    
            
      let anim_87695_25_in_87695_26 = actionAnims["anim_87695_25_in_87695_26"];
    
        if (anim_87695_25_in_87695_26) {
          anim_87695_25_in_87695_26.pause();
          anim_87695_25_in_87695_26.reverse();
          anim_87695_25_in_87695_26.play();
        }
        else {
      
      let anim_87695_25_in_87695_26 = anime({
        targets: "#Work-that-I-ve-done--1",
        translateY: { value: [50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_25_in_87695_26"] = anim_87695_25_in_87695_26;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:52:5"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:52:5");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:52:5"
            );
            
      let anim_87695_25_in_87695_26 = actionAnims["anim_87695_25_in_87695_26"];
      if (anim_87695_25_in_87695_26) {
        anim_87695_25_in_87695_26.pause();
        anim_87695_25_in_87695_26.reverse();
        anim_87695_25_in_87695_26.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_27_in_87695_28 = anime({
        targets: "#Frame-39",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_27_in_87695_28.pause();
      anim_87695_27_in_87695_28.reverse();
      anim_87695_27_in_87695_28.seek(0);
    
      actionAnims["anim_87695_27_in_87695_28"] = anim_87695_27_in_87695_28;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-39").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:42:16");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:42:16",
              featureId: "87695:27",
            });
    
            fireScrollOffTriggers.push("87695:42:16");
    
            
      let anim_87695_27_in_87695_28 = actionAnims["anim_87695_27_in_87695_28"];
    
        if (anim_87695_27_in_87695_28) {
          anim_87695_27_in_87695_28.pause();
          anim_87695_27_in_87695_28.reverse();
          anim_87695_27_in_87695_28.play();
        }
        else {
      
      let anim_87695_27_in_87695_28 = anime({
        targets: "#Frame-39",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_27_in_87695_28"] = anim_87695_27_in_87695_28;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:42:16"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:42:16");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:42:16"
            );
            
      let anim_87695_27_in_87695_28 = actionAnims["anim_87695_27_in_87695_28"];
      if (anim_87695_27_in_87695_28) {
        anim_87695_27_in_87695_28.pause();
        anim_87695_27_in_87695_28.reverse();
        anim_87695_27_in_87695_28.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_29_in_87695_30 = anime({
        targets: "#Frame-40",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_29_in_87695_30.pause();
      anim_87695_29_in_87695_30.reverse();
      anim_87695_29_in_87695_30.seek(0);
    
      actionAnims["anim_87695_29_in_87695_30"] = anim_87695_29_in_87695_30;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-40").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:57:10");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:57:10",
              featureId: "87695:29",
            });
    
            fireScrollOffTriggers.push("87695:57:10");
    
            
      let anim_87695_29_in_87695_30 = actionAnims["anim_87695_29_in_87695_30"];
    
        if (anim_87695_29_in_87695_30) {
          anim_87695_29_in_87695_30.pause();
          anim_87695_29_in_87695_30.reverse();
          anim_87695_29_in_87695_30.play();
        }
        else {
      
      let anim_87695_29_in_87695_30 = anime({
        targets: "#Frame-40",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_29_in_87695_30"] = anim_87695_29_in_87695_30;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:57:10"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:57:10");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:57:10"
            );
            
      let anim_87695_29_in_87695_30 = actionAnims["anim_87695_29_in_87695_30"];
      if (anim_87695_29_in_87695_30) {
        anim_87695_29_in_87695_30.pause();
        anim_87695_29_in_87695_30.reverse();
        anim_87695_29_in_87695_30.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_31_in_87695_32 = anime({
        targets: "#Frame-41",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_31_in_87695_32.pause();
      anim_87695_31_in_87695_32.reverse();
      anim_87695_31_in_87695_32.seek(0);
    
      actionAnims["anim_87695_31_in_87695_32"] = anim_87695_31_in_87695_32;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-41").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:59:4");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:59:4",
              featureId: "87695:31",
            });
    
            fireScrollOffTriggers.push("87695:59:4");
    
            
      let anim_87695_31_in_87695_32 = actionAnims["anim_87695_31_in_87695_32"];
    
        if (anim_87695_31_in_87695_32) {
          anim_87695_31_in_87695_32.pause();
          anim_87695_31_in_87695_32.reverse();
          anim_87695_31_in_87695_32.play();
        }
        else {
      
      let anim_87695_31_in_87695_32 = anime({
        targets: "#Frame-41",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_31_in_87695_32"] = anim_87695_31_in_87695_32;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:59:4"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:59:4");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:59:4"
            );
            
      let anim_87695_31_in_87695_32 = actionAnims["anim_87695_31_in_87695_32"];
      if (anim_87695_31_in_87695_32) {
        anim_87695_31_in_87695_32.pause();
        anim_87695_31_in_87695_32.reverse();
        anim_87695_31_in_87695_32.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_33_in_87695_34 = anime({
        targets: "#Frame-42",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_33_in_87695_34.pause();
      anim_87695_33_in_87695_34.reverse();
      anim_87695_33_in_87695_34.seek(0);
    
      actionAnims["anim_87695_33_in_87695_34"] = anim_87695_33_in_87695_34;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-42").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:62:2");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:62:2",
              featureId: "87695:33",
            });
    
            fireScrollOffTriggers.push("87695:62:2");
    
            
      let anim_87695_33_in_87695_34 = actionAnims["anim_87695_33_in_87695_34"];
    
        if (anim_87695_33_in_87695_34) {
          anim_87695_33_in_87695_34.pause();
          anim_87695_33_in_87695_34.reverse();
          anim_87695_33_in_87695_34.play();
        }
        else {
      
      let anim_87695_33_in_87695_34 = anime({
        targets: "#Frame-42",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_33_in_87695_34"] = anim_87695_33_in_87695_34;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:62:2"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:62:2");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:62:2"
            );
            
      let anim_87695_33_in_87695_34 = actionAnims["anim_87695_33_in_87695_34"];
      if (anim_87695_33_in_87695_34) {
        anim_87695_33_in_87695_34.pause();
        anim_87695_33_in_87695_34.reverse();
        anim_87695_33_in_87695_34.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_34_in_87695_35 = anime({
        targets: "#Frame-25",
        scale: { value: [1.5, 1], duration: 1500, delay: 0, easing: "easeOutQuint" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeOutQuint" },});
    
      anim_87695_34_in_87695_35.pause();
      anim_87695_34_in_87695_35.reverse();
      anim_87695_34_in_87695_35.seek(0);
    
      actionAnims["anim_87695_34_in_87695_35"] = anim_87695_34_in_87695_35;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-25").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:76:3");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:76:3",
              featureId: "87695:34",
            });
    
            fireScrollOffTriggers.push("87695:76:3");
    
            
      let anim_87695_34_in_87695_35 = actionAnims["anim_87695_34_in_87695_35"];
    
        if (anim_87695_34_in_87695_35) {
          anim_87695_34_in_87695_35.pause();
          anim_87695_34_in_87695_35.reverse();
          anim_87695_34_in_87695_35.play();
        }
        else {
      
      let anim_87695_34_in_87695_35 = anime({
        targets: "#Frame-25",
        scale: { value: [1.5, 1], duration: 1500, delay: 0, easing: "easeOutQuint" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeOutQuint" },});
    
      actionAnims["anim_87695_34_in_87695_35"] = anim_87695_34_in_87695_35;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:76:3"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:76:3");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:76:3"
            );
            
      let anim_87695_34_in_87695_35 = actionAnims["anim_87695_34_in_87695_35"];
      if (anim_87695_34_in_87695_35) {
        anim_87695_34_in_87695_35.pause();
        anim_87695_34_in_87695_35.reverse();
        anim_87695_34_in_87695_35.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_35_in_87695_36 = anime({
        targets: "#Screenshot--521--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_35_in_87695_36.pause();
      anim_87695_35_in_87695_36.reverse();
      anim_87695_35_in_87695_36.seek(0);
    
      actionAnims["anim_87695_35_in_87695_36"] = anim_87695_35_in_87695_36;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Screenshot--521--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:42:20");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:42:20",
              featureId: "87695:35",
            });
    
            fireScrollOffTriggers.push("87695:42:20");
    
            
      let anim_87695_35_in_87695_36 = actionAnims["anim_87695_35_in_87695_36"];
    
        if (anim_87695_35_in_87695_36) {
          anim_87695_35_in_87695_36.pause();
          anim_87695_35_in_87695_36.reverse();
          anim_87695_35_in_87695_36.play();
        }
        else {
      
      let anim_87695_35_in_87695_36 = anime({
        targets: "#Screenshot--521--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_35_in_87695_36"] = anim_87695_35_in_87695_36;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:42:20"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:42:20");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:42:20"
            );
            
      let anim_87695_35_in_87695_36 = actionAnims["anim_87695_35_in_87695_36"];
      if (anim_87695_35_in_87695_36) {
        anim_87695_35_in_87695_36.pause();
        anim_87695_35_in_87695_36.reverse();
        anim_87695_35_in_87695_36.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_36_in_87695_37 = anime({
        targets: "#Screenshot--525--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_36_in_87695_37.pause();
      anim_87695_36_in_87695_37.reverse();
      anim_87695_36_in_87695_37.seek(0);
    
      actionAnims["anim_87695_36_in_87695_37"] = anim_87695_36_in_87695_37;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Screenshot--525--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:52:9");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:52:9",
              featureId: "87695:36",
            });
    
            fireScrollOffTriggers.push("87695:52:9");
    
            
      let anim_87695_36_in_87695_37 = actionAnims["anim_87695_36_in_87695_37"];
    
        if (anim_87695_36_in_87695_37) {
          anim_87695_36_in_87695_37.pause();
          anim_87695_36_in_87695_37.reverse();
          anim_87695_36_in_87695_37.play();
        }
        else {
      
      let anim_87695_36_in_87695_37 = anime({
        targets: "#Screenshot--525--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_36_in_87695_37"] = anim_87695_36_in_87695_37;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:52:9"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:52:9");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:52:9"
            );
            
      let anim_87695_36_in_87695_37 = actionAnims["anim_87695_36_in_87695_37"];
      if (anim_87695_36_in_87695_37) {
        anim_87695_36_in_87695_37.pause();
        anim_87695_36_in_87695_37.reverse();
        anim_87695_36_in_87695_37.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_37_in_87695_38 = anime({
        targets: "#Screenshot--527--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_37_in_87695_38.pause();
      anim_87695_37_in_87695_38.reverse();
      anim_87695_37_in_87695_38.seek(0);
    
      actionAnims["anim_87695_37_in_87695_38"] = anim_87695_37_in_87695_38;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Screenshot--527--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:59:3");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:59:3",
              featureId: "87695:37",
            });
    
            fireScrollOffTriggers.push("87695:59:3");
    
            
      let anim_87695_37_in_87695_38 = actionAnims["anim_87695_37_in_87695_38"];
    
        if (anim_87695_37_in_87695_38) {
          anim_87695_37_in_87695_38.pause();
          anim_87695_37_in_87695_38.reverse();
          anim_87695_37_in_87695_38.play();
        }
        else {
      
      let anim_87695_37_in_87695_38 = anime({
        targets: "#Screenshot--527--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_37_in_87695_38"] = anim_87695_37_in_87695_38;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:59:3"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:59:3");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:59:3"
            );
            
      let anim_87695_37_in_87695_38 = actionAnims["anim_87695_37_in_87695_38"];
      if (anim_87695_37_in_87695_38) {
        anim_87695_37_in_87695_38.pause();
        anim_87695_37_in_87695_38.reverse();
        anim_87695_37_in_87695_38.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_38_in_87695_39 = anime({
        targets: "#Screenshot--528--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_38_in_87695_39.pause();
      anim_87695_38_in_87695_39.reverse();
      anim_87695_38_in_87695_39.seek(0);
    
      actionAnims["anim_87695_38_in_87695_39"] = anim_87695_38_in_87695_39;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Screenshot--528--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:61:3");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:61:3",
              featureId: "87695:38",
            });
    
            fireScrollOffTriggers.push("87695:61:3");
    
            
      let anim_87695_38_in_87695_39 = actionAnims["anim_87695_38_in_87695_39"];
    
        if (anim_87695_38_in_87695_39) {
          anim_87695_38_in_87695_39.pause();
          anim_87695_38_in_87695_39.reverse();
          anim_87695_38_in_87695_39.play();
        }
        else {
      
      let anim_87695_38_in_87695_39 = anime({
        targets: "#Screenshot--528--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_38_in_87695_39"] = anim_87695_38_in_87695_39;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:61:3"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:61:3");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:61:3"
            );
            
      let anim_87695_38_in_87695_39 = actionAnims["anim_87695_38_in_87695_39"];
      if (anim_87695_38_in_87695_39) {
        anim_87695_38_in_87695_39.pause();
        anim_87695_38_in_87695_39.reverse();
        anim_87695_38_in_87695_39.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_42_in_87695_40 = anime({
        targets: "#Art-Memoirs--1",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_42_in_87695_40.pause();
      anim_87695_42_in_87695_40.reverse();
      anim_87695_42_in_87695_40.seek(0);
    
      actionAnims["anim_87695_42_in_87695_40"] = anim_87695_42_in_87695_40;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Art-Memoirs--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:152");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:152",
              featureId: "87695:42",
            });
    
            fireScrollOffTriggers.push("87695:12:152");
    
            
      let anim_87695_42_in_87695_40 = actionAnims["anim_87695_42_in_87695_40"];
    
        if (anim_87695_42_in_87695_40) {
          anim_87695_42_in_87695_40.pause();
          anim_87695_42_in_87695_40.reverse();
          anim_87695_42_in_87695_40.play();
        }
        else {
      
      let anim_87695_42_in_87695_40 = anime({
        targets: "#Art-Memoirs--1",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_42_in_87695_40"] = anim_87695_42_in_87695_40;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:152"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:152");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:152"
            );
            
      let anim_87695_42_in_87695_40 = actionAnims["anim_87695_42_in_87695_40"];
      if (anim_87695_42_in_87695_40) {
        anim_87695_42_in_87695_40.pause();
        anim_87695_42_in_87695_40.reverse();
        anim_87695_42_in_87695_40.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_43_in_87695_41 = anime({
        targets: "#Here-is-a-collection-1",
        translateY: { value: [-50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_43_in_87695_41.pause();
      anim_87695_43_in_87695_41.reverse();
      anim_87695_43_in_87695_41.seek(0);
    
      actionAnims["anim_87695_43_in_87695_41"] = anim_87695_43_in_87695_41;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Here-is-a-collection-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:151");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:151",
              featureId: "87695:43",
            });
    
            fireScrollOffTriggers.push("87695:12:151");
    
            
      let anim_87695_43_in_87695_41 = actionAnims["anim_87695_43_in_87695_41"];
    
        if (anim_87695_43_in_87695_41) {
          anim_87695_43_in_87695_41.pause();
          anim_87695_43_in_87695_41.reverse();
          anim_87695_43_in_87695_41.play();
        }
        else {
      
      let anim_87695_43_in_87695_41 = anime({
        targets: "#Here-is-a-collection-1",
        translateY: { value: [-50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_43_in_87695_41"] = anim_87695_43_in_87695_41;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:151"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:151");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:151"
            );
            
      let anim_87695_43_in_87695_41 = actionAnims["anim_87695_43_in_87695_41"];
      if (anim_87695_43_in_87695_41) {
        anim_87695_43_in_87695_41.pause();
        anim_87695_43_in_87695_41.reverse();
        anim_87695_43_in_87695_41.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_44_in_87695_42 = anime({
        targets: "#WhatsApp-Image-2021--7",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_44_in_87695_42.pause();
      anim_87695_44_in_87695_42.reverse();
      anim_87695_44_in_87695_42.seek(0);
    
      actionAnims["anim_87695_44_in_87695_42"] = anim_87695_44_in_87695_42;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--7").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:103:150");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:103:150",
              featureId: "87695:44",
            });
    
            fireScrollOffTriggers.push("87695:103:150");
    
            
      let anim_87695_44_in_87695_42 = actionAnims["anim_87695_44_in_87695_42"];
    
        if (anim_87695_44_in_87695_42) {
          anim_87695_44_in_87695_42.pause();
          anim_87695_44_in_87695_42.reverse();
          anim_87695_44_in_87695_42.play();
        }
        else {
      
      let anim_87695_44_in_87695_42 = anime({
        targets: "#WhatsApp-Image-2021--7",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_44_in_87695_42"] = anim_87695_44_in_87695_42;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:103:150"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:103:150");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:103:150"
            );
            
      let anim_87695_44_in_87695_42 = actionAnims["anim_87695_44_in_87695_42"];
      if (anim_87695_44_in_87695_42) {
        anim_87695_44_in_87695_42.pause();
        anim_87695_44_in_87695_42.reverse();
        anim_87695_44_in_87695_42.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_45_in_87695_43 = anime({
        targets: "#WhatsApp-Image-2021--6",
        translateY: { value: [50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_45_in_87695_43.pause();
      anim_87695_45_in_87695_43.reverse();
      anim_87695_45_in_87695_43.seek(0);
    
      actionAnims["anim_87695_45_in_87695_43"] = anim_87695_45_in_87695_43;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--6").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:103:154");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:103:154",
              featureId: "87695:45",
            });
    
            fireScrollOffTriggers.push("87695:103:154");
    
            
      let anim_87695_45_in_87695_43 = actionAnims["anim_87695_45_in_87695_43"];
    
        if (anim_87695_45_in_87695_43) {
          anim_87695_45_in_87695_43.pause();
          anim_87695_45_in_87695_43.reverse();
          anim_87695_45_in_87695_43.play();
        }
        else {
      
      let anim_87695_45_in_87695_43 = anime({
        targets: "#WhatsApp-Image-2021--6",
        translateY: { value: [50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_45_in_87695_43"] = anim_87695_45_in_87695_43;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:103:154"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:103:154");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:103:154"
            );
            
      let anim_87695_45_in_87695_43 = actionAnims["anim_87695_45_in_87695_43"];
      if (anim_87695_45_in_87695_43) {
        anim_87695_45_in_87695_43.pause();
        anim_87695_45_in_87695_43.reverse();
        anim_87695_45_in_87695_43.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_46_in_87695_44 = anime({
        targets: "#WhatsApp-Image-2021--8",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_46_in_87695_44.pause();
      anim_87695_46_in_87695_44.reverse();
      anim_87695_46_in_87695_44.seek(0);
    
      actionAnims["anim_87695_46_in_87695_44"] = anim_87695_46_in_87695_44;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--8").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:103:148");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:103:148",
              featureId: "87695:46",
            });
    
            fireScrollOffTriggers.push("87695:103:148");
    
            
      let anim_87695_46_in_87695_44 = actionAnims["anim_87695_46_in_87695_44"];
    
        if (anim_87695_46_in_87695_44) {
          anim_87695_46_in_87695_44.pause();
          anim_87695_46_in_87695_44.reverse();
          anim_87695_46_in_87695_44.play();
        }
        else {
      
      let anim_87695_46_in_87695_44 = anime({
        targets: "#WhatsApp-Image-2021--8",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_46_in_87695_44"] = anim_87695_46_in_87695_44;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:103:148"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:103:148");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:103:148"
            );
            
      let anim_87695_46_in_87695_44 = actionAnims["anim_87695_46_in_87695_44"];
      if (anim_87695_46_in_87695_44) {
        anim_87695_46_in_87695_44.pause();
        anim_87695_46_in_87695_44.reverse();
        anim_87695_46_in_87695_44.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_47_in_87695_45 = anime({
        targets: "#WhatsApp-Image-2021--5",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_47_in_87695_45.pause();
      anim_87695_47_in_87695_45.reverse();
      anim_87695_47_in_87695_45.seek(0);
    
      actionAnims["anim_87695_47_in_87695_45"] = anim_87695_47_in_87695_45;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--5").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:103:158");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:103:158",
              featureId: "87695:47",
            });
    
            fireScrollOffTriggers.push("87695:103:158");
    
            
      let anim_87695_47_in_87695_45 = actionAnims["anim_87695_47_in_87695_45"];
    
        if (anim_87695_47_in_87695_45) {
          anim_87695_47_in_87695_45.pause();
          anim_87695_47_in_87695_45.reverse();
          anim_87695_47_in_87695_45.play();
        }
        else {
      
      let anim_87695_47_in_87695_45 = anime({
        targets: "#WhatsApp-Image-2021--5",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_47_in_87695_45"] = anim_87695_47_in_87695_45;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:103:158"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:103:158");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:103:158"
            );
            
      let anim_87695_47_in_87695_45 = actionAnims["anim_87695_47_in_87695_45"];
      if (anim_87695_47_in_87695_45) {
        anim_87695_47_in_87695_45.pause();
        anim_87695_47_in_87695_45.reverse();
        anim_87695_47_in_87695_45.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_48_in_87695_46 = anime({
        targets: "#WhatsApp-Image-2021--9",
        translateY: { value: [50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_48_in_87695_46.pause();
      anim_87695_48_in_87695_46.reverse();
      anim_87695_48_in_87695_46.seek(0);
    
      actionAnims["anim_87695_48_in_87695_46"] = anim_87695_48_in_87695_46;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--9").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:76:16");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:76:16",
              featureId: "87695:48",
            });
    
            fireScrollOffTriggers.push("87695:76:16");
    
            
      let anim_87695_48_in_87695_46 = actionAnims["anim_87695_48_in_87695_46"];
    
        if (anim_87695_48_in_87695_46) {
          anim_87695_48_in_87695_46.pause();
          anim_87695_48_in_87695_46.reverse();
          anim_87695_48_in_87695_46.play();
        }
        else {
      
      let anim_87695_48_in_87695_46 = anime({
        targets: "#WhatsApp-Image-2021--9",
        translateY: { value: [50, 0], duration: 1500, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_48_in_87695_46"] = anim_87695_48_in_87695_46;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:76:16"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:76:16");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:76:16"
            );
            
      let anim_87695_48_in_87695_46 = actionAnims["anim_87695_48_in_87695_46"];
      if (anim_87695_48_in_87695_46) {
        anim_87695_48_in_87695_46.pause();
        anim_87695_48_in_87695_46.reverse();
        anim_87695_48_in_87695_46.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_49_in_87695_47 = anime({
        targets: "#Let-s-know-each-othe-1",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_49_in_87695_47.pause();
      anim_87695_49_in_87695_47.reverse();
      anim_87695_49_in_87695_47.seek(0);
    
      actionAnims["anim_87695_49_in_87695_47"] = anim_87695_49_in_87695_47;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Let-s-know-each-othe-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:178");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:178",
              featureId: "87695:49",
            });
    
            fireScrollOffTriggers.push("87695:12:178");
    
            
      let anim_87695_49_in_87695_47 = actionAnims["anim_87695_49_in_87695_47"];
    
        if (anim_87695_49_in_87695_47) {
          anim_87695_49_in_87695_47.pause();
          anim_87695_49_in_87695_47.reverse();
          anim_87695_49_in_87695_47.play();
        }
        else {
      
      let anim_87695_49_in_87695_47 = anime({
        targets: "#Let-s-know-each-othe-1",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_49_in_87695_47"] = anim_87695_49_in_87695_47;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:178"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:178");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:178"
            );
            
      let anim_87695_49_in_87695_47 = actionAnims["anim_87695_49_in_87695_47"];
      if (anim_87695_49_in_87695_47) {
        anim_87695_49_in_87695_47.pause();
        anim_87695_49_in_87695_47.reverse();
        anim_87695_49_in_87695_47.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_50_in_87695_48 = anime({
        targets: "#Now-that-you-have-kn-1",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_50_in_87695_48.pause();
      anim_87695_50_in_87695_48.reverse();
      anim_87695_50_in_87695_48.seek(0);
    
      actionAnims["anim_87695_50_in_87695_48"] = anim_87695_50_in_87695_48;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Now-that-you-have-kn-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:177");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:177",
              featureId: "87695:50",
            });
    
            fireScrollOffTriggers.push("87695:12:177");
    
            
      let anim_87695_50_in_87695_48 = actionAnims["anim_87695_50_in_87695_48"];
    
        if (anim_87695_50_in_87695_48) {
          anim_87695_50_in_87695_48.pause();
          anim_87695_50_in_87695_48.reverse();
          anim_87695_50_in_87695_48.play();
        }
        else {
      
      let anim_87695_50_in_87695_48 = anime({
        targets: "#Now-that-you-have-kn-1",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_50_in_87695_48"] = anim_87695_50_in_87695_48;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:177"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:177");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:177"
            );
            
      let anim_87695_50_in_87695_48 = actionAnims["anim_87695_50_in_87695_48"];
      if (anim_87695_50_in_87695_48) {
        anim_87695_50_in_87695_48.pause();
        anim_87695_50_in_87695_48.reverse();
        anim_87695_50_in_87695_48.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_52_in_87695_50 = anime({
        targets: "#Group-80",
        translateY: { value: [50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_52_in_87695_50.pause();
      anim_87695_52_in_87695_50.reverse();
      anim_87695_52_in_87695_50.seek(0);
    
      actionAnims["anim_87695_52_in_87695_50"] = anim_87695_52_in_87695_50;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-80").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:171");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:171",
              featureId: "87695:52",
            });
    
            fireScrollOffTriggers.push("87695:12:171");
    
            
      let anim_87695_52_in_87695_50 = actionAnims["anim_87695_52_in_87695_50"];
    
        if (anim_87695_52_in_87695_50) {
          anim_87695_52_in_87695_50.pause();
          anim_87695_52_in_87695_50.reverse();
          anim_87695_52_in_87695_50.play();
        }
        else {
      
      let anim_87695_52_in_87695_50 = anime({
        targets: "#Group-80",
        translateY: { value: [50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_52_in_87695_50"] = anim_87695_52_in_87695_50;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:171"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:171");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:171"
            );
            
      let anim_87695_52_in_87695_50 = actionAnims["anim_87695_52_in_87695_50"];
      if (anim_87695_52_in_87695_50) {
        anim_87695_52_in_87695_50.pause();
        anim_87695_52_in_87695_50.reverse();
        anim_87695_52_in_87695_50.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_53_in_87695_51 = anime({
        targets: "#Group-81",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_53_in_87695_51.pause();
      anim_87695_53_in_87695_51.reverse();
      anim_87695_53_in_87695_51.seek(0);
    
      actionAnims["anim_87695_53_in_87695_51"] = anim_87695_53_in_87695_51;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-81").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:174");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:174",
              featureId: "87695:53",
            });
    
            fireScrollOffTriggers.push("87695:12:174");
    
            
      let anim_87695_53_in_87695_51 = actionAnims["anim_87695_53_in_87695_51"];
    
        if (anim_87695_53_in_87695_51) {
          anim_87695_53_in_87695_51.pause();
          anim_87695_53_in_87695_51.reverse();
          anim_87695_53_in_87695_51.play();
        }
        else {
      
      let anim_87695_53_in_87695_51 = anime({
        targets: "#Group-81",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_53_in_87695_51"] = anim_87695_53_in_87695_51;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:174"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:174");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:174"
            );
            
      let anim_87695_53_in_87695_51 = actionAnims["anim_87695_53_in_87695_51"];
      if (anim_87695_53_in_87695_51) {
        anim_87695_53_in_87695_51.pause();
        anim_87695_53_in_87695_51.reverse();
        anim_87695_53_in_87695_51.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_54_in_87695_52 = anime({
        targets: "#Group-79-1",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_54_in_87695_52.pause();
      anim_87695_54_in_87695_52.reverse();
      anim_87695_54_in_87695_52.seek(0);
    
      actionAnims["anim_87695_54_in_87695_52"] = anim_87695_54_in_87695_52;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-79-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:168");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:168",
              featureId: "87695:54",
            });
    
            fireScrollOffTriggers.push("87695:12:168");
    
            
      let anim_87695_54_in_87695_52 = actionAnims["anim_87695_54_in_87695_52"];
    
        if (anim_87695_54_in_87695_52) {
          anim_87695_54_in_87695_52.pause();
          anim_87695_54_in_87695_52.reverse();
          anim_87695_54_in_87695_52.play();
        }
        else {
      
      let anim_87695_54_in_87695_52 = anime({
        targets: "#Group-79-1",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_54_in_87695_52"] = anim_87695_54_in_87695_52;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:168"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:168");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:168"
            );
            
      let anim_87695_54_in_87695_52 = actionAnims["anim_87695_54_in_87695_52"];
      if (anim_87695_54_in_87695_52) {
        anim_87695_54_in_87695_52.pause();
        anim_87695_54_in_87695_52.reverse();
        anim_87695_54_in_87695_52.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_55_in_87695_53 = anime({
        targets: "#Frame-3",
        scale: { value: [1.5, 1], duration: 1500, delay: 0, easing: "easeOutQuint" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeOutQuint" },});
    
      anim_87695_55_in_87695_53.pause();
      anim_87695_55_in_87695_53.reverse();
      anim_87695_55_in_87695_53.seek(0);
    
      actionAnims["anim_87695_55_in_87695_53"] = anim_87695_55_in_87695_53;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-3").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:12:166");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:12:166",
              featureId: "87695:55",
            });
    
            fireScrollOffTriggers.push("87695:12:166");
    
            
      let anim_87695_55_in_87695_53 = actionAnims["anim_87695_55_in_87695_53"];
    
        if (anim_87695_55_in_87695_53) {
          anim_87695_55_in_87695_53.pause();
          anim_87695_55_in_87695_53.reverse();
          anim_87695_55_in_87695_53.play();
        }
        else {
      
      let anim_87695_55_in_87695_53 = anime({
        targets: "#Frame-3",
        scale: { value: [1.5, 1], duration: 1500, delay: 0, easing: "easeOutQuint" },
        opacity: { value: [0, 1], duration: 1500, delay: 0, easing: "easeOutQuint" },});
    
      actionAnims["anim_87695_55_in_87695_53"] = anim_87695_55_in_87695_53;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:12:166"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:12:166");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:12:166"
            );
            
      let anim_87695_55_in_87695_53 = actionAnims["anim_87695_55_in_87695_53"];
      if (anim_87695_55_in_87695_53) {
        anim_87695_55_in_87695_53.pause();
        anim_87695_55_in_87695_53.reverse();
        anim_87695_55_in_87695_53.play();
      }
    
          
          }
        }, {passive: true});
      
        document.getElementById("About--1").addEventListener("mouseenter",function () {
          
      questVars["prevColor_" + "87695_60" + "_" + "87695_54"] = getComputedStyle(document.getElementById("About--1")).color;
    
      document.getElementById("About--1").style.color = "rgba(140, 121, 211, 1)";
    
        });
      
        document.getElementById("About--1").addEventListener("mouseleave",function () {
          
          document.getElementById("About--1").style.color = questVars["prevColor_" + "87695_60" + "_" + "87695_54"];
      
        });
      
        document.getElementById("Skillset--1").addEventListener("mouseenter",function () {
          
      questVars["prevColor_" + "87695_61" + "_" + "87695_55"] = getComputedStyle(document.getElementById("Skillset--1")).color;
    
      document.getElementById("Skillset--1").style.color = "rgba(140, 121, 211, 1)";
    
        });
      
        document.getElementById("Skillset--1").addEventListener("mouseleave",function () {
          
          document.getElementById("Skillset--1").style.color = questVars["prevColor_" + "87695_61" + "_" + "87695_55"];
      
        });
      
        document.getElementById("Projects--1").addEventListener("mouseenter",function () {
          
      questVars["prevColor_" + "87695_62" + "_" + "87695_56"] = getComputedStyle(document.getElementById("Projects--1")).color;
    
      document.getElementById("Projects--1").style.color = "rgba(140, 121, 211, 1)";
    
        });
      
        document.getElementById("Projects--1").addEventListener("mouseleave",function () {
          
          document.getElementById("Projects--1").style.color = questVars["prevColor_" + "87695_62" + "_" + "87695_56"];
      
        });
      
        document.getElementById("Contact--1").addEventListener("mouseenter",function () {
          
      questVars["prevColor_" + "87695_63" + "_" + "87695_57"] = getComputedStyle(document.getElementById("Contact--1")).color;
    
      document.getElementById("Contact--1").style.color = "rgba(140, 121, 211, 1)";
    
        });
      
        document.getElementById("Contact--1").addEventListener("mouseleave",function () {
          
          document.getElementById("Contact--1").style.color = questVars["prevColor_" + "87695_63" + "_" + "87695_57"];
      
        });
      
        document.getElementById("About--1").addEventListener("click",function () {
          
      let div = document.getElementById("Frame-16");
      let boundingRect = div.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
  
      let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
  
      let top = boundingRect.top + scrollTop - clientTop;

      window.scroll({
      top: top, 
      left: 0, 
      behavior: "smooth" 
    }); 
  
        });
      
        document.getElementById("Skillset--1").addEventListener("click",function () {
          
      let div = document.getElementById("Frame-17");
      let boundingRect = div.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
  
      let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
  
      let top = boundingRect.top + scrollTop - clientTop;

      window.scroll({
      top: top, 
      left: 0, 
      behavior: "smooth" 
    }); 
  
        });
      
        document.getElementById("Projects--1").addEventListener("click",function () {
          
      let div = document.getElementById("Work-that-I-ve-done--1");
      let boundingRect = div.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
  
      let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
  
      let top = boundingRect.top + scrollTop - clientTop;

      window.scroll({
      top: top, 
      left: 0, 
      behavior: "smooth" 
    }); 
  
        });
      
        document.getElementById("Contact--1").addEventListener("click",function () {
          
      let div = document.getElementById("Let-s-know-each-othe-1");
      let boundingRect = div.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
  
      let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
  
      let top = boundingRect.top + scrollTop - clientTop;

      window.scroll({
      top: top, 
      left: 0, 
      behavior: "smooth" 
    }); 
  
        });
      
        document.getElementById("WhatsApp-Image-2021--7").addEventListener("mouseenter",function () {
          
      let anim_87695_73_out_87695_62 = actionAnims["anim_87695_73_out_87695_62"];
    
        if (anim_87695_73_out_87695_62) {
          anim_87695_73_out_87695_62.pause();
          anim_87695_73_out_87695_62.reverse();
          anim_87695_73_out_87695_62.play();
        }
        else {
      
      let anim_87695_73_out_87695_62 = anime({
        targets: "#WhatsApp-Image-2021--7",
        opacity: { value: 0, duration: 250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_73_out_87695_62"] = anim_87695_73_out_87695_62;
    
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--7").addEventListener("mouseleave",function () {
          
      let anim_87695_73_out_87695_62 = actionAnims["anim_87695_73_out_87695_62"];
      if (anim_87695_73_out_87695_62) {
        anim_87695_73_out_87695_62.pause();
        anim_87695_73_out_87695_62.reverse();
        anim_87695_73_out_87695_62.play();
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--9").addEventListener("mouseenter",function () {
          
      let anim_87695_74_out_87695_63 = actionAnims["anim_87695_74_out_87695_63"];
    
        if (anim_87695_74_out_87695_63) {
          anim_87695_74_out_87695_63.pause();
          anim_87695_74_out_87695_63.reverse();
          anim_87695_74_out_87695_63.play();
        }
        else {
      
      let anim_87695_74_out_87695_63 = anime({
        targets: "#WhatsApp-Image-2021--9",
        opacity: { value: 0, duration: 250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_74_out_87695_63"] = anim_87695_74_out_87695_63;
    
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--9").addEventListener("mouseleave",function () {
          
      let anim_87695_74_out_87695_63 = actionAnims["anim_87695_74_out_87695_63"];
      if (anim_87695_74_out_87695_63) {
        anim_87695_74_out_87695_63.pause();
        anim_87695_74_out_87695_63.reverse();
        anim_87695_74_out_87695_63.play();
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--6").addEventListener("mouseenter",function () {
          
      let anim_87695_75_out_87695_64 = actionAnims["anim_87695_75_out_87695_64"];
    
        if (anim_87695_75_out_87695_64) {
          anim_87695_75_out_87695_64.pause();
          anim_87695_75_out_87695_64.reverse();
          anim_87695_75_out_87695_64.play();
        }
        else {
      
      let anim_87695_75_out_87695_64 = anime({
        targets: "#WhatsApp-Image-2021--6",
        opacity: { value: 0, duration: 250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_75_out_87695_64"] = anim_87695_75_out_87695_64;
    
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--6").addEventListener("mouseleave",function () {
          
      let anim_87695_75_out_87695_64 = actionAnims["anim_87695_75_out_87695_64"];
      if (anim_87695_75_out_87695_64) {
        anim_87695_75_out_87695_64.pause();
        anim_87695_75_out_87695_64.reverse();
        anim_87695_75_out_87695_64.play();
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--8").addEventListener("mouseenter",function () {
          
      let anim_87695_76_out_87695_65 = actionAnims["anim_87695_76_out_87695_65"];
    
        if (anim_87695_76_out_87695_65) {
          anim_87695_76_out_87695_65.pause();
          anim_87695_76_out_87695_65.reverse();
          anim_87695_76_out_87695_65.play();
        }
        else {
      
      let anim_87695_76_out_87695_65 = anime({
        targets: "#WhatsApp-Image-2021--8",
        opacity: { value: 0, duration: 250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_76_out_87695_65"] = anim_87695_76_out_87695_65;
    
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--8").addEventListener("mouseleave",function () {
          
      let anim_87695_76_out_87695_65 = actionAnims["anim_87695_76_out_87695_65"];
      if (anim_87695_76_out_87695_65) {
        anim_87695_76_out_87695_65.pause();
        anim_87695_76_out_87695_65.reverse();
        anim_87695_76_out_87695_65.play();
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--5").addEventListener("mouseenter",function () {
          
      let anim_87695_77_out_87695_66 = actionAnims["anim_87695_77_out_87695_66"];
    
        if (anim_87695_77_out_87695_66) {
          anim_87695_77_out_87695_66.pause();
          anim_87695_77_out_87695_66.reverse();
          anim_87695_77_out_87695_66.play();
        }
        else {
      
      let anim_87695_77_out_87695_66 = anime({
        targets: "#WhatsApp-Image-2021--5",
        opacity: { value: 0, duration: 250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_77_out_87695_66"] = anim_87695_77_out_87695_66;
    
      }
    
        });
      
        document.getElementById("WhatsApp-Image-2021--5").addEventListener("mouseleave",function () {
          
      let anim_87695_77_out_87695_66 = actionAnims["anim_87695_77_out_87695_66"];
      if (anim_87695_77_out_87695_66) {
        anim_87695_77_out_87695_66.pause();
        anim_87695_77_out_87695_66.reverse();
        anim_87695_77_out_87695_66.play();
      }
    
        });
      
        
      let anim_87695_78_in_87695_67 = actionAnims["anim_87695_78_in_87695_67"];
    
        if (anim_87695_78_in_87695_67) {
          anim_87695_78_in_87695_67.restart();
        }
        else {
      
      let anim_87695_78_in_87695_67 = anime({
        targets: "#Group-87",
        translateY: { value: [50, 0], duration: 750, delay: 500, easing: "easeInOutExpo" },
        opacity: { value: [0, 0.6000000238418579], duration: 750, delay: 500, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_78_in_87695_67"] = anim_87695_78_in_87695_67;
    
      }
    
      
        
      let anim_87695_80_in_87695_69 = actionAnims["anim_87695_80_in_87695_69"];
    
        if (anim_87695_80_in_87695_69) {
          anim_87695_80_in_87695_69.restart();
        }
        else {
      
      let anim_87695_80_in_87695_69 = anime({
        targets: "#Hi-",
        scale: { value: [1.5, 1], duration: 1250, delay: 500, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1250, delay: 500, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 500, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_80_in_87695_69"] = anim_87695_80_in_87695_69;
    
      }
    
      
        
      let anim_87695_81_in_87695_70 = actionAnims["anim_87695_81_in_87695_70"];
    
        if (anim_87695_81_in_87695_70) {
          anim_87695_81_in_87695_70.restart();
        }
        else {
      
      let anim_87695_81_in_87695_70 = anime({
        targets: "#I-am-Aiman-Shaikh",
        scale: { value: [1.5, 1], duration: 1500, delay: 500, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1500, delay: 500, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1500, delay: 500, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_81_in_87695_70"] = anim_87695_81_in_87695_70;
    
      }
    
      
      let anim_87695_82_in_87695_71 = anime({
        targets: "#UI-designer---Full-s",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_82_in_87695_71.pause();
      anim_87695_82_in_87695_71.reverse();
      anim_87695_82_in_87695_71.seek(0);
    
      actionAnims["anim_87695_82_in_87695_71"] = anim_87695_82_in_87695_71;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("UI-designer---Full-s").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:161");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:161",
              featureId: "87695:82",
            });
    
            fireScrollOffTriggers.push("87695:129:161");
    
            
      let anim_87695_82_in_87695_71 = actionAnims["anim_87695_82_in_87695_71"];
    
        if (anim_87695_82_in_87695_71) {
          anim_87695_82_in_87695_71.pause();
          anim_87695_82_in_87695_71.reverse();
          anim_87695_82_in_87695_71.play();
        }
        else {
      
      let anim_87695_82_in_87695_71 = anime({
        targets: "#UI-designer---Full-s",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_82_in_87695_71"] = anim_87695_82_in_87695_71;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:161"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:161");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:161"
            );
            
      let anim_87695_82_in_87695_71 = actionAnims["anim_87695_82_in_87695_71"];
      if (anim_87695_82_in_87695_71) {
        anim_87695_82_in_87695_71.pause();
        anim_87695_82_in_87695_71.reverse();
        anim_87695_82_in_87695_71.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_84_in_87695_73 = anime({
        targets: "#About-me-",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_84_in_87695_73.pause();
      anim_87695_84_in_87695_73.reverse();
      anim_87695_84_in_87695_73.seek(0);
    
      actionAnims["anim_87695_84_in_87695_73"] = anim_87695_84_in_87695_73;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("About-me-").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:173");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:173",
              featureId: "87695:84",
            });
    
            fireScrollOffTriggers.push("87695:129:173");
    
            
      let anim_87695_84_in_87695_73 = actionAnims["anim_87695_84_in_87695_73"];
    
        if (anim_87695_84_in_87695_73) {
          anim_87695_84_in_87695_73.pause();
          anim_87695_84_in_87695_73.reverse();
          anim_87695_84_in_87695_73.play();
        }
        else {
      
      let anim_87695_84_in_87695_73 = anime({
        targets: "#About-me-",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_84_in_87695_73"] = anim_87695_84_in_87695_73;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:173"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:173");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:173"
            );
            
      let anim_87695_84_in_87695_73 = actionAnims["anim_87695_84_in_87695_73"];
      if (anim_87695_84_in_87695_73) {
        anim_87695_84_in_87695_73.pause();
        anim_87695_84_in_87695_73.reverse();
        anim_87695_84_in_87695_73.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_85_in_87695_74 = anime({
        targets: "#I-am-an-undergraduat",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_85_in_87695_74.pause();
      anim_87695_85_in_87695_74.reverse();
      anim_87695_85_in_87695_74.seek(0);
    
      actionAnims["anim_87695_85_in_87695_74"] = anim_87695_85_in_87695_74;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("I-am-an-undergraduat").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:174");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:174",
              featureId: "87695:85",
            });
    
            fireScrollOffTriggers.push("87695:129:174");
    
            
      let anim_87695_85_in_87695_74 = actionAnims["anim_87695_85_in_87695_74"];
    
        if (anim_87695_85_in_87695_74) {
          anim_87695_85_in_87695_74.pause();
          anim_87695_85_in_87695_74.reverse();
          anim_87695_85_in_87695_74.play();
        }
        else {
      
      let anim_87695_85_in_87695_74 = anime({
        targets: "#I-am-an-undergraduat",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_85_in_87695_74"] = anim_87695_85_in_87695_74;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:174"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:174");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:174"
            );
            
      let anim_87695_85_in_87695_74 = actionAnims["anim_87695_85_in_87695_74"];
      if (anim_87695_85_in_87695_74) {
        anim_87695_85_in_87695_74.pause();
        anim_87695_85_in_87695_74.reverse();
        anim_87695_85_in_87695_74.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_87_in_87695_76 = anime({
        targets: "#Skillset",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_87_in_87695_76.pause();
      anim_87695_87_in_87695_76.reverse();
      anim_87695_87_in_87695_76.seek(0);
    
      actionAnims["anim_87695_87_in_87695_76"] = anim_87695_87_in_87695_76;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Skillset").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:179");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:179",
              featureId: "87695:87",
            });
    
            fireScrollOffTriggers.push("87695:129:179");
    
            
      let anim_87695_87_in_87695_76 = actionAnims["anim_87695_87_in_87695_76"];
    
        if (anim_87695_87_in_87695_76) {
          anim_87695_87_in_87695_76.pause();
          anim_87695_87_in_87695_76.reverse();
          anim_87695_87_in_87695_76.play();
        }
        else {
      
      let anim_87695_87_in_87695_76 = anime({
        targets: "#Skillset",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_87_in_87695_76"] = anim_87695_87_in_87695_76;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:179"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:179");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:179"
            );
            
      let anim_87695_87_in_87695_76 = actionAnims["anim_87695_87_in_87695_76"];
      if (anim_87695_87_in_87695_76) {
        anim_87695_87_in_87695_76.pause();
        anim_87695_87_in_87695_76.reverse();
        anim_87695_87_in_87695_76.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_88_in_87695_77 = anime({
        targets: "#With-skills-in-UI-de",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_88_in_87695_77.pause();
      anim_87695_88_in_87695_77.reverse();
      anim_87695_88_in_87695_77.seek(0);
    
      actionAnims["anim_87695_88_in_87695_77"] = anim_87695_88_in_87695_77;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("With-skills-in-UI-de").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:180");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:180",
              featureId: "87695:88",
            });
    
            fireScrollOffTriggers.push("87695:129:180");
    
            
      let anim_87695_88_in_87695_77 = actionAnims["anim_87695_88_in_87695_77"];
    
        if (anim_87695_88_in_87695_77) {
          anim_87695_88_in_87695_77.pause();
          anim_87695_88_in_87695_77.reverse();
          anim_87695_88_in_87695_77.play();
        }
        else {
      
      let anim_87695_88_in_87695_77 = anime({
        targets: "#With-skills-in-UI-de",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_88_in_87695_77"] = anim_87695_88_in_87695_77;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:180"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:180");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:180"
            );
            
      let anim_87695_88_in_87695_77 = actionAnims["anim_87695_88_in_87695_77"];
      if (anim_87695_88_in_87695_77) {
        anim_87695_88_in_87695_77.pause();
        anim_87695_88_in_87695_77.reverse();
        anim_87695_88_in_87695_77.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_89_in_87695_78 = anime({
        targets: "#Group-19-3",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_89_in_87695_78.pause();
      anim_87695_89_in_87695_78.reverse();
      anim_87695_89_in_87695_78.seek(0);
    
      actionAnims["anim_87695_89_in_87695_78"] = anim_87695_89_in_87695_78;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-19-3").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:193");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:193",
              featureId: "87695:89",
            });
    
            fireScrollOffTriggers.push("87695:129:193");
    
            
      let anim_87695_89_in_87695_78 = actionAnims["anim_87695_89_in_87695_78"];
    
        if (anim_87695_89_in_87695_78) {
          anim_87695_89_in_87695_78.pause();
          anim_87695_89_in_87695_78.reverse();
          anim_87695_89_in_87695_78.play();
        }
        else {
      
      let anim_87695_89_in_87695_78 = anime({
        targets: "#Group-19-3",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_89_in_87695_78"] = anim_87695_89_in_87695_78;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:193"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:193");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:193"
            );
            
      let anim_87695_89_in_87695_78 = actionAnims["anim_87695_89_in_87695_78"];
      if (anim_87695_89_in_87695_78) {
        anim_87695_89_in_87695_78.pause();
        anim_87695_89_in_87695_78.reverse();
        anim_87695_89_in_87695_78.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_90_in_87695_79 = anime({
        targets: "#Frame-47-9",
        translateY: { value: [50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_90_in_87695_79.pause();
      anim_87695_90_in_87695_79.reverse();
      anim_87695_90_in_87695_79.seek(0);
    
      actionAnims["anim_87695_90_in_87695_79"] = anim_87695_90_in_87695_79;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-9").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:197");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:197",
              featureId: "87695:90",
            });
    
            fireScrollOffTriggers.push("87695:129:197");
    
            
      let anim_87695_90_in_87695_79 = actionAnims["anim_87695_90_in_87695_79"];
    
        if (anim_87695_90_in_87695_79) {
          anim_87695_90_in_87695_79.pause();
          anim_87695_90_in_87695_79.reverse();
          anim_87695_90_in_87695_79.play();
        }
        else {
      
      let anim_87695_90_in_87695_79 = anime({
        targets: "#Frame-47-9",
        translateY: { value: [50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_90_in_87695_79"] = anim_87695_90_in_87695_79;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:197"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:197");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:197"
            );
            
      let anim_87695_90_in_87695_79 = actionAnims["anim_87695_90_in_87695_79"];
      if (anim_87695_90_in_87695_79) {
        anim_87695_90_in_87695_79.pause();
        anim_87695_90_in_87695_79.reverse();
        anim_87695_90_in_87695_79.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_91_in_87695_80 = anime({
        targets: "#Frame-47-8",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_91_in_87695_80.pause();
      anim_87695_91_in_87695_80.reverse();
      anim_87695_91_in_87695_80.seek(0);
    
      actionAnims["anim_87695_91_in_87695_80"] = anim_87695_91_in_87695_80;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-8").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:202");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:202",
              featureId: "87695:91",
            });
    
            fireScrollOffTriggers.push("87695:129:202");
    
            
      let anim_87695_91_in_87695_80 = actionAnims["anim_87695_91_in_87695_80"];
    
        if (anim_87695_91_in_87695_80) {
          anim_87695_91_in_87695_80.pause();
          anim_87695_91_in_87695_80.reverse();
          anim_87695_91_in_87695_80.play();
        }
        else {
      
      let anim_87695_91_in_87695_80 = anime({
        targets: "#Frame-47-8",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_91_in_87695_80"] = anim_87695_91_in_87695_80;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:202"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:202");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:202"
            );
            
      let anim_87695_91_in_87695_80 = actionAnims["anim_87695_91_in_87695_80"];
      if (anim_87695_91_in_87695_80) {
        anim_87695_91_in_87695_80.pause();
        anim_87695_91_in_87695_80.reverse();
        anim_87695_91_in_87695_80.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_92_in_87695_81 = anime({
        targets: "#Frame-47-6",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_92_in_87695_81.pause();
      anim_87695_92_in_87695_81.reverse();
      anim_87695_92_in_87695_81.seek(0);
    
      actionAnims["anim_87695_92_in_87695_81"] = anim_87695_92_in_87695_81;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-6").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:209");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:209",
              featureId: "87695:92",
            });
    
            fireScrollOffTriggers.push("87695:129:209");
    
            
      let anim_87695_92_in_87695_81 = actionAnims["anim_87695_92_in_87695_81"];
    
        if (anim_87695_92_in_87695_81) {
          anim_87695_92_in_87695_81.pause();
          anim_87695_92_in_87695_81.reverse();
          anim_87695_92_in_87695_81.play();
        }
        else {
      
      let anim_87695_92_in_87695_81 = anime({
        targets: "#Frame-47-6",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_92_in_87695_81"] = anim_87695_92_in_87695_81;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:209"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:209");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:209"
            );
            
      let anim_87695_92_in_87695_81 = actionAnims["anim_87695_92_in_87695_81"];
      if (anim_87695_92_in_87695_81) {
        anim_87695_92_in_87695_81.pause();
        anim_87695_92_in_87695_81.reverse();
        anim_87695_92_in_87695_81.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_93_in_87695_82 = anime({
        targets: "#Frame-47-7",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_93_in_87695_82.pause();
      anim_87695_93_in_87695_82.reverse();
      anim_87695_93_in_87695_82.seek(0);
    
      actionAnims["anim_87695_93_in_87695_82"] = anim_87695_93_in_87695_82;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-7").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:216");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:216",
              featureId: "87695:93",
            });
    
            fireScrollOffTriggers.push("87695:129:216");
    
            
      let anim_87695_93_in_87695_82 = actionAnims["anim_87695_93_in_87695_82"];
    
        if (anim_87695_93_in_87695_82) {
          anim_87695_93_in_87695_82.pause();
          anim_87695_93_in_87695_82.reverse();
          anim_87695_93_in_87695_82.play();
        }
        else {
      
      let anim_87695_93_in_87695_82 = anime({
        targets: "#Frame-47-7",
        translateY: { value: [50, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_93_in_87695_82"] = anim_87695_93_in_87695_82;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:216"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:216");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:216"
            );
            
      let anim_87695_93_in_87695_82 = actionAnims["anim_87695_93_in_87695_82"];
      if (anim_87695_93_in_87695_82) {
        anim_87695_93_in_87695_82.pause();
        anim_87695_93_in_87695_82.reverse();
        anim_87695_93_in_87695_82.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_94_in_87695_83 = anime({
        targets: "#Work-that-I-ve-done-",
        translateY: { value: [50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_94_in_87695_83.pause();
      anim_87695_94_in_87695_83.reverse();
      anim_87695_94_in_87695_83.seek(0);
    
      actionAnims["anim_87695_94_in_87695_83"] = anim_87695_94_in_87695_83;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Work-that-I-ve-done-").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:222");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:222",
              featureId: "87695:94",
            });
    
            fireScrollOffTriggers.push("87695:129:222");
    
            
      let anim_87695_94_in_87695_83 = actionAnims["anim_87695_94_in_87695_83"];
    
        if (anim_87695_94_in_87695_83) {
          anim_87695_94_in_87695_83.pause();
          anim_87695_94_in_87695_83.reverse();
          anim_87695_94_in_87695_83.play();
        }
        else {
      
      let anim_87695_94_in_87695_83 = anime({
        targets: "#Work-that-I-ve-done-",
        translateY: { value: [50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_94_in_87695_83"] = anim_87695_94_in_87695_83;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:222"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:222");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:222"
            );
            
      let anim_87695_94_in_87695_83 = actionAnims["anim_87695_94_in_87695_83"];
      if (anim_87695_94_in_87695_83) {
        anim_87695_94_in_87695_83.pause();
        anim_87695_94_in_87695_83.reverse();
        anim_87695_94_in_87695_83.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_95_in_87695_84 = anime({
        targets: "#MY-PROJECTS",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_95_in_87695_84.pause();
      anim_87695_95_in_87695_84.reverse();
      anim_87695_95_in_87695_84.seek(0);
    
      actionAnims["anim_87695_95_in_87695_84"] = anim_87695_95_in_87695_84;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("MY-PROJECTS").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:221");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:221",
              featureId: "87695:95",
            });
    
            fireScrollOffTriggers.push("87695:129:221");
    
            
      let anim_87695_95_in_87695_84 = actionAnims["anim_87695_95_in_87695_84"];
    
        if (anim_87695_95_in_87695_84) {
          anim_87695_95_in_87695_84.pause();
          anim_87695_95_in_87695_84.reverse();
          anim_87695_95_in_87695_84.play();
        }
        else {
      
      let anim_87695_95_in_87695_84 = anime({
        targets: "#MY-PROJECTS",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_95_in_87695_84"] = anim_87695_95_in_87695_84;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:221"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:221");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:221"
            );
            
      let anim_87695_95_in_87695_84 = actionAnims["anim_87695_95_in_87695_84"];
      if (anim_87695_95_in_87695_84) {
        anim_87695_95_in_87695_84.pause();
        anim_87695_95_in_87695_84.reverse();
        anim_87695_95_in_87695_84.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_96_in_87695_85 = anime({
        targets: "#Screenshot--521--2",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_96_in_87695_85.pause();
      anim_87695_96_in_87695_85.reverse();
      anim_87695_96_in_87695_85.seek(0);
    
      actionAnims["anim_87695_96_in_87695_85"] = anim_87695_96_in_87695_85;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Screenshot--521--2").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:223");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:223",
              featureId: "87695:96",
            });
    
            fireScrollOffTriggers.push("87695:129:223");
    
            
      let anim_87695_96_in_87695_85 = actionAnims["anim_87695_96_in_87695_85"];
    
        if (anim_87695_96_in_87695_85) {
          anim_87695_96_in_87695_85.pause();
          anim_87695_96_in_87695_85.reverse();
          anim_87695_96_in_87695_85.play();
        }
        else {
      
      let anim_87695_96_in_87695_85 = anime({
        targets: "#Screenshot--521--2",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_96_in_87695_85"] = anim_87695_96_in_87695_85;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:223"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:223");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:223"
            );
            
      let anim_87695_96_in_87695_85 = actionAnims["anim_87695_96_in_87695_85"];
      if (anim_87695_96_in_87695_85) {
        anim_87695_96_in_87695_85.pause();
        anim_87695_96_in_87695_85.reverse();
        anim_87695_96_in_87695_85.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_97_in_87695_86 = anime({
        targets: "#Frame-47-5",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_97_in_87695_86.pause();
      anim_87695_97_in_87695_86.reverse();
      anim_87695_97_in_87695_86.seek(0);
    
      actionAnims["anim_87695_97_in_87695_86"] = anim_87695_97_in_87695_86;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-5").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:224");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:224",
              featureId: "87695:97",
            });
    
            fireScrollOffTriggers.push("87695:129:224");
    
            
      let anim_87695_97_in_87695_86 = actionAnims["anim_87695_97_in_87695_86"];
    
        if (anim_87695_97_in_87695_86) {
          anim_87695_97_in_87695_86.pause();
          anim_87695_97_in_87695_86.reverse();
          anim_87695_97_in_87695_86.play();
        }
        else {
      
      let anim_87695_97_in_87695_86 = anime({
        targets: "#Frame-47-5",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_97_in_87695_86"] = anim_87695_97_in_87695_86;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:224"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:224");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:224"
            );
            
      let anim_87695_97_in_87695_86 = actionAnims["anim_87695_97_in_87695_86"];
      if (anim_87695_97_in_87695_86) {
        anim_87695_97_in_87695_86.pause();
        anim_87695_97_in_87695_86.reverse();
        anim_87695_97_in_87695_86.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_98_in_87695_87 = anime({
        targets: "#Screenshot--525--2",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_98_in_87695_87.pause();
      anim_87695_98_in_87695_87.reverse();
      anim_87695_98_in_87695_87.seek(0);
    
      actionAnims["anim_87695_98_in_87695_87"] = anim_87695_98_in_87695_87;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Screenshot--525--2").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:229");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:229",
              featureId: "87695:98",
            });
    
            fireScrollOffTriggers.push("87695:129:229");
    
            
      let anim_87695_98_in_87695_87 = actionAnims["anim_87695_98_in_87695_87"];
    
        if (anim_87695_98_in_87695_87) {
          anim_87695_98_in_87695_87.pause();
          anim_87695_98_in_87695_87.reverse();
          anim_87695_98_in_87695_87.play();
        }
        else {
      
      let anim_87695_98_in_87695_87 = anime({
        targets: "#Screenshot--525--2",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_98_in_87695_87"] = anim_87695_98_in_87695_87;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:229"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:229");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:229"
            );
            
      let anim_87695_98_in_87695_87 = actionAnims["anim_87695_98_in_87695_87"];
      if (anim_87695_98_in_87695_87) {
        anim_87695_98_in_87695_87.pause();
        anim_87695_98_in_87695_87.reverse();
        anim_87695_98_in_87695_87.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_99_in_87695_88 = anime({
        targets: "#Frame-47-4",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_99_in_87695_88.pause();
      anim_87695_99_in_87695_88.reverse();
      anim_87695_99_in_87695_88.seek(0);
    
      actionAnims["anim_87695_99_in_87695_88"] = anim_87695_99_in_87695_88;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-4").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:230");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:230",
              featureId: "87695:99",
            });
    
            fireScrollOffTriggers.push("87695:129:230");
    
            
      let anim_87695_99_in_87695_88 = actionAnims["anim_87695_99_in_87695_88"];
    
        if (anim_87695_99_in_87695_88) {
          anim_87695_99_in_87695_88.pause();
          anim_87695_99_in_87695_88.reverse();
          anim_87695_99_in_87695_88.play();
        }
        else {
      
      let anim_87695_99_in_87695_88 = anime({
        targets: "#Frame-47-4",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_99_in_87695_88"] = anim_87695_99_in_87695_88;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:230"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:230");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:230"
            );
            
      let anim_87695_99_in_87695_88 = actionAnims["anim_87695_99_in_87695_88"];
      if (anim_87695_99_in_87695_88) {
        anim_87695_99_in_87695_88.pause();
        anim_87695_99_in_87695_88.reverse();
        anim_87695_99_in_87695_88.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_100_in_87695_89 = anime({
        targets: "#Screenshot--527--2",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_100_in_87695_89.pause();
      anim_87695_100_in_87695_89.reverse();
      anim_87695_100_in_87695_89.seek(0);
    
      actionAnims["anim_87695_100_in_87695_89"] = anim_87695_100_in_87695_89;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Screenshot--527--2").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:235");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:235",
              featureId: "87695:100",
            });
    
            fireScrollOffTriggers.push("87695:129:235");
    
            
      let anim_87695_100_in_87695_89 = actionAnims["anim_87695_100_in_87695_89"];
    
        if (anim_87695_100_in_87695_89) {
          anim_87695_100_in_87695_89.pause();
          anim_87695_100_in_87695_89.reverse();
          anim_87695_100_in_87695_89.play();
        }
        else {
      
      let anim_87695_100_in_87695_89 = anime({
        targets: "#Screenshot--527--2",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_100_in_87695_89"] = anim_87695_100_in_87695_89;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:235"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:235");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:235"
            );
            
      let anim_87695_100_in_87695_89 = actionAnims["anim_87695_100_in_87695_89"];
      if (anim_87695_100_in_87695_89) {
        anim_87695_100_in_87695_89.pause();
        anim_87695_100_in_87695_89.reverse();
        anim_87695_100_in_87695_89.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_101_in_87695_90 = anime({
        targets: "#Frame-47-3",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_101_in_87695_90.pause();
      anim_87695_101_in_87695_90.reverse();
      anim_87695_101_in_87695_90.seek(0);
    
      actionAnims["anim_87695_101_in_87695_90"] = anim_87695_101_in_87695_90;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-3").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:236");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:236",
              featureId: "87695:101",
            });
    
            fireScrollOffTriggers.push("87695:129:236");
    
            
      let anim_87695_101_in_87695_90 = actionAnims["anim_87695_101_in_87695_90"];
    
        if (anim_87695_101_in_87695_90) {
          anim_87695_101_in_87695_90.pause();
          anim_87695_101_in_87695_90.reverse();
          anim_87695_101_in_87695_90.play();
        }
        else {
      
      let anim_87695_101_in_87695_90 = anime({
        targets: "#Frame-47-3",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_101_in_87695_90"] = anim_87695_101_in_87695_90;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:236"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:236");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:236"
            );
            
      let anim_87695_101_in_87695_90 = actionAnims["anim_87695_101_in_87695_90"];
      if (anim_87695_101_in_87695_90) {
        anim_87695_101_in_87695_90.pause();
        anim_87695_101_in_87695_90.reverse();
        anim_87695_101_in_87695_90.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_102_in_87695_91 = anime({
        targets: "#Screenshot--528--2",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_102_in_87695_91.pause();
      anim_87695_102_in_87695_91.reverse();
      anim_87695_102_in_87695_91.seek(0);
    
      actionAnims["anim_87695_102_in_87695_91"] = anim_87695_102_in_87695_91;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Screenshot--528--2").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:241");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:241",
              featureId: "87695:102",
            });
    
            fireScrollOffTriggers.push("87695:129:241");
    
            
      let anim_87695_102_in_87695_91 = actionAnims["anim_87695_102_in_87695_91"];
    
        if (anim_87695_102_in_87695_91) {
          anim_87695_102_in_87695_91.pause();
          anim_87695_102_in_87695_91.reverse();
          anim_87695_102_in_87695_91.play();
        }
        else {
      
      let anim_87695_102_in_87695_91 = anime({
        targets: "#Screenshot--528--2",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_102_in_87695_91"] = anim_87695_102_in_87695_91;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:241"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:241");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:241"
            );
            
      let anim_87695_102_in_87695_91 = actionAnims["anim_87695_102_in_87695_91"];
      if (anim_87695_102_in_87695_91) {
        anim_87695_102_in_87695_91.pause();
        anim_87695_102_in_87695_91.reverse();
        anim_87695_102_in_87695_91.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_103_in_87695_92 = anime({
        targets: "#Frame-47-2",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_103_in_87695_92.pause();
      anim_87695_103_in_87695_92.reverse();
      anim_87695_103_in_87695_92.seek(0);
    
      actionAnims["anim_87695_103_in_87695_92"] = anim_87695_103_in_87695_92;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-2").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:242");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:242",
              featureId: "87695:103",
            });
    
            fireScrollOffTriggers.push("87695:129:242");
    
            
      let anim_87695_103_in_87695_92 = actionAnims["anim_87695_103_in_87695_92"];
    
        if (anim_87695_103_in_87695_92) {
          anim_87695_103_in_87695_92.pause();
          anim_87695_103_in_87695_92.reverse();
          anim_87695_103_in_87695_92.play();
        }
        else {
      
      let anim_87695_103_in_87695_92 = anime({
        targets: "#Frame-47-2",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_103_in_87695_92"] = anim_87695_103_in_87695_92;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:242"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:242");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:242"
            );
            
      let anim_87695_103_in_87695_92 = actionAnims["anim_87695_103_in_87695_92"];
      if (anim_87695_103_in_87695_92) {
        anim_87695_103_in_87695_92.pause();
        anim_87695_103_in_87695_92.reverse();
        anim_87695_103_in_87695_92.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_104_in_87695_93 = anime({
        targets: "#Frame-47-1",
        scale: { value: [1.5, 1], duration: 750, delay: 0, easing: "easeOutQuint" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeOutQuint" },});
    
      anim_87695_104_in_87695_93.pause();
      anim_87695_104_in_87695_93.reverse();
      anim_87695_104_in_87695_93.seek(0);
    
      actionAnims["anim_87695_104_in_87695_93"] = anim_87695_104_in_87695_93;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Frame-47-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:247");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:247",
              featureId: "87695:104",
            });
    
            fireScrollOffTriggers.push("87695:129:247");
    
            
      let anim_87695_104_in_87695_93 = actionAnims["anim_87695_104_in_87695_93"];
    
        if (anim_87695_104_in_87695_93) {
          anim_87695_104_in_87695_93.pause();
          anim_87695_104_in_87695_93.reverse();
          anim_87695_104_in_87695_93.play();
        }
        else {
      
      let anim_87695_104_in_87695_93 = anime({
        targets: "#Frame-47-1",
        scale: { value: [1.5, 1], duration: 750, delay: 0, easing: "easeOutQuint" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeOutQuint" },});
    
      actionAnims["anim_87695_104_in_87695_93"] = anim_87695_104_in_87695_93;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:247"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:247");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:247"
            );
            
      let anim_87695_104_in_87695_93 = actionAnims["anim_87695_104_in_87695_93"];
      if (anim_87695_104_in_87695_93) {
        anim_87695_104_in_87695_93.pause();
        anim_87695_104_in_87695_93.reverse();
        anim_87695_104_in_87695_93.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_105_in_87695_94 = anime({
        targets: "#Art-Memoirs-",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_105_in_87695_94.pause();
      anim_87695_105_in_87695_94.reverse();
      anim_87695_105_in_87695_94.seek(0);
    
      actionAnims["anim_87695_105_in_87695_94"] = anim_87695_105_in_87695_94;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Art-Memoirs-").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:258");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:258",
              featureId: "87695:105",
            });
    
            fireScrollOffTriggers.push("87695:129:258");
    
            
      let anim_87695_105_in_87695_94 = actionAnims["anim_87695_105_in_87695_94"];
    
        if (anim_87695_105_in_87695_94) {
          anim_87695_105_in_87695_94.pause();
          anim_87695_105_in_87695_94.reverse();
          anim_87695_105_in_87695_94.play();
        }
        else {
      
      let anim_87695_105_in_87695_94 = anime({
        targets: "#Art-Memoirs-",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_105_in_87695_94"] = anim_87695_105_in_87695_94;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:258"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:258");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:258"
            );
            
      let anim_87695_105_in_87695_94 = actionAnims["anim_87695_105_in_87695_94"];
      if (anim_87695_105_in_87695_94) {
        anim_87695_105_in_87695_94.pause();
        anim_87695_105_in_87695_94.reverse();
        anim_87695_105_in_87695_94.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_106_in_87695_95 = anime({
        targets: "#Here-is-a-collection",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_106_in_87695_95.pause();
      anim_87695_106_in_87695_95.reverse();
      anim_87695_106_in_87695_95.seek(0);
    
      actionAnims["anim_87695_106_in_87695_95"] = anim_87695_106_in_87695_95;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Here-is-a-collection").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:259");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:259",
              featureId: "87695:106",
            });
    
            fireScrollOffTriggers.push("87695:129:259");
    
            
      let anim_87695_106_in_87695_95 = actionAnims["anim_87695_106_in_87695_95"];
    
        if (anim_87695_106_in_87695_95) {
          anim_87695_106_in_87695_95.pause();
          anim_87695_106_in_87695_95.reverse();
          anim_87695_106_in_87695_95.play();
        }
        else {
      
      let anim_87695_106_in_87695_95 = anime({
        targets: "#Here-is-a-collection",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_106_in_87695_95"] = anim_87695_106_in_87695_95;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:259"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:259");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:259"
            );
            
      let anim_87695_106_in_87695_95 = actionAnims["anim_87695_106_in_87695_95"];
      if (anim_87695_106_in_87695_95) {
        anim_87695_106_in_87695_95.pause();
        anim_87695_106_in_87695_95.reverse();
        anim_87695_106_in_87695_95.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_107_in_87695_96 = anime({
        targets: "#WhatsApp-Image-2021--2",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_107_in_87695_96.pause();
      anim_87695_107_in_87695_96.reverse();
      anim_87695_107_in_87695_96.seek(0);
    
      actionAnims["anim_87695_107_in_87695_96"] = anim_87695_107_in_87695_96;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--2").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:260");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:260",
              featureId: "87695:107",
            });
    
            fireScrollOffTriggers.push("87695:129:260");
    
            
      let anim_87695_107_in_87695_96 = actionAnims["anim_87695_107_in_87695_96"];
    
        if (anim_87695_107_in_87695_96) {
          anim_87695_107_in_87695_96.pause();
          anim_87695_107_in_87695_96.reverse();
          anim_87695_107_in_87695_96.play();
        }
        else {
      
      let anim_87695_107_in_87695_96 = anime({
        targets: "#WhatsApp-Image-2021--2",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_107_in_87695_96"] = anim_87695_107_in_87695_96;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:260"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:260");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:260"
            );
            
      let anim_87695_107_in_87695_96 = actionAnims["anim_87695_107_in_87695_96"];
      if (anim_87695_107_in_87695_96) {
        anim_87695_107_in_87695_96.pause();
        anim_87695_107_in_87695_96.reverse();
        anim_87695_107_in_87695_96.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_108_in_87695_97 = anime({
        targets: "#WhatsApp-Image-2021--4",
        translateX: { value: [-100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_108_in_87695_97.pause();
      anim_87695_108_in_87695_97.reverse();
      anim_87695_108_in_87695_97.seek(0);
    
      actionAnims["anim_87695_108_in_87695_97"] = anim_87695_108_in_87695_97;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--4").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:261");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:261",
              featureId: "87695:108",
            });
    
            fireScrollOffTriggers.push("87695:129:261");
    
            
      let anim_87695_108_in_87695_97 = actionAnims["anim_87695_108_in_87695_97"];
    
        if (anim_87695_108_in_87695_97) {
          anim_87695_108_in_87695_97.pause();
          anim_87695_108_in_87695_97.reverse();
          anim_87695_108_in_87695_97.play();
        }
        else {
      
      let anim_87695_108_in_87695_97 = anime({
        targets: "#WhatsApp-Image-2021--4",
        translateX: { value: [-100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_108_in_87695_97"] = anim_87695_108_in_87695_97;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:261"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:261");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:261"
            );
            
      let anim_87695_108_in_87695_97 = actionAnims["anim_87695_108_in_87695_97"];
      if (anim_87695_108_in_87695_97) {
        anim_87695_108_in_87695_97.pause();
        anim_87695_108_in_87695_97.reverse();
        anim_87695_108_in_87695_97.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_111_in_87695_100 = anime({
        targets: "#WhatsApp-Image-2021--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_111_in_87695_100.pause();
      anim_87695_111_in_87695_100.reverse();
      anim_87695_111_in_87695_100.seek(0);
    
      actionAnims["anim_87695_111_in_87695_100"] = anim_87695_111_in_87695_100;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:264");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:264",
              featureId: "87695:111",
            });
    
            fireScrollOffTriggers.push("87695:129:264");
    
            
      let anim_87695_111_in_87695_100 = actionAnims["anim_87695_111_in_87695_100"];
    
        if (anim_87695_111_in_87695_100) {
          anim_87695_111_in_87695_100.pause();
          anim_87695_111_in_87695_100.reverse();
          anim_87695_111_in_87695_100.play();
        }
        else {
      
      let anim_87695_111_in_87695_100 = anime({
        targets: "#WhatsApp-Image-2021--1",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_111_in_87695_100"] = anim_87695_111_in_87695_100;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:264"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:264");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:264"
            );
            
      let anim_87695_111_in_87695_100 = actionAnims["anim_87695_111_in_87695_100"];
      if (anim_87695_111_in_87695_100) {
        anim_87695_111_in_87695_100.pause();
        anim_87695_111_in_87695_100.reverse();
        anim_87695_111_in_87695_100.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_112_in_87695_101 = anime({
        targets: "#Let-s-know-each-othe",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_112_in_87695_101.pause();
      anim_87695_112_in_87695_101.reverse();
      anim_87695_112_in_87695_101.seek(0);
    
      actionAnims["anim_87695_112_in_87695_101"] = anim_87695_112_in_87695_101;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Let-s-know-each-othe").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:265");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:265",
              featureId: "87695:112",
            });
    
            fireScrollOffTriggers.push("87695:129:265");
    
            
      let anim_87695_112_in_87695_101 = actionAnims["anim_87695_112_in_87695_101"];
    
        if (anim_87695_112_in_87695_101) {
          anim_87695_112_in_87695_101.pause();
          anim_87695_112_in_87695_101.reverse();
          anim_87695_112_in_87695_101.play();
        }
        else {
      
      let anim_87695_112_in_87695_101 = anime({
        targets: "#Let-s-know-each-othe",
        translateY: { value: [-50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_112_in_87695_101"] = anim_87695_112_in_87695_101;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:265"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:265");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:265"
            );
            
      let anim_87695_112_in_87695_101 = actionAnims["anim_87695_112_in_87695_101"];
      if (anim_87695_112_in_87695_101) {
        anim_87695_112_in_87695_101.pause();
        anim_87695_112_in_87695_101.reverse();
        anim_87695_112_in_87695_101.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_113_in_87695_102 = anime({
        targets: "#Now-that-you-have-kn",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_113_in_87695_102.pause();
      anim_87695_113_in_87695_102.reverse();
      anim_87695_113_in_87695_102.seek(0);
    
      actionAnims["anim_87695_113_in_87695_102"] = anim_87695_113_in_87695_102;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Now-that-you-have-kn").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:267");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:267",
              featureId: "87695:113",
            });
    
            fireScrollOffTriggers.push("87695:129:267");
    
            
      let anim_87695_113_in_87695_102 = actionAnims["anim_87695_113_in_87695_102"];
    
        if (anim_87695_113_in_87695_102) {
          anim_87695_113_in_87695_102.pause();
          anim_87695_113_in_87695_102.reverse();
          anim_87695_113_in_87695_102.play();
        }
        else {
      
      let anim_87695_113_in_87695_102 = anime({
        targets: "#Now-that-you-have-kn",
        translateY: { value: [-50, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_113_in_87695_102"] = anim_87695_113_in_87695_102;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:267"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:267");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:267"
            );
            
      let anim_87695_113_in_87695_102 = actionAnims["anim_87695_113_in_87695_102"];
      if (anim_87695_113_in_87695_102) {
        anim_87695_113_in_87695_102.pause();
        anim_87695_113_in_87695_102.reverse();
        anim_87695_113_in_87695_102.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_114_in_87695_103 = anime({
        targets: "#Group-79",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_114_in_87695_103.pause();
      anim_87695_114_in_87695_103.reverse();
      anim_87695_114_in_87695_103.seek(0);
    
      actionAnims["anim_87695_114_in_87695_103"] = anim_87695_114_in_87695_103;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-79").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:268");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:268",
              featureId: "87695:114",
            });
    
            fireScrollOffTriggers.push("87695:129:268");
    
            
      let anim_87695_114_in_87695_103 = actionAnims["anim_87695_114_in_87695_103"];
    
        if (anim_87695_114_in_87695_103) {
          anim_87695_114_in_87695_103.pause();
          anim_87695_114_in_87695_103.reverse();
          anim_87695_114_in_87695_103.play();
        }
        else {
      
      let anim_87695_114_in_87695_103 = anime({
        targets: "#Group-79",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_114_in_87695_103"] = anim_87695_114_in_87695_103;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:268"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:268");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:268"
            );
            
      let anim_87695_114_in_87695_103 = actionAnims["anim_87695_114_in_87695_103"];
      if (anim_87695_114_in_87695_103) {
        anim_87695_114_in_87695_103.pause();
        anim_87695_114_in_87695_103.reverse();
        anim_87695_114_in_87695_103.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_115_in_87695_104 = anime({
        targets: "#Group-82",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_115_in_87695_104.pause();
      anim_87695_115_in_87695_104.reverse();
      anim_87695_115_in_87695_104.seek(0);
    
      actionAnims["anim_87695_115_in_87695_104"] = anim_87695_115_in_87695_104;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-82").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:274");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:274",
              featureId: "87695:115",
            });
    
            fireScrollOffTriggers.push("87695:129:274");
    
            
      let anim_87695_115_in_87695_104 = actionAnims["anim_87695_115_in_87695_104"];
    
        if (anim_87695_115_in_87695_104) {
          anim_87695_115_in_87695_104.pause();
          anim_87695_115_in_87695_104.reverse();
          anim_87695_115_in_87695_104.play();
        }
        else {
      
      let anim_87695_115_in_87695_104 = anime({
        targets: "#Group-82",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_115_in_87695_104"] = anim_87695_115_in_87695_104;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:274"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:274");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:274"
            );
            
      let anim_87695_115_in_87695_104 = actionAnims["anim_87695_115_in_87695_104"];
      if (anim_87695_115_in_87695_104) {
        anim_87695_115_in_87695_104.pause();
        anim_87695_115_in_87695_104.reverse();
        anim_87695_115_in_87695_104.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_116_in_87695_105 = anime({
        targets: "#Group-100",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_116_in_87695_105.pause();
      anim_87695_116_in_87695_105.reverse();
      anim_87695_116_in_87695_105.seek(0);
    
      actionAnims["anim_87695_116_in_87695_105"] = anim_87695_116_in_87695_105;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Group-100").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:155:95");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:155:95",
              featureId: "87695:116",
            });
    
            fireScrollOffTriggers.push("87695:155:95");
    
            
      let anim_87695_116_in_87695_105 = actionAnims["anim_87695_116_in_87695_105"];
    
        if (anim_87695_116_in_87695_105) {
          anim_87695_116_in_87695_105.pause();
          anim_87695_116_in_87695_105.reverse();
          anim_87695_116_in_87695_105.play();
        }
        else {
      
      let anim_87695_116_in_87695_105 = anime({
        targets: "#Group-100",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_116_in_87695_105"] = anim_87695_116_in_87695_105;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:155:95"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:155:95");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:155:95"
            );
            
      let anim_87695_116_in_87695_105 = actionAnims["anim_87695_116_in_87695_105"];
      if (anim_87695_116_in_87695_105) {
        anim_87695_116_in_87695_105.pause();
        anim_87695_116_in_87695_105.reverse();
        anim_87695_116_in_87695_105.play();
      }
    
          
          }
        }, {passive: true});
      
        document.getElementById("Frame-47").addEventListener("click",function () {
          
    let isFormValid = true;
    let value = null;
    let nameValues = [];
    let isFieldValid = true;
    
      function inCurrentArtboard87695_130_87695_106(abId) {
        let artboards = [{"id":"87695:129:2","name":"Android - 1","divId":"Android---1","minWidth":200,"maxWidth":360,"width":360,"height":10125,"breakpointMin":0,"breakpointMax":450},{"id":"87695:12:22","name":"1440px_Website","divId":"q1440px-Website","minWidth":450,"maxWidth":1440,"width":1440,"height":8138,"breakpointMin":450,"breakpointMax":-1}];
        let ab = artboards.find(a => a.id === abId);

        let minWidth = ab.breakpointMin;
        let maxWidth = ab.breakpointMax;

        let mediaStr = "";
        mediaStr += "(min-width:" + minWidth + "px)";
        if (maxWidth !== -1) {
          mediaStr += " and (max-width:" + maxWidth + "px)";
        }

        let isCurrent = false;
        if (window.matchMedia(mediaStr).matches) {
          isCurrent = true;
        }

        return isCurrent;
      }
    
      if (isFormValid) {
        let emailSubject = "Form Submitted";
        let emailMessage = "A form was submitted on your page. Submission details below: <BR/><BR/>";

        for (let nameValue of nameValues) {
          emailMessage += "<B>" + nameValue.name + ":</B> " + nameValue.value;
          emailMessage += "<BR/>";
        }
        emailMessage += "<BR/>";

        emailMessage += "Thank you,";
        emailMessage += "<BR/>";

        emailMessage += "Team Quest";
        emailMessage += "<BR/>";


        axios.post('/api/neo/sendFormDataEmail', {
          email: "aimanshaikh5401@gmail.com",
          subject: emailSubject,
          message: emailMessage
        })
    
    }
    
        });
      
        document.getElementById("EMAIL-FRAME").addEventListener("click",function () {
          
    let isFormValid = true;
    let value = null;
    let nameValues = [];
    let isFieldValid = true;
    
      function inCurrentArtboard87695_131_87695_107(abId) {
        let artboards = [{"id":"87695:129:2","name":"Android - 1","divId":"Android---1","minWidth":200,"maxWidth":360,"width":360,"height":10125,"breakpointMin":0,"breakpointMax":450},{"id":"87695:12:22","name":"1440px_Website","divId":"q1440px-Website","minWidth":450,"maxWidth":1440,"width":1440,"height":8138,"breakpointMin":450,"breakpointMax":-1}];
        let ab = artboards.find(a => a.id === abId);

        let minWidth = ab.breakpointMin;
        let maxWidth = ab.breakpointMax;

        let mediaStr = "";
        mediaStr += "(min-width:" + minWidth + "px)";
        if (maxWidth !== -1) {
          mediaStr += " and (max-width:" + maxWidth + "px)";
        }

        let isCurrent = false;
        if (window.matchMedia(mediaStr).matches) {
          isCurrent = true;
        }

        return isCurrent;
      }
    
      if (isFormValid) {
        let emailSubject = "Form Submitted";
        let emailMessage = "A form was submitted on your page. Submission details below: <BR/><BR/>";

        for (let nameValue of nameValues) {
          emailMessage += "<B>" + nameValue.name + ":</B> " + nameValue.value;
          emailMessage += "<BR/>";
        }
        emailMessage += "<BR/>";

        emailMessage += "Thank you,";
        emailMessage += "<BR/>";

        emailMessage += "Team Quest";
        emailMessage += "<BR/>";


        axios.post('/api/neo/sendFormDataEmail', {
          email: "aimanshaikh5401@gmail.com",
          subject: emailSubject,
          message: emailMessage
        })
    
    }
    
        });
      
      let anim_87695_133_in_87695_109 = anime({
        targets: "#Rectangle-39-1",
        scale: { value: [1.5, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_133_in_87695_109.pause();
      anim_87695_133_in_87695_109.reverse();
      anim_87695_133_in_87695_109.seek(0);
    
      actionAnims["anim_87695_133_in_87695_109"] = anim_87695_133_in_87695_109;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("Rectangle-39-1").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:175");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:175",
              featureId: "87695:133",
            });
    
            fireScrollOffTriggers.push("87695:129:175");
    
            
      let anim_87695_133_in_87695_109 = actionAnims["anim_87695_133_in_87695_109"];
    
        if (anim_87695_133_in_87695_109) {
          anim_87695_133_in_87695_109.pause();
          anim_87695_133_in_87695_109.reverse();
          anim_87695_133_in_87695_109.play();
        }
        else {
      
      let anim_87695_133_in_87695_109 = anime({
        targets: "#Rectangle-39-1",
        scale: { value: [1.5, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [150, 0], duration: 1250, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1250, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_133_in_87695_109"] = anim_87695_133_in_87695_109;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:175"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:175");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:175"
            );
            
      let anim_87695_133_in_87695_109 = actionAnims["anim_87695_133_in_87695_109"];
      if (anim_87695_133_in_87695_109) {
        anim_87695_133_in_87695_109.pause();
        anim_87695_133_in_87695_109.reverse();
        anim_87695_133_in_87695_109.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_135_in_87695_111 = anime({
        targets: "#WhatsApp-Image-2021-",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [-150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_135_in_87695_111.pause();
      anim_87695_135_in_87695_111.reverse();
      anim_87695_135_in_87695_111.seek(0);
    
      actionAnims["anim_87695_135_in_87695_111"] = anim_87695_135_in_87695_111;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021-").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:263");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:263",
              featureId: "87695:135",
            });
    
            fireScrollOffTriggers.push("87695:129:263");
    
            
      let anim_87695_135_in_87695_111 = actionAnims["anim_87695_135_in_87695_111"];
    
        if (anim_87695_135_in_87695_111) {
          anim_87695_135_in_87695_111.pause();
          anim_87695_135_in_87695_111.reverse();
          anim_87695_135_in_87695_111.play();
        }
        else {
      
      let anim_87695_135_in_87695_111 = anime({
        targets: "#WhatsApp-Image-2021-",
        scale: { value: [1.5, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        translateX: { value: [-150, 0], duration: 1000, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 1000, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_135_in_87695_111"] = anim_87695_135_in_87695_111;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:263"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:263");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:263"
            );
            
      let anim_87695_135_in_87695_111 = actionAnims["anim_87695_135_in_87695_111"];
      if (anim_87695_135_in_87695_111) {
        anim_87695_135_in_87695_111.pause();
        anim_87695_135_in_87695_111.reverse();
        anim_87695_135_in_87695_111.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_136_in_87695_112 = anime({
        targets: "#WhatsApp-Image-2021--3",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_136_in_87695_112.pause();
      anim_87695_136_in_87695_112.reverse();
      anim_87695_136_in_87695_112.seek(0);
    
      actionAnims["anim_87695_136_in_87695_112"] = anim_87695_136_in_87695_112;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("WhatsApp-Image-2021--3").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:262");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:262",
              featureId: "87695:136",
            });
    
            fireScrollOffTriggers.push("87695:129:262");
    
            
      let anim_87695_136_in_87695_112 = actionAnims["anim_87695_136_in_87695_112"];
    
        if (anim_87695_136_in_87695_112) {
          anim_87695_136_in_87695_112.pause();
          anim_87695_136_in_87695_112.reverse();
          anim_87695_136_in_87695_112.play();
        }
        else {
      
      let anim_87695_136_in_87695_112 = anime({
        targets: "#WhatsApp-Image-2021--3",
        translateX: { value: [100, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_136_in_87695_112"] = anim_87695_136_in_87695_112;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:262"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:262");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:262"
            );
            
      let anim_87695_136_in_87695_112 = actionAnims["anim_87695_136_in_87695_112"];
      if (anim_87695_136_in_87695_112) {
        anim_87695_136_in_87695_112.pause();
        anim_87695_136_in_87695_112.reverse();
        anim_87695_136_in_87695_112.play();
      }
    
          
          }
        }, {passive: true});
      
      let anim_87695_137_in_87695_113 = anime({
        targets: "#A-UI-and-Front-end-w",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      anim_87695_137_in_87695_113.pause();
      anim_87695_137_in_87695_113.reverse();
      anim_87695_137_in_87695_113.seek(0);
    
      actionAnims["anim_87695_137_in_87695_113"] = anim_87695_137_in_87695_113;
    
          document.addEventListener("scroll", function (e) {
        
          let divRect = document.getElementById("A-UI-and-Front-end-w").getBoundingClientRect();

          let hasFired = scrollTriggersFired.filter((t) => t.element === "87695:129:163");

          if (window.quest_page_mode !== "edit" && 
            (!hasFired || hasFired.length <= 0) &&
            divRect.top > 0 &&
            divRect.top + (0) < 754
          ) {
            scrollTriggersFired.push({
              element: "87695:129:163",
              featureId: "87695:137",
            });
    
            fireScrollOffTriggers.push("87695:129:163");
    
            
      let anim_87695_137_in_87695_113 = actionAnims["anim_87695_137_in_87695_113"];
    
        if (anim_87695_137_in_87695_113) {
          anim_87695_137_in_87695_113.pause();
          anim_87695_137_in_87695_113.reverse();
          anim_87695_137_in_87695_113.play();
        }
        else {
      
      let anim_87695_137_in_87695_113 = anime({
        targets: "#A-UI-and-Front-end-w",
        translateY: { value: [50, 0], duration: 750, delay: 0, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 0, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_137_in_87695_113"] = anim_87695_137_in_87695_113;
    
      }
    
          }

          if (
            hasFired &&
            hasFired.length > 0 &&
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {
            // out of screen and was fired
            // if its not only once, remove from fired array
            if (!true) {
              scrollTriggersFired = scrollTriggersFired.filter(
                (t) => t.element !== "87695:129:163"
              );
            }
          }

          let shouldScrollOffFire = !true && fireScrollOffTriggers.includes("87695:129:163");

          if (window.quest_page_mode !== "edit" && 
            shouldScrollOffFire && 
            (divRect.top > 754 || divRect.top + divRect.height < 0)
          ) {            
            fireScrollOffTriggers = fireScrollOffTriggers.filter(
              (t) => t !== "87695:129:163"
            );
            
      let anim_87695_137_in_87695_113 = actionAnims["anim_87695_137_in_87695_113"];
      if (anim_87695_137_in_87695_113) {
        anim_87695_137_in_87695_113.pause();
        anim_87695_137_in_87695_113.reverse();
        anim_87695_137_in_87695_113.play();
      }
    
          
          }
        }, {passive: true});
      
        
      let anim_87695_138_in_87695_114 = actionAnims["anim_87695_138_in_87695_114"];
    
        if (anim_87695_138_in_87695_114) {
          anim_87695_138_in_87695_114.restart();
        }
        else {
      
      let anim_87695_138_in_87695_114 = anime({
        targets: "#image-1",
        translateX: { value: [-100, 0], duration: 750, delay: 500, easing: "easeInOutExpo" },
        opacity: { value: [0, 1], duration: 750, delay: 500, easing: "easeInOutExpo" },});
    
      actionAnims["anim_87695_138_in_87695_114"] = anim_87695_138_in_87695_114;
    
      }
    
      
        document.getElementById("About-").addEventListener("mouseenter",function () {
          
      questVars["prevColor_" + "87695_139" + "_" + "87695_116"] = getComputedStyle(document.getElementById("About-")).color;
    
      document.getElementById("About-").style.color = "rgba(94, 92, 216, 1)";
    
        });
      
        document.getElementById("About-").addEventListener("mouseleave",function () {
          
          document.getElementById("About-").style.color = questVars["prevColor_" + "87695_139" + "_" + "87695_116"];
      
        });
      
        document.getElementById("Skillset-").addEventListener("mouseenter",function () {
          
      questVars["prevColor_" + "87695_141" + "_" + "87695_118"] = getComputedStyle(document.getElementById("Skillset-")).color;
    
      document.getElementById("Skillset-").style.color = "rgba(94, 92, 216, 1)";
    
        });
      
        document.getElementById("Skillset-").addEventListener("mouseleave",function () {
          
          document.getElementById("Skillset-").style.color = questVars["prevColor_" + "87695_141" + "_" + "87695_118"];
      
        });
      
        document.getElementById("Contact-").addEventListener("mouseenter",function () {
          
      questVars["prevColor_" + "87695_142" + "_" + "87695_119"] = getComputedStyle(document.getElementById("Contact-")).color;
    
      document.getElementById("Contact-").style.color = "rgba(94, 92, 216, 1)";
    
        });
      
        document.getElementById("Contact-").addEventListener("mouseleave",function () {
          
          document.getElementById("Contact-").style.color = questVars["prevColor_" + "87695_142" + "_" + "87695_119"];
      
        });
      
        document.getElementById("About-").addEventListener("click",function () {
          
      let div = document.getElementById("About-me-");
      let boundingRect = div.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
  
      let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
  
      let top = boundingRect.top + scrollTop - clientTop;

      window.scroll({
      top: top, 
      left: 0, 
      behavior: "smooth" 
    }); 
  
        });
      
        document.getElementById("Skillset-").addEventListener("click",function () {
          
      let div = document.getElementById("Skillset");
      let boundingRect = div.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
  
      let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
  
      let top = boundingRect.top + scrollTop - clientTop;

      window.scroll({
      top: top, 
      left: 0, 
      behavior: "smooth" 
    }); 
  
        });
      
        document.getElementById("Contact-").addEventListener("click",function () {
          
      let div = document.getElementById("Let-s-know-each-othe");
      let boundingRect = div.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
  
      let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
  
      let top = boundingRect.top + scrollTop - clientTop;

      window.scroll({
      top: top, 
      left: 0, 
      behavior: "smooth" 
    }); 
  
        });
      
        document.getElementById("Projects-").addEventListener("mouseenter",function () {
          
      questVars["prevColor_" + "87695_147" + "_" + "87695_124"] = getComputedStyle(document.getElementById("Projects-")).color;
    
      document.getElementById("Projects-").style.color = "rgba(94, 92, 216, 1)";
    
        });
      
        document.getElementById("Projects-").addEventListener("mouseleave",function () {
          
          document.getElementById("Projects-").style.color = questVars["prevColor_" + "87695_147" + "_" + "87695_124"];
      
        });
      
        document.getElementById("Projects-").addEventListener("click",function () {
          
      let div = document.getElementById("Work-that-I-ve-done-");
      let boundingRect = div.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
  
      let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
  
      let top = boundingRect.top + scrollTop - clientTop;

      window.scroll({
      top: top, 
      left: 0, 
      behavior: "smooth" 
    }); 
  
        });
      
  };
  
      document.addEventListener("DOMContentLoaded", quest_87695_features);
    0
0
