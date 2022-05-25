"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatesurvey_react"]("main",{

/***/ "./src/data/usecases/load-survey-list/remote-load-survey-list.ts":
/*!***********************************************************************!*\
  !*** ./src/data/usecases/load-survey-list/remote-load-survey-list.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RemoteLoadSurveyList\": () => (/* binding */ RemoteLoadSurveyList)\n/* harmony export */ });\n/* harmony import */ var _data_protocols_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/data/protocols/http */ \"./src/data/protocols/http/index.ts\");\n/* harmony import */ var _domain_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/domain/errors */ \"./src/domain/errors/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\nclass RemoteLoadSurveyList {\n    constructor(url, httpGetClient) {\n        this.url = url;\n        this.httpGetClient = httpGetClient;\n    }\n    loadAll() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const httpResponse = yield this.httpGetClient.get({ url: this.url });\n            const remoteSurveys = httpResponse.body || [];\n            switch (httpResponse.statusCode) {\n                case _data_protocols_http__WEBPACK_IMPORTED_MODULE_0__.HttpStatusCode.ok: return remoteSurveys.map(remoteSurvey => Object.assign(remoteSurvey, {\n                    date: new Date(remoteSurvey.date)\n                }));\n                case _data_protocols_http__WEBPACK_IMPORTED_MODULE_0__.HttpStatusCode.noContent: return [];\n                case _data_protocols_http__WEBPACK_IMPORTED_MODULE_0__.HttpStatusCode.forbidden: throw new _domain_errors__WEBPACK_IMPORTED_MODULE_1__.AccessDeniedError();\n                default: throw new _domain_errors__WEBPACK_IMPORTED_MODULE_1__.UnexpectedError();\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://survey-react/./src/data/usecases/load-survey-list/remote-load-survey-list.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d6f8748be0305c4f5aae")
/******/ })();
/******/ 
/******/ }
);