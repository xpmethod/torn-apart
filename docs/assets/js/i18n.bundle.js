(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("L"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "L"], factory);
	else if(typeof exports === 'object')
		exports["tornApart"] = factory(require("jQuery"), require("L"));
	else
		root["tornApart"] = factory(root["jQuery"], root["L"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_jquery__, __WEBPACK_EXTERNAL_MODULE_leaflet__) {
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
/******/ 		"i18n": 0
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
/******/ 	deferredModules.push(["./i18n.js","vendors~i18n~indexV1~texturesV1~texturesV2~visualizationsV1~visualizationsV2","vendors~i18n~indexV1~indexV2~visualizationsV1~visualizationsV2"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./i18n.js":
/*!*****************!*\
  !*** ./i18n.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _i18n_en_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n/en.json */ \"./i18n/en.json\");\nvar _i18n_en_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./i18n/en.json */ \"./i18n/en.json\", 1);\n/* harmony import */ var _i18n_es_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n/es.json */ \"./i18n/es.json\");\nvar _i18n_es_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./i18n/es.json */ \"./i18n/es.json\", 1);\n/* harmony import */ var _i18n_fr_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./i18n/fr.json */ \"./i18n/fr.json\");\nvar _i18n_fr_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./i18n/fr.json */ \"./i18n/fr.json\", 1);\n/* harmony import */ var _update_texts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./update-texts */ \"./update-texts.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ \"./utils.js\");\n\n\n\n\n\n\n\n// load in the i18n files.\njquery__WEBPACK_IMPORTED_MODULE_0___default.a.i18n().load({\n  \"@metadata\": {\n    \"authors\": [\n      \"Manan Ahmed\",\n      \"Alex Gil\",\n      \"Moacir P. de Sá Pereira\",\n      \"Paola Verhaert\"\n    ],\n    \"locale\": \"en\"\n  },\n  en: _i18n_en_json__WEBPACK_IMPORTED_MODULE_1__,\n  es: _i18n_es_json__WEBPACK_IMPORTED_MODULE_2__,\n  fr: _i18n_fr_json__WEBPACK_IMPORTED_MODULE_3__\n});\n\n// set the locale.\nconst locales = navigator.languages.filter( i => i.match(/(en|fr|es)/) ).map( i => i.replace(/-.*/, \"\"));\nif (locales.length === 0){\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.i18n().locale = \"en\";\n} else {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.i18n().locale = locales[0];\n}\nObject(_update_texts__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n\n// listen to the .locale-button for clicks.\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".locale-button\").click(function(e){\n  e.preventDefault();\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".locale-button\").removeClass(\"active\");\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()( this ).addClass(\"active\");\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.i18n().locale = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(\"locale\");\n  Object(_update_texts__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n});\n\n// listen to the .locale-toggle for clicks.\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".locale-toggle\").click(function(e){\n  e.preventDefault();\n  const langs = [\"en\", \"es\", \"fr\"];\n  let index = langs.indexOf(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.i18n().locale);\n  index === langs.length - 1 ? index = 0 : index = index + 1;\n  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.i18n().locale = langs[index];\n  Object(_update_texts__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n  Object(_utils__WEBPACK_IMPORTED_MODULE_5__[\"moveLegend\"])();\n});\n\n\n\n//# sourceURL=webpack://tornApart/./i18n.js?");

/***/ }),

/***/ "./i18n/en.json":
/*!**********************!*\
  !*** ./i18n/en.json ***!
  \**********************/
/*! exports provided: ta-v1-index-modal, ta-sitename, ta-page-not-found, ta-requested-page-could-not-be-found, ta-visualizations, ta-textures, ta-reflections, ta-allies, ta-bibliography, ta-credits, ta-the-trap, ta-clinks, ta-the-eye, ta-charts, ta-orr, ta-districts, ta-shame, ta-contracts, ta-explorer, ta-galaxy, ta-lines, ta-denaturalizations, ta-banned, ta-v1-adp, ta-v1-facilities, ta-v1-bookins, ta-v1-private-juvenile-detention-facilities, ta-v1-ice-facilities-since-2014, ta-v1-ice-facilities-not-in-use, ta-v1-clinks-legend-supp-text, ta-v1-trap-legend, ta-v1-orr-legend, ta-v1-5-yrs-of-detention, ta-v1-ice-facilities-in-use, ta-v1-time-series-text, ta-v1-fiscal-year-begins, ta-v1-number-of-facilities, ta-v1-avg-daily-pop, ta-v1-current-avg-daily-pop, ta-v1-adp-text, ta-v1-bookins-october-and-november, ta-v1-bookins-text, ta-v1-operators-num, ta-v1-operators-text, ta-v1-active-num, ta-v1-name-header, ta-v1-mandays-header, ta-v1-pctDaysInUse-header, ta-v1-2017-mandays-and-overpop, ta-v1-mandays, ta-v1-mandays-definition, ta-v1-usage, ta-v1-usage-definition, ta-v1-facility-operators, ta-v1-18-adp-by-operator, ta-v1-facility-by-operator, ta-v1-other-private, ta-v1-government, ta-v1-geo, ta-v1-cca, ta-v1-legend, ta-v1-owned-or-operated-by, ta-v1-banned-legend, ta-v1-drafting-borders, default */
/***/ (function(module) {

eval("module.exports = {\"ta-v1-index-modal\":\"A rapidly deployed critical data & visualization intervention in the USA’s 2018 “Zero Tolerance Policy” for asylum seekers at the US Ports of Entry and the humanitarian crisis that has followed.\",\"ta-sitename\":\"Torn Apart\",\"ta-page-not-found\":\"Page not found :(\",\"ta-requested-page-could-not-be-found\":\"The requested page could not be found.\",\"ta-visualizations\":\"Visualizations\",\"ta-textures\":\"Textures\",\"ta-reflections\":\"Reflections\",\"ta-allies\":\"Allies\",\"ta-bibliography\":\"Bibliography\",\"ta-credits\":\"Credits\",\"ta-the-trap\":\"The Trap\",\"ta-clinks\":\"Clinks\",\"ta-the-eye\":\"The Eye\",\"ta-charts\":\"Charts\",\"ta-orr\":\"ORR\",\"ta-districts\":\"Districts\",\"ta-shame\":\"Shame\",\"ta-contracts\":\"Contracts\",\"ta-explorer\":\"Explorer\",\"ta-galaxy\":\"Galaxy\",\"ta-lines\":\"Lines\",\"ta-denaturalizations\":\"Denaturalizations\",\"ta-banned\":\"Banned\",\"ta-v1-adp\":\"ADP\",\"ta-v1-facilities\":\"Facilities\",\"ta-v1-bookins\":\"Bookins\",\"ta-v1-private-juvenile-detention-facilities\":\"Private juvenile detention facilities\",\"ta-v1-ice-facilities-since-2014\":\"ICE facilities in use since 2014\",\"ta-v1-ice-facilities-not-in-use\":\"ICE facilities not in use\",\"ta-v1-clinks-legend-supp-text\":\"We are not showing the addresses of ICE facilities currently not in use. However, this is the full landscape of incarceration for those deemed without papers.\",\"ta-v1-trap-legend\":\"The border is a trap. Begun in 2005, [Operation Streamline](https://en.wikipedia.org/wiki/Operation_Streamline) has criminalized border crossing. Authorized ports of entry, tiny holes shown here as 15-miles wide, [turn back asylum seekers](https://www.washingtonpost.com/world/national-security/at-the-us-border-asylum-seekers-fleeing-violence-are-told-to-come-back-later/2018/06/12/79a12718-6e4d-11e8-afd5-778aca903bbe_story.html?utm_term=.1caf2e540b8c), pushing them into the [100-mile-wide border zone](https://www.aclu.org/other/constitution-100-mile-border-zone), where they are exposed to harsh conditions from both the environment and law enforcement.\",\"ta-v1-orr-legend\":\"As of November 2017, the [Office of Refugee Resettlement](https://www.acf.hhs.gov/orr) has 113 redacted sites which reportedly average daily populations greater than zero. Each site is related to a Docket Control Office, which lets us guess more or less where each site is, at least at the scale you see here. But these sites are sneaky and always slip out of view.\",\"ta-v1-5-yrs-of-detention\":\"Five Years of Detention:\",\"ta-v1-ice-facilities-in-use\":\"ICE facilities in use\",\"ta-v1-time-series-text\":\"This shows the numbers of detained persons over the last four years of data. Our effort here is in line with other efforts at quantification.\",\"ta-v1-fiscal-year-begins\":\"(fiscal year begins previous October)\",\"ta-v1-number-of-facilities\":\"Num. of facilities\",\"ta-v1-avg-daily-pop\":\"Avg. daily population\",\"ta-v1-current-avg-daily-pop\":\"Current average daily population\",\"ta-v1-adp-text\":\"ADP is the Average Daily Population and represents someone in ICE detention. However, this is as fungible a number as any other and depends on Congressional language for “beds.”\",\"ta-v1-bookins-october-and-november\":\"Bookins for Oct. and Nov. 2017\",\"ta-v1-bookins-text\":\"The initial book-ins into detention facilities rate\",\"ta-v1-operators-num\":\"Operators number.\",\"ta-v1-operators-text\":\"The facility can be operated by ICE, GEO, MVM, CCA or other contractors\",\"ta-v1-active-num\":\"active number.\",\"ta-v1-name-header\":\"Facility and Operator\",\"ta-v1-mandays-header\":\"Mandays\",\"ta-v1-pctDaysInUse-header\":\"Usage\",\"ta-v1-2017-mandays-and-overpop\":\"Mandays and (Over-)Usage in Fiscal Year 2017:\",\"ta-v1-mandays\":\"Mandays\",\"ta-v1-mandays-definition\":\"The sum of midnight count mandays for a facility for all days in the fiscal year.\",\"ta-v1-usage\":\"Usage\",\"ta-v1-usage-definition\":\"Indicates the percentage of fiscal year days in use to date.\",\"ta-v1-facility-operators\":\"Fiscal Year 2018 Facilities by Operator:\",\"ta-v1-18-adp-by-operator\":\"Portion of Total Average Daily Population per Operator\",\"ta-v1-facility-by-operator\":\"Portion of Facilities per Operator\",\"ta-v1-other-private\":\"Other Private\",\"ta-v1-government\":\"Government\",\"ta-v1-geo\":\"GEO Group\",\"ta-v1-cca\":\"CoreCivic\",\"ta-v1-legend\":\"Legend\",\"ta-v1-owned-or-operated-by\":\"Owned or operated by\",\"ta-v1-banned-legend\":\"The population of this ephemeral, blackened country of closed borders is about _N%_ of that of the excluded majority Muslim population banned from entering the US by [Presidential Proclamation 9645](https://en.wikipedia.org/wiki/Executive_Order_13780#Presidential_Proclamation_9645).\",\"ta-v1-drafting-borders\":\"Drafting borders…\"};\n\n//# sourceURL=webpack://tornApart/./i18n/en.json?");

/***/ }),

/***/ "./i18n/es.json":
/*!**********************!*\
  !*** ./i18n/es.json ***!
  \**********************/
/*! exports provided: ta-v1-index-modal, ta-sitename, ta-page-not-found, ta-requested-page-could-not-be-found, ta-visualizations, ta-textures, ta-reflections, ta-allies, ta-bibliography, ta-credits, ta-the-trap, ta-clinks, ta-detention-ctrs, ta-the-eye, ta-charts, ta-orr, ta-districts, ta-shame, ta-contracts, ta-explorer, ta-galaxy, ta-lines, ta-denaturalizations, ta-banned, ta-v1-adp, ta-v1-facilities, ta-v1-bookins, ta-v1-private-juvenile-detention-facilities, ta-v1-ice-facilities-since-2014, ta-v1-ice-facilities-not-in-use, ta-v1-clinks-legend-supp-text, ta-v1-trap-legend, ta-v1-orr-legend, ta-v1-5-yrs-of-detention, ta-v1-ice-facilities-in-use, ta-v1-time-series-text, ta-v1-fiscal-year-begins, ta-v1-number-of-facilities, ta-v1-avg-daily-pop, ta-v1-current-avg-daily-pop, ta-v1-adp-text, ta-v1-bookins-october-and-november, ta-v1-bookins-text, ta-v1-operators-num, ta-v1-active-num, ta-v1-operators-text, ta-v1-name-header, ta-v1-mandays-header, ta-v1-pctDaysInUse-header, ta-v1-2017-mandays-and-overpop, ta-v1-mandays, ta-v1-mandays-definition, ta-v1-usage, ta-v1-usage-definition, ta-v1-facility-operators, ta-v1-18-adp-by-operator, ta-v1-facility-by-operator, ta-v1-other-private, ta-v1-government, ta-v1-geo, ta-v1-cca, ta-v1-legend, ta-v1-owned-or-operated-by, ta-v1-banned-legend, ta-v1-drafting-borders, default */
/***/ (function(module) {

eval("module.exports = {\"ta-v1-index-modal\":\"Una intervención crítica de gráficas y datos, desplegada rápidamente como respuesta a la nueva “Política de cero tolerancia” de los EE. UU. en contra de los solicitantes de asilo en sus puertos y la crisis humanitaria que resulta.\",\"ta-sitename\":\"Separados\",\"ta-page-not-found\":\"Página no encontrada\",\"ta-requested-page-could-not-be-found\":\"La página solicitada no se encontró en el servidor.\",\"ta-visualizations\":\"Gráfica\",\"ta-textures\":\"Texturas\",\"ta-reflections\":\"Reflexiones\",\"ta-allies\":\"Aliadxs\",\"ta-bibliography\":\"Bibliografía\",\"ta-credits\":\"Créditos\",\"ta-the-trap\":\"La trampa\",\"ta-clinks\":\"Barrotes\",\"ta-detention-ctrs\":\"Penitenciarias\",\"ta-the-eye\":\"El ojo\",\"ta-charts\":\"Cifras\",\"ta-orr\":\"ORR\",\"ta-districts\":\"Districts\",\"ta-shame\":\"Shame\",\"ta-contracts\":\"Contracts\",\"ta-explorer\":\"Explorer\",\"ta-galaxy\":\"Galaxy\",\"ta-lines\":\"Lines\",\"ta-denaturalizations\":\"Denaturalizations\",\"ta-banned\":\"Prohibidxs\",\"ta-v1-adp\":\"ADP\",\"ta-v1-facilities\":\"Instalaciones\",\"ta-v1-bookins\":\"Registros\",\"ta-v1-private-juvenile-detention-facilities\":\"Instalaciones de detención juveníl\",\"ta-v1-ice-facilities-since-2014\":\"Instalaciones de ICE en uso desde el 2014\",\"ta-v1-ice-facilities-not-in-use\":\"Instalaciones de ICE sin uso\",\"ta-v1-clinks-legend-supp-text\":\"Representación de la infrastructura de encarcelación de inmigrantes en EE. UU.\",\"ta-v1-trap-legend\":\"La frontera es una trampa. Desde 2005, [Operation Streamline](https://en.wikipedia.org/wiki/Operation_Streamline) ha criminalizado el cruce fronterizo. Los puertos de entrada autorizados, mostrados aquí como pequeños huecos de 15 millas, [rechazan los solicitantes de asilo](https://www.washingtonpost.com/world/national-security/at-the-us-border-asylum-seekers-fleeing-violence-are-told-to-come-back-later/2018/06/12/79a12718-6e4d-11e8-afd5-778aca903bbe_story.html?utm_term=.1caf2e540b8c) y los empujan hacia [la zona fronteriza de 100 millas](https://www.aclu.org/other/constitution-100-mile-border-zone) donde condiciones duras del medio ambiente y de ICE los oprimen.\",\"ta-v1-orr-legend\":\"Desde noviembre del 2017 la [Oficina de Relocalización de Refugiados](https://www.acf.hhs.gov/orr) tiene 113 sitios redactados donde reportan población diaria mayor de cero. Cada sitio está relacionado a la Oficina de Control de Casos, lo que nos deja saber más o mendos donde están estos sitios, al menos en la escala que ven aquí. Pero estos sitios son rebalosos y desaparecen de vista.\",\"ta-v1-5-yrs-of-detention\":\"Cinco Años de Detención:\",\"ta-v1-ice-facilities-in-use\":\"Instalaciones de ICE\",\"ta-v1-time-series-text\":\"Número de personas detenidas basado en datos de los ultimo 4 años. Nuestro esfuerzo es similar a otros similares.\",\"ta-v1-fiscal-year-begins\":\"(año fiscal comienza el previo octubre)\",\"ta-v1-number-of-facilities\":\"Num. de instalaciones\",\"ta-v1-avg-daily-pop\":\"Población media diaria\",\"ta-v1-current-avg-daily-pop\":\"Población media diaria actual\",\"ta-v1-adp-text\":\"ADP es la promedio Población Diaria y representa a alguien en detención de ICE. Sinembargo, este número es relativo y depende de la definición del congreso de una “cama”.\",\"ta-v1-bookins-october-and-november\":\"Registros Oct-Nov 2017\",\"ta-v1-bookins-text\":\"Medida inicial de arrestos\",\"ta-v1-operators-num\":\"Número de operadores.\",\"ta-v1-active-num\":\"Número activo.\",\"ta-v1-operators-text\":\"La instalación puede ser operada por ICE, GEO, MVM, CCA o otros contratistas\",\"ta-v1-name-header\":\"Instalación y Operador\",\"ta-v1-mandays-header\":\"Mandays\",\"ta-v1-pctDaysInUse-header\":\"Uso\",\"ta-v1-2017-mandays-and-overpop\":\"Total días por persona 2017 y uso:\",\"ta-v1-mandays\":\"Mandays\",\"ta-v1-mandays-definition\":\"Suma de estadía nocturna por instalación año fiscal completo.\",\"ta-v1-usage\":\"Uso\",\"ta-v1-usage-definition\":\"Indica el porcentaje de días del año fiscal en uso hasta la fecha\",\"ta-v1-facility-operators\":\"Instalaciones por operador, año fiscal 2018:\",\"ta-v1-18-adp-by-operator\":\"Porción del average total de la población por día por operador\",\"ta-v1-facility-by-operator\":\"Porción de instalación por operador\",\"ta-v1-other-private\":\"Misc. privada\",\"ta-v1-government\":\"Gobierno\",\"ta-v1-geo\":\"GEO Group\",\"ta-v1-cca\":\"CoreCivic\",\"ta-v1-legend\":\"Legend\",\"ta-v1-owned-or-operated-by\":\"Owned or operated by\",\"ta-v1-banned-legend\":\"La población de ese país efímero de fronteras cerradas es de aproximadamente _N%_ de la población excluida y mayoritariamente musulmana, prohibida ingresar a los EE. UU. por [Proclamación presidencial 9645](https://en.wikipedia.org/wiki/Executive_Order_13780#Presidential_Proclamation_9645).\",\"ta-v1-drafting-borders\":\"Delineando fronteras…\"};\n\n//# sourceURL=webpack://tornApart/./i18n/es.json?");

/***/ }),

/***/ "./i18n/fr.json":
/*!**********************!*\
  !*** ./i18n/fr.json ***!
  \**********************/
/*! exports provided: ta-v1-index-modal, ta-sitename, ta-visualizations, ta-textures, ta-reflections, ta-allies, ta-bibliography, ta-credits, ta-the-trap, ta-clinks, ta-the-eye, ta-charts, ta-orr, ta-districts, ta-shame, ta-contracts, ta-explorer, ta-galaxy, ta-lines, ta-denaturalizations, ta-v1-adp, ta-v1-facilities, ta-v1-bookins, ta-v1-private-juvenile-detention-facilities, ta-v1-ice-facilities-since-2014, ta-v1-ice-facilities-not-in-use, ta-v1-clinks-legend-supp-text, ta-v1-trap-legend, ta-v1-orr-legend, ta-v1-5-yrs-of-detention, ta-v1-ice-facilities-in-use, ta-v1-time-series-text, ta-v1-fiscal-year-begins, ta-v1-number-of-facilities, ta-v1-avg-daily-pop, ta-v1-current-avg-daily-pop, ta-v1-adp-text, ta-v1-bookins-october-and-november, ta-v1-bookins-text, ta-v1-operators-num, ta-v1-operators-text, ta-v1-active-num, ta-v1-name-header, ta-v1-mandays-header, ta-v1-pctDaysInUse-header, ta-v1-2017-mandays-and-overpop, ta-v1-mandays, ta-v1-mandays-definition, ta-v1-usage, ta-v1-usage-definition, ta-v1-facility-operators, ta-v1-18-adp-by-operator, ta-v1-facility-by-operator, ta-v1-other-private, ta-v1-government, ta-v1-geo, ta-v1-cca, ta-v1-legend, ta-v1-owned-or-operated-by, ta-v1-banned-legend, ta-v1-drafting-borders, default */
/***/ (function(module) {

eval("module.exports = {\"ta-v1-index-modal\":\"Une intervention de visualisation et de données critiques rapidement déployée dans le contexte de la « politique de tolérance zéro » de 2018 des États-Unis pour les demandeurs d’asile aux points d’entrée américains et de la crise humanitaire qui a suivi.\",\"ta-sitename\":\"Séparés\",\"ta-visualizations\":\"Visualisations\",\"ta-textures\":\"Textures\",\"ta-reflections\":\"Réflexions\",\"ta-allies\":\"Les alliés\",\"ta-bibliography\":\"Bibliographie\",\"ta-credits\":\"Crédits\",\"ta-the-trap\":\"Le piège\",\"ta-clinks\":\"Les tôles\",\"ta-the-eye\":\"L’œil\",\"ta-charts\":\"Les graphiques\",\"ta-orr\":\"ORR\",\"ta-districts\":\"Districts\",\"ta-shame\":\"Shame\",\"ta-contracts\":\"Contracts\",\"ta-explorer\":\"Explorer\",\"ta-galaxy\":\"Galaxy\",\"ta-lines\":\"Lines\",\"ta-denaturalizations\":\"Denaturalizations\",\"ta-v1-adp\":\"ADP\",\"ta-v1-facilities\":\"Les installations\",\"ta-v1-bookins\":\"Taux\",\"ta-v1-private-juvenile-detention-facilities\":\"Les centres de détention privés pour les mineurs\",\"ta-v1-ice-facilities-since-2014\":\"Les installations de l’ICE facilities en service depuis 2014\",\"ta-v1-ice-facilities-not-in-use\":\"Les installations de l’ICE facilities non utilisées\",\"ta-v1-clinks-legend-supp-text\":\"Nous ne montrons pas les adresses des installations de l’ICE actuellement non utilisées. Cependant, c’est le paysage complet de l’incarcération pour ceux considérés sans papiers.\",\"ta-v1-trap-legend\":\"La frontière est un piège. Commencé en 2005, [l’Operation Streamline](https://en.wikipedia.org/wiki/Operation_Streamline) a criminalisé le passage des frontières. Les ports d’entrée autorisés, des trous miniscules montrés ici comme 15 miles de large, [réfutent les demandeurs d’asile](https://www.washingtonpost.com/world/national-security/at-the-us-border-asylum-seekers-fleeing-violence-are-told-to-come-back-later/2018/06/12/79a12718-6e4d-11e8-afd5-778aca903bbe_story.html?utm_term=.1caf2e540b8c), les poussant dans [la zone frontalière de 100 miles](https://www.aclu.org/other/constitution-100-mile-border-zone), où ils sont exposés à des conditions difficiles à la fois de l’environnement et de l’application de la loi.\",\"ta-v1-orr-legend\":\"En novembre 2017, le [Bureau de la réinstallation des réfugiés](https://www.acf.hhs.gov/orr) compte 113 sites modifiés dont les populations quotidiennes moyennes seraient supérieures à zéro. Chaque site est lié à un bureau de contrôle des dossiers, ce qui nous permet de deviner plus ou moins où se trouve chaque site, au moins à l’échelle que vous voyez ici. Mais ces sites sont sournois et glissent toujours hors de vue.\",\"ta-v1-5-yrs-of-detention\":\"Cinq ans de détention\",\"ta-v1-ice-facilities-in-use\":\"Les installations de l’ICE facilities en service\",\"ta-v1-time-series-text\":\"Cela montre le nombre de personnes détenues au cours des quatre dernières années de données. Notre effort ici est en ligne avec d’autres efforts de quantification.\",\"ta-v1-fiscal-year-begins\":\"(l’année fiscale commence l’octobre précédent)\",\"ta-v1-number-of-facilities\":\"№ des installations\",\"ta-v1-avg-daily-pop\":\"Moyenne de la population quotidienne\",\"ta-v1-current-avg-daily-pop\":\"Population quotidienne moyenne actuelle\",\"ta-v1-adp-text\":\"ADP est la population quotidienne moyenne et représente une personne en détention de l’ICE. Par contre, ce nombre est aussi fongible que n’importe quel autre et dépend du langage du Congrès pour les “lits”.\",\"ta-v1-bookins-october-and-november\":\"Taux pour Oct. et Nov. 2017\",\"ta-v1-bookins-text\":\"Le taux initial des installations de réservation et de détention\",\"ta-v1-operators-num\":\"Nombre d’opérateurs.\",\"ta-v1-operators-text\":\"L’installation peut être exploitée par ICE, GEO, MVM, CCA ou d’autres entreprises.\",\"ta-v1-active-num\":\"Nombre actif.\",\"ta-v1-name-header\":\"Installation et opérateur\",\"ta-v1-mandays-header\":\"Jours de travail\",\"ta-v1-pctDaysInUse-header\":\"Usage\",\"ta-v1-2017-mandays-and-overpop\":\"Jours de travail et (sur-)utilisation au cours de l’année fiscale de 2017 :\",\"ta-v1-mandays\":\"Jours de travail\",\"ta-v1-mandays-definition\":\"La somme de minuit compte jours de travail pour une installation pour tous les jours de l’année fiscale.\",\"ta-v1-usage\":\"Usage\",\"ta-v1-usage-definition\":\"Indique le pourcentage des jours de l’année fiscale utilisés à ce jour.\",\"ta-v1-facility-operators\":\"L’année fiscale 2018 installations par l’exploitant :\",\"ta-v1-18-adp-by-operator\":\"Portion de la population quotidienne moyenne totale par exploitant\",\"ta-v1-facility-by-operator\":\"Portion d’installations par exploitant\",\"ta-v1-other-private\":\"Autre privé\",\"ta-v1-government\":\"Gouvernement\",\"ta-v1-geo\":\"Groupe GEO\",\"ta-v1-cca\":\"CoreCivic\",\"ta-v1-legend\":\"Légende\",\"ta-v1-owned-or-operated-by\":\"Détenu ou exploité par :\",\"ta-v1-banned-legend\":\"The population of this ephemeral, blackened country of closed borders is about _N%_ of that of the excluded majority Muslim population banned from entering the US by [Presidential Proclamation 9645](https://en.wikipedia.org/wiki/Executive_Order_13780#Presidential_Proclamation_9645).\",\"ta-v1-drafting-borders\":\"Drafting borders…\"};\n\n//# sourceURL=webpack://tornApart/./i18n/fr.json?");

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

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/*! exports provided: moveLegend, defaultRadius, titleUp, mapZoomEnable, mapZoomDisable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveLegend\", function() { return moveLegend; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultRadius\", function() { return defaultRadius; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"titleUp\", function() { return titleUp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapZoomEnable\", function() { return mapZoomEnable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapZoomDisable\", function() { return mapZoomDisable; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ \"leaflet\");\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var underscore_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore.string */ \"../node_modules/underscore.string/index.js\");\n/* harmony import */ var underscore_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(underscore_string__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// import { titleize } from \"underscore\";\n// import _titleize from \"underscore/titleize\";\n// import _swapCase from \"underscore/swapCase\";\n\nfunction moveLegend() {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#legend\").css(\"top\", (jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height() - jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#legend\").height() - jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".leaflet-control-attribution\").height() - 18));\n}\n\nfunction defaultRadius() {\n  if (leaflet__WEBPACK_IMPORTED_MODULE_1___default.a.Browser.mobile) {\n    return  4;\n  } else {\n    return  jquery__WEBPACK_IMPORTED_MODULE_0___default()( window ).width() / 250;\n  }\n}\n\nfunction titleUp(string) {\n  return underscore_string__WEBPACK_IMPORTED_MODULE_2___default.a.titleize(underscore_string__WEBPACK_IMPORTED_MODULE_2___default.a.swapCase(string));\n}\n\nfunction mapZoomEnable(map) {\n  map.dragging.enable();\n  map.touchZoom.enable();\n  map.doubleClickZoom.enable();\n  map.scrollWheelZoom.enable();\n  map.boxZoom.enable();\n  map.keyboard.enable();\n  if (map.tap) map.tap.enable();\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(map).css(\"cursor\", \"grab\");  \n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".leaflet-control-zoom\").show();\n}\n\nfunction mapZoomDisable(map) {\n  map.dragging.disable();\n  map.touchZoom.disable();\n  map.doubleClickZoom.disable();\n  map.scrollWheelZoom.disable();\n  map.boxZoom.disable();\n  map.keyboard.disable();\n  if (map.tap) map.tap.disable();\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(map).css(\"cursor\", \"default\");  \n}\n\n\n\n//# sourceURL=webpack://tornApart/./utils.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;\n\n//# sourceURL=webpack://tornApart/external_%22jQuery%22?");

/***/ }),

/***/ "leaflet":
/*!********************!*\
  !*** external "L" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_leaflet__;\n\n//# sourceURL=webpack://tornApart/external_%22L%22?");

/***/ })

/******/ });
});