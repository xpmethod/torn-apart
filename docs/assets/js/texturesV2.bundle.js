(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["tornApart"] = factory(require("jQuery"));
	else
		root["tornApart"] = factory(root["jQuery"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_jquery__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"texturesV2": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonptornApart"] = window["webpackJsonptornApart"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./textures-v2.js","vendors~i18n~indexV1~texturesV1~texturesV2~visualizationsV1~visualizationsV2"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./textures-v2.js":
/*!************************!*\
  !*** ./textures-v2.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _update_texts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./update-texts */ \"./update-texts.js\");\n\n\n\njquery__WEBPACK_IMPORTED_MODULE_0___default.a.when(\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax( \"assets/markdown/textures_v2_en.md\" ),\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax( \"assets/markdown/textures_v2_es.md\" ),\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax( \"assets/markdown/textures_v2_fr.md\" )\n).done( (en, es, fr) => {\n  // these callbacks come in as an array of three items: string, status, and an object.\n  const textures = {};\n  [[en, \"en\"], [es, \"es\"], [fr, \"fr\"]].map((data) => {\n    textures[data[1]] = {};\n    data[0][0].split(\"#IMGTAG#\").map( (chunk, i) => {\n      textures[data[1]][`ta-v2-textures-full-text-${i + 1}`] = chunk;\n    });\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.i18n().load(textures);      \n  Object(_update_texts__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n});\n\n\n//# sourceURL=webpack://tornApart/./textures-v2.js?");

/***/ }),

/***/ "./update-texts.js":
/*!*************************!*\
  !*** ./update-texts.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! markdown-it */ \"../node_modules/markdown-it/index.js\");\n/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(markdown_it__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var markdown_it_footnote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! markdown-it-footnote */ \"../node_modules/markdown-it-footnote/index.js\");\n/* harmony import */ var markdown_it_footnote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(markdown_it_footnote__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nfunction currentLocaleToggle(locale){\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".locale-toggle-text\").removeClass(\"active\");\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(`.locale-toggle-${locale}`).addClass(\"active\");\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function() {\n  const md = markdown_it__WEBPACK_IMPORTED_MODULE_0___default()({html: true}).use(markdown_it_footnote__WEBPACK_IMPORTED_MODULE_1___default.a);\n  const externalLinkHTML = \"<span>&nbsp;<i style='vertical-align: baseline; font-size: 60%;' class='fa fa-small fa-external-link-alt'></i></span>\";\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"body\").i18n();\n  currentLocaleToggle(jquery__WEBPACK_IMPORTED_MODULE_2___default.a.i18n().locale);\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".markdownify\").html((i, html) => {\n    return md.render(html);\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".click-to-hide a\").each(function() {\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()( this ).attr(\"onclick\", \"event.stopPropagation();\");\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"a[href^='http']:not(a:has(img))\").html(function(i, html){\n    if(!html.match(\"fa-external-link-alt\")){\n      jquery__WEBPACK_IMPORTED_MODULE_2___default()( this ).append(jquery__WEBPACK_IMPORTED_MODULE_2___default.a.parseHTML(externalLinkHTML));\n    }\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"a[href^='http']\").attr(\"target\", \"_blank\");\n});\n\n\n//# sourceURL=webpack://tornApart/./update-texts.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;\n\n//# sourceURL=webpack://tornApart/external_%22jQuery%22?");

/***/ })

/******/ });
});