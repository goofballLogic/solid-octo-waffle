/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/live-example.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/react-hot-loader/dist/react-hot-loader.production.min.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-hot-loader/dist/react-hot-loader.production.min.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("function _interopDefault(e){return e&&\"object\"==typeof e&&\"default\"in e?e.default:e}Object.defineProperty(exports,\"__esModule\",{value:!0});var React=_interopDefault(__webpack_require__(/*! react */ \"react\")),classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")},inherits=function(e,t){if(\"function\"!=typeof t&&null!==t)throw new TypeError(\"Super expression must either be null or a function, not \"+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return!t||\"object\"!=typeof t&&\"function\"!=typeof t?e:t},AppContainer=function(e){function t(){return classCallCheck(this,t),possibleConstructorReturn(this,e.apply(this,arguments))}return inherits(t,e),t.prototype.render=function(){return React.Children.only(this.props.children)},t}(React.Component),hot_prod=function(){return function(e){return e}},areComponentsEqual=function(e,t){return e===t},setConfig=function(){};exports.AppContainer=AppContainer,exports.hot=hot_prod,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig;\n\n\n//# sourceURL=webpack:///./node_modules/react-hot-loader/dist/react-hot-loader.production.min.js?");

/***/ }),

/***/ "./node_modules/react-hot-loader/index.js":
/*!************************************************!*\
  !*** ./node_modules/react-hot-loader/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (true) {\n  module.exports = __webpack_require__(/*! ./dist/react-hot-loader.production.min.js */ \"./node_modules/react-hot-loader/dist/react-hot-loader.production.min.js\");\n} else {}\n\n\n//# sourceURL=webpack:///./node_modules/react-hot-loader/index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/live-example-data.js":
/*!**********************************!*\
  !*** ./src/live-example-data.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\n(function () {\n    var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n    enterModule && enterModule(module);\n})();\n\n/*\n\n    Some sample data\n\n*/\nvar team = exports.team = [{ \"name\": \"Andrew\", \"id\": \"asg\", \"color\": \"0,116,217\", \"roles\": [\"tar\"] }, { \"name\": \"Dirk\", \"id\": \"dr\", \"color\": \"61,153,112\", \"roles\": [\"own\"] }, { \"name\": \"Omer\", \"id\": \"oc\", \"color\": \"46, 204, 64\", \"roles\": [\"bar\"] }, // 1,255,112\n{ \"name\": \"Imran\", \"id\": \"im\", \"color\": \"127,219,255\", \"roles\": [\"tar\"] }];\n/*\n\n    Events are individual scorings of users against a behaviour\n\n*/\nvar events = exports.events = [{ \"id\": \"asg\", \"when\": \"2017-09-17\", \"score\": -1, description: \"Andrew did something noted here\" }, { \"id\": \"dr\", \"when\": \"2017-09-17\", \"score\": 2, description: \"Dirk did something noted here\" }, { \"id\": \"oc\", \"when\": \"2017-09-17\", \"score\": 2, description: \"Omer did something noted here\" }, { \"id\": \"asg\", \"when\": \"2017-10-10\", \"score\": -1, description: \"Andrew did something noted here\" }, { \"id\": \"dr\", \"when\": \"2017-10-10\", \"score\": 2, description: \"Dirk did something noted here\" }, { \"id\": \"im\", \"when\": \"2017-10-10\", \"score\": 4, description: \"Imran did something noted here\" }, { \"id\": \"oc\", \"when\": \"2017-10-10\", \"score\": 4, description: \"Omer did something noted here\" }, { \"id\": \"asg\", \"when\": \"2017-10-17\", \"score\": 3, description: \"Andrew did something noted here\" }, { \"id\": \"dr\", \"when\": \"2017-10-17\", \"score\": 1, description: \"Dirk did something noted here\" }, { \"id\": \"dr\", \"when\": \"2017-10-17\", \"score\": 1, description: \"Dirk did something noted here\" }, { \"id\": \"oc\", \"when\": \"2017-10-17\", \"score\": 1, description: \"Omer did something noted here\" }, { \"id\": \"asg\", \"when\": \"2017-11-17\", \"score\": -1, description: \"Andrew did something noted here\" }, { \"id\": \"im\", \"when\": \"2017-11-17\", \"score\": -1, description: \"Imran did something noted here\" }, { \"id\": \"dr\", \"when\": \"2017-11-17\", \"score\": 5, description: \"Dirk did something noted here\" }, { \"id\": \"oc\", \"when\": \"2017-11-17\", \"score\": 3, description: \"Omer did something noted here\" }, { \"id\": \"asg\", \"when\": \"2017-12-10\", \"score\": -1, description: \"Andrew did something noted here\" }, { \"id\": \"asg\", \"when\": \"2017-12-10\", \"score\": -1, description: \"Andrew did something noted here\" }, { \"id\": \"dr\", \"when\": \"2017-12-10\", \"score\": 2, description: \"Dirk did something noted here\" }, { \"id\": \"oc\", \"when\": \"2017-12-10\", \"score\": 1, description: \"Omer did something noted here\" }, { \"id\": \"im\", \"when\": \"2017-12-10\", \"score\": 1, description: \"Imran did something noted here\" }, { \"id\": \"asg\", \"when\": \"2017-12-17\", \"score\": 3, description: \"Andrew did something noted here\" }, { \"id\": \"dr\", \"when\": \"2017-12-17\", \"score\": 2, description: \"Dirk did something noted here\" }, { \"id\": \"oc\", \"when\": \"2017-12-17\", \"score\": 4, description: \"Omer did something noted here\" }];\n/*\n\n    Some roles which are a grouping of behaviours\n\n*/\nvar roles = exports.roles = [{\n\n    id: \"bar\",\n    title: \"Business architect\",\n    description: \"The business architect is repsonsible for ensuring business rules are coherent and appropriate.\",\n    behaviours: [{ id: \"leader\", weight: 5 }, { id: \"analytical\", weight: 10 }, { id: \"biz\", weight: 10 }]\n}, {\n    id: \"tar\",\n    title: \"Technical architect\",\n    description: \"The technical architect should ensure that technical decisions correctly balance agility, robustness and time-to-market.\",\n    behaviours: [{ id: \"leader\", weight: 5 }, { id: \"analytical\", weight: 10 }, { id: \"tech\", weight: 10 }]\n}, {\n    id: \"own\",\n    title: \"Business owner\",\n    description: \"The business owner should ensure that the experiment is being correctly targetting the major sources of uncertainty about the business model.\",\n    behaviours: [{ id: \"leader\", weight: 25 }]\n}];\n/*\n\n    This template can be used to customise data displayed when selecting a role\n\n*/\nvar roleTemplate = exports.roleTemplate = [\"title\", \"specifics\", \"measurement\"];\n/*\n\n    Behaviours are the measurement against which we are scoring users\n\n*/\nvar behaviours = exports.behaviours = [{\n\n    id: \"leader\",\n    title: \"Leader\",\n    description: \"Being an inspiring leader for the team\",\n    upScore: 1,\n    downScore: 1\n\n}, {\n\n    id: \"analytical\",\n    title: \"Analytical\",\n    description: \"Having an analytical mindset\",\n    upScore: 1,\n    downScore: 1\n\n}, {\n\n    id: \"biz\",\n    title: \"Business mindedness\",\n    description: \"Having a business-oriented mindset\",\n    upScore: 1,\n    downScore: 1\n\n}, {\n\n    id: \"tech\",\n    title: \"Being technology savvy\",\n    description: \"Thinking through the technological implications\",\n    upScore: 1,\n    downScore: 1\n\n}];\n/*\n    \n    This template can be used to customize the display of behaviour data in the selector\n\n*/\nvar behaviourTemplate = exports.behaviourTemplate = [\"title\", \"description\"\n/*,\n{ \n            \n    \"key\": \"up\",\n    \"prop\": \"upScore\",\n    \"className\": \"score {key} {truthiness}\"\n    \n},\n{ \n    \"key\": \"down\",\n    \"prop\": \"downScore\",\n    \"className\": \"score {key} {truthiness}\"\n    \n} \n*/\n\n];\n;\n\n(function () {\n    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n    var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n    if (!reactHotLoader) {\n        return;\n    }\n\n    reactHotLoader.register(team, \"team\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example-data.js\");\n    reactHotLoader.register(events, \"events\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example-data.js\");\n    reactHotLoader.register(roles, \"roles\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example-data.js\");\n    reactHotLoader.register(roleTemplate, \"roleTemplate\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example-data.js\");\n    reactHotLoader.register(behaviours, \"behaviours\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example-data.js\");\n    reactHotLoader.register(behaviourTemplate, \"behaviourTemplate\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example-data.js\");\n    leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/live-example-data.js?");

/***/ }),

/***/ "./src/live-example.js":
/*!*****************************!*\
  !*** ./src/live-example.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nvar _liveExampleData = __webpack_require__(/*! ./live-example-data */ \"./src/live-example-data.js\");\n\n(function () {\n    var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n    enterModule && enterModule(module);\n})();\n\n/*\n\n    Create a promise that resolves once OTS is ready\n    The promise returns the detail of the event, which contains the \"render\" function\n\n*/\nvar promiseOTS = new Promise(function (resolve) {\n    return window.addEventListener(\"OTS.ready\", function (e) {\n        return resolve(e.detail);\n    });\n});\n/*\n\n    Listen for updates from OTS\n\n*/\nvar updateListener = window.addEventListener(\"OTS.updates\", function (e) {\n    var _e$detail = e.detail,\n        updates = _e$detail.updates,\n        resolve = _e$detail.resolve;\n\n    alert(\"Got updates from OTS: \" + JSON.stringify(updates));\n    setTimeout(function () {\n        return resolve(\"Thanks for these!\");\n    }, 2000);\n});\n/*\n\n    Spin up the host Vue application\n\n*/\nvar app = new Vue({\n\n    el: \"#live-example\",\n    data: {\n\n        active: null\n\n    },\n    updated: function updated() {\n\n        console.log(\"Application is mounted\");\n        promiseOTS.then(function (x) {\n            return x.render(\"#retros\", { team: _liveExampleData.team, events: _liveExampleData.events, roles: _liveExampleData.roles, roleTemplate: _liveExampleData.roleTemplate, behaviours: _liveExampleData.behaviours, behaviourTemplate: _liveExampleData.behaviourTemplate });\n        }).then(function () {\n            return console.log(\"Retros is rendered\");\n        });\n    }\n\n});\n;\n\n(function () {\n    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n    var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n    if (!reactHotLoader) {\n        return;\n    }\n\n    reactHotLoader.register(promiseOTS, \"promiseOTS\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example.js\");\n    reactHotLoader.register(updateListener, \"updateListener\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example.js\");\n    reactHotLoader.register(app, \"app\", \"/Users/andrewgibson/src/solid-octo-waffle/src/live-example.js\");\n    leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/live-example.js?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ })

/******/ });