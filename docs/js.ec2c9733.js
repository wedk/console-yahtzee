parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"JZ8d":[function(require,module,exports) {
"use strict";function e(e){var o,r=e.Symbol;return"function"==typeof r?r.observable?o=r.observable:(o=r("observable"),r.observable=o):o="@@observable",o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"LkZ7":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3];Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var d,o=t(require("./ponyfill.js"));function t(e){return e&&e.__esModule?e:{default:e}}d="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof module?module:Function("return this")();var u=(0,o.default)(d),n=u;exports.default=n;
},{"./ponyfill.js":"JZ8d"}],"aV+f":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createStore=i,exports.combineReducers=f,exports.bindActionCreators=l,exports.applyMiddleware=b,exports.compose=y,exports.__DO_NOT_USE__ActionTypes=void 0;var e=t(require("symbol-observable"));function t(e){return e&&e.__esModule?e:{default:e}}var r=function(){return Math.random().toString(36).substring(7).split("").join(".")},n={INIT:"@@redux/INIT"+r(),REPLACE:"@@redux/REPLACE"+r(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+r()}};function o(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function i(t,r,u){var c;if("function"==typeof r&&"function"==typeof u||"function"==typeof u&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function");if("function"==typeof r&&void 0===u&&(u=r,r=void 0),void 0!==u){if("function"!=typeof u)throw new Error("Expected the enhancer to be a function.");return u(i)(t,r)}if("function"!=typeof t)throw new Error("Expected the reducer to be a function.");var a=t,s=r,f=[],d=f,l=!1;function p(){d===f&&(d=f.slice())}function h(){if(l)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return s}function y(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(l)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");var t=!0;return p(),d.push(e),function(){if(t){if(l)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");t=!1,p();var r=d.indexOf(e);d.splice(r,1)}}}function b(e){if(!o(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(l)throw new Error("Reducers may not dispatch actions.");try{l=!0,s=a(s,e)}finally{l=!1}for(var t=f=d,r=0;r<t.length;r++){(0,t[r])()}return e}return b({type:n.INIT}),(c={dispatch:b,subscribe:y,getState:h,replaceReducer:function(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");a=e,b({type:n.REPLACE})}})[e.default]=function(){var t,r=y;return(t={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function t(){e.next&&e.next(h())}return t(),{unsubscribe:r(t)}}})[e.default]=function(){return this},t},c}function u(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(t){}}function c(e,t){var r=t&&t.type;return"Given "+(r&&'action "'+String(r)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function a(e,t,r,i){var u=Object.keys(t),c=r&&r.type===n.INIT?"preloadedState argument passed to createStore":"previous state received by the reducer";if(0===u.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!o(e))return"The "+c+' has unexpected type of "'+{}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following keys: "'+u.join('", "')+'"';var a=Object.keys(e).filter(function(e){return!t.hasOwnProperty(e)&&!i[e]});return a.forEach(function(e){i[e]=!0}),r&&r.type===n.REPLACE?void 0:a.length>0?"Unexpected "+(a.length>1?"keys":"key")+' "'+a.join('", "')+'" found in '+c+'. Expected to find one of the known reducer keys instead: "'+u.join('", "')+'". Unexpected keys will be ignored.':void 0}function s(e){Object.keys(e).forEach(function(t){var r=e[t];if(void 0===r(void 0,{type:n.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:n.PROBE_UNKNOWN_ACTION()}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+n.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')})}function f(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var o=t[n];0,"function"==typeof e[o]&&(r[o]=e[o])}var i,u=Object.keys(r);try{s(r)}catch(a){i=a}return function(e,t){if(void 0===e&&(e={}),i)throw i;for(var n=!1,o={},a=0;a<u.length;a++){var s=u[a],f=r[s],d=e[s],l=f(d,t);if(void 0===l){var p=c(s,t);throw new Error(p)}o[s]=l,n=n||l!==d}return n?o:e}}function d(e,t){return function(){return t(e.apply(this,arguments))}}function l(e,t){if("function"==typeof e)return d(e,t);if("object"!=typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var r=Object.keys(e),n={},o=0;o<r.length;o++){var i=r[o],u=e[i];"function"==typeof u&&(n[i]=d(u,t))}return n}function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){p(e,t,r[t])})}return e}function y(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}function b(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){var r=e.apply(void 0,arguments),n=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},o={getState:r.getState,dispatch:function(){return n.apply(void 0,arguments)}},i=t.map(function(e){return e(o)});return h({},r,{dispatch:n=y.apply(void 0,i)(r.dispatch)})}}}function w(){}exports.__DO_NOT_USE__ActionTypes=n;
},{"symbol-observable":"LkZ7"}],"fqC+":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.start=s,exports.rollDices=p,exports.keepDice=E,exports.releaseDice=n,exports.scoreCategory=S,exports.SCORE_CATEGORY=exports.SET_KEEPER_STATUS=exports.ROLL_DICES=exports.START=void 0;var e="START";exports.START=e;var t="ROLL_DICES";exports.ROLL_DICES=t;var r="SET_KEEPER_STATUS";exports.SET_KEEPER_STATUS=r;var o="SCORE_CATEGORY";function s(){return{type:e}}function p(){return{type:t}}function E(e){return{type:r,index:e,status:!0}}function n(e){return{type:r,index:e,status:!1}}function S(e){return{type:o,index:e}}exports.SCORE_CATEGORY=o;
},{}],"kRZE":[function(require,module,exports) {
"use strict";function r(r){return n(r)||t(r)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function t(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}function n(r){if(Array.isArray(r)){for(var e=0,t=new Array(r.length);e<r.length;e++)t[e]=r[e];return t}}function o(r){var e=r.reduce(function(r,e){return r[e]++,r},Array(7).fill(0));return e.shift(),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.NB_CATEGORIES=exports.ALL_CATEGORIES=exports.BONUS_EARNING=exports.UPPER_SECTION_BONUS_GOAL=exports.NB_ROLL_PER_ROUND=exports.NB_DICES=exports.LOWER_SECTION_START_INDEX=void 0;var u=6;exports.LOWER_SECTION_START_INDEX=u;var i=5;exports.NB_DICES=i;var c=3;exports.NB_ROLL_PER_ROUND=c;var s=63;exports.UPPER_SECTION_BONUS_GOAL=s;var a=35;function f(r){if(r.length!=i)throw Error("scoring: Expected ".concat(i," dices. Received: ").concat(r.length))}function _(r){return function(e){return f(e),e.reduce(function(e,t){return e+(t==r?r:0)},0)}}function E(r){return f(r),r.reduce(function(r,e){return r+e},0)}function O(r){return function(e){return f(e),o(e).some(function(e){return e>=r})?E(e):0}}function p(r){return f(r),o(r).some(function(r){return 5===r})?50:0}function S(r){f(r);var e=o(r);return e.some(function(r){return 3===r})&&e.some(function(r){return 2===r})?25:0}function l(e,t){var n=Array(e).fill("1").join("");return function(e){return f(e),o(r(new Set(e))).join("").indexOf(n)>-1?t:0}}exports.BONUS_EARNING=a;var A=[["Aces",_(1)],["Twos",_(2)],["Threes",_(3)],["Fours",_(4)],["Fives",_(5)],["Sixes",_(6)],["Three Of A Kind",O(3)],["Four Of A Kind",O(4)],["Full House",S],["Small Straight",l(4,30)],["Large Straight",l(5,40)],["Yahtzee",p],["Chance",E]].map(function(r){return{label:r[0],score:r[1]}});exports.ALL_CATEGORIES=A;var N=A.length;exports.NB_CATEGORIES=N;
},{}],"17qv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=d,exports.getRound=p,exports.getPointScoring=_,exports.isRoundStarted=E,exports.isGameComplete=O;var e=require("./actions"),r=require("./model");function t(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},o=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(r){n(e,r,t[r])})}return e}function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(){return Math.floor(6*Math.random()+1)}function a(e,r,t){for(var n=0,o=r;o<t;o++)n+=e[o]||0;return n}function i(e){return e>=r.UPPER_SECTION_BONUS_GOAL?r.BONUS_EARNING:0}var s=Array(r.NB_DICES).fill(0),u=Array(r.NB_DICES).fill(!1),l={started:!1,warningMessage:null,roll:0,dices:s,keepers:u,categories:Array(r.NB_CATEGORIES).fill(null)};function c(e){return t({},e,{warningMessage:null,roll:0,dices:s,keepers:u})}function g(e,r,t){return e.map(function(e,n){return n==r?t:e})}function f(e,t,n){return e.map(function(e,o){return o==t?r.ALL_CATEGORIES[o].score(n):e})}function d(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case e.START:return t({},l,{started:!0});case e.ROLL_DICES:if(!n.started||O(n))return n;if(n.roll<r.NB_ROLL_PER_ROUND){for(var i=[],s=0;s<r.NB_DICES;s++)n.keepers[s]?i.push(n.dices[s]):i.push(o());return t({},n,{dices:i,roll:n.roll+1,warningMessage:null})}return t({},n,{warningMessage:"You can only roll the dice up to ".concat(r.NB_ROLL_PER_ROUND," times.\n")+"Please choose a given category to score in."});case e.SET_KEEPER_STATUS:return n.dices[a.index]?t({},n,{keepers:g(n.keepers,a.index,a.status)}):t({},n,{warningMessage:"Please start by rolling the dices."});case e.SCORE_CATEGORY:return E(n)?null==n.categories[a.index]?c(t({},n,{categories:f(n.categories,a.index,n.dices)})):t({},n,{warningMessage:"Please choose an empty category."}):t({},n,{warningMessage:"Please start by rolling the dices."});default:return n}}function p(e){return Math.min(e.categories.reduce(function(e,r){return e+(null!=r?1:0)},1),13)}function _(e){var t=a(e.categories,0,r.LOWER_SECTION_START_INDEX),n=i(t),o=t+n,s=a(e.categories,r.LOWER_SECTION_START_INDEX,e.categories.length);return{upperSubtotal:t,bonus:n,upperTotal:o,lowerTotal:s,total:o+s}}function E(e){return e.started&&e.roll>0}function O(e){return!e.categories.some(function(e){return null==e})}
},{"./actions":"fqC+","./model":"kRZE"}],"M/9L":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.configureStore=t;var e=require("redux"),r=_(require("./reducers"));function _(e){return e&&e.__esModule?e:{default:e}}function t(){return(0,e.createStore)(r.default,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())}
},{"redux":"aV+f","./reducers":"17qv"}],"+kI1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.printBoardgame=A,exports.printHelp=I,exports.printWelcome=L;var t=require("./reducers"),o=require("./model");function n(t){return c(t)||r(t)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function c(t){if(Array.isArray(t)){for(var o=0,n=new Array(t.length);o<t.length;o++)n[o]=t[o];return n}}var a="font-weight: bold",i="font-weight: unset",l="color: teal",u="color: gray",s="color: unset";function f(){for(var t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];return o.join(";")}function p(t){return function(){for(var o,e=arguments.length,r=new Array(e),c=0;c<e;c++)r[c]=arguments[c];var a=r.slice(0,-1);(o=console)[t].apply(o,n(a)),(0,r[r.length-1])(),console.groupEnd()}}var d=console.log,g=p("group"),h=p("groupCollapsed");function v(t){if(0===t)return String.fromCharCode(9633);var o=t-1;return String.fromCharCode(9856+o)}function m(t){return(""+(null==t?"":t)).padStart(3," ")}function E(t){var o=[],n=[],e=t.dices.map(function(e,r){var c=t.keepers[r]?l:s;return o.push(f("font-size: 35px",c)),n.push(r+1),"%c".concat(v(e))});d.apply(void 0,["%c"+n.join("    ")+"\n"+e.join(" "),f("font-size: 14px",u)].concat(o))}function w(t,o,n){var e=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=o.padEnd(16," "),c=m(n);d("%c".concat(r,"%c [%c").concat(c,"%c]\t\t\t%c#").concat(t),e?f(a,l):"",f(i,s),f(a,e?l:u),f(i,s),"font-style: italic; color: silver; font-size: 95%")}function y(n,e,r){for(var c=e;c<r;c++){var a=o.ALL_CATEGORIES[c];(0,t.isRoundStarted)(n)&&null==n.categories[c]?w(c+1,a.label,a.score(n.dices),!1):w(c+1,a.label,n.categories[c],null!=n.categories[c])}}function S(t,n){var e="".concat(t,"/").concat(o.UPPER_SECTION_BONUS_GOAL),r="Bonus (".concat(e,")").padEnd(16," "),c=n>0,u=m(n);d("%c".concat(r,"%c [%c").concat(u,"%c]"),c?f(a,l):"",f(i,s),f(a,c?l:s),f(i,s))}function _(t,o,n){var e=t.padEnd(18," "),r=m(o);g("".concat(e," [%c").concat(r,"%c]"),a,i,n)}function R(t){var o="Total".padEnd(18," "),n=m(t);d("%c".concat(o,"%c [%c").concat(n,"%c]"),a,i,a,i)}function O(t,n){g("Scorecard",function(){_("Upper section",n.upperTotal,function(){y(t,0,o.LOWER_SECTION_START_INDEX),S(n.upperSubtotal,n.bonus)}),_("Lower section",n.lowerTotal,function(){y(t,o.LOWER_SECTION_START_INDEX,o.NB_CATEGORIES)}),R(n.total)})}function b(t){t&&console.warn(t)}function A(n){if(n.started){console.clear();var e=(0,t.getPointScoring)(n);g("Round %d - Roll %d/%d",(0,t.getRound)(n),n.roll,o.NB_ROLL_PER_ROUND,function(){O(n,e),(0,t.isGameComplete)(n)?d("Your final score is %c%s",a,e.total):E(n)}),b(n.warningMessage)}}function T(t,o){d("%c".concat(t,"%c ").concat(o),a,i)}function C(){g("Commands",function(){T("start","to start a new game"),T("refresh","to freshly print the boardgame"),T("roll","to roll the 5 dices"),T("keep#","to keep/save the nth dice"),T("release#","to allow to reroll the nth dice"),T("score#","assign the current result to the nth category")})}function N(){h("Rules",function(){d("https://en.wikipedia.org/wiki/Yahtzee"),d("https://www.hasbro.com/common/instruct/Yahtzee.pdf")})}function I(){N(),C()}function L(){d("%cWelcome to console·yahtzee","font-size: 20px"),I()}
},{"./reducers":"17qv","./model":"kRZE"}],"NpO0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.configureCommands=c;var e=require("redux"),r=n(require("./actions")),t=require("./model"),o=require("./views");function n(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var o=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,t):{};o.get||o.set?Object.defineProperty(r,t,o):r[t]=e[t]}return r.default=e,r}function i(e,r,t){Object.defineProperty(window,e,{configurable:!0,get:function(){return r(t),e}})}function c(n){var c=(0,e.bindActionCreators)(r,n.dispatch);i("start",c.start),i("refresh",function(){(0,o.printBoardgame)(n.getState())}),i("help",o.printHelp),i("roll",c.rollDices);for(var a=0;a<t.NB_DICES;a++)i("keep".concat(a+1),c.keepDice,a),i("release".concat(a+1),c.releaseDice,a);for(var s=0;s<t.NB_CATEGORIES;s++)i("score".concat(s+1),c.scoreCategory,s)}
},{"redux":"aV+f","./actions":"fqC+","./model":"kRZE","./views":"+kI1"}],"QvaY":[function(require,module,exports) {
"use strict";var e=require("./store"),r=require("./commands"),t=require("./views"),i=(0,e.configureStore)();i.subscribe(function(){(0,t.printBoardgame)(i.getState())}),console.yahtzee=function(){return(0,r.configureCommands)(i),(0,t.printWelcome)(),"yahtzee"};
},{"./store":"M/9L","./commands":"NpO0","./views":"+kI1"}]},{},["QvaY"], null)