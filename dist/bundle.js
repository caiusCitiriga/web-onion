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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WOSeverityEnum;
(function (WOSeverityEnum) {
    WOSeverityEnum[WOSeverityEnum["message"] = 0] = "message";
    WOSeverityEnum[WOSeverityEnum["error"] = 1] = "error";
    WOSeverityEnum[WOSeverityEnum["warning"] = 2] = "warning";
    WOSeverityEnum[WOSeverityEnum["info"] = 3] = "info";
})(WOSeverityEnum = exports.WOSeverityEnum || (exports.WOSeverityEnum = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const web_onion_1 = __webpack_require__(2);
$(document).ready(() => {
    const WO = new web_onion_1.WebOnionSDK();
    WO.addConfigurationsToDispatcher([
        {
            command: 'test',
            aliases: ['t', 'tt'],
            flags: ['f1', 'f2'],
            action: (fl) => {
                WO.out_lib.printMessage('Working');
            }
        },
    ]);
    WO.initialize();
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(3);
const wo_output_core_1 = __webpack_require__(8);
const wo_input_core_1 = __webpack_require__(9);
const wo_dispatcher_core_1 = __webpack_require__(10);
const wo_parser_core_1 = __webpack_require__(11);
class WebOnionSDK {
    constructor() {
        this.configuration = {
            dispatcher: [
                {
                    command: 'echo',
                    flags: ['m'],
                    action: (flags) => {
                        const message = flags[0].split(':')[1];
                        this.out_lib.printMessage(message);
                    }
                },
                {
                    command: 'wo',
                    flags: ['info', 'inspire'],
                    action: (flags) => {
                        if (flags[0] === 'info') {
                            this.out_lib.printMessage('Web Onion. A easy to use, open source and extensible SDK for building browser CLI web applications.', 3);
                            this.out_lib.printMessage('Current version: 1.1.0', 3);
                        }
                        if (flags[0] === 'inspire') {
                            $.get({
                                url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                                cache: false
                            }).then((data) => {
                                data = data[0];
                                this.out_lib.printMessage('');
                                this.out_lib.printMessage(data.content);
                                this.out_lib.printMessage(`-${data.title}`, 3);
                                this.out_lib.printMessage('');
                            });
                        }
                    }
                },
                {
                    command: 'clear',
                    aliases: ['clr', 'ccl', 'cls', 'kk'],
                    action: (flags) => this.out_lib.clearConsole()
                }
            ],
            input_field: {
                clear_after_submit: true
            },
            general: {
                theme: 'matrix',
                loading_screen_time: 1000
            }
        };
        this.out_lib = new wo_output_core_1.WOOutput();
        this.input_lib = new wo_input_core_1.WOInput();
        this.parser_lib = new wo_parser_core_1.WOParser();
        this.dispatcher_lib = new wo_dispatcher_core_1.WODispatcher();
        //  Start a listener for the double click on console
        $('body').dblclick((c) => {
            if (c.currentTarget.classList.contains('wo-dbl-click-autofocus')) {
                this.input_lib.focusInput();
            }
        });
    }
    /**
     * Returns the array containing the dispatcher configurations
     *
     * @readonly
     * @type {WODispatcherConfiguration[]}
     * @memberof WebOnionSDK
     */
    get dispatcherConfiguration() {
        return this.configuration.dispatcher;
    }
    /**
     * Returns true if the input gets cleared after each ENTER press.
     * False otherwise
     *
     * @readonly
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    get clearAfterSubmit() {
        return this.configuration.input_field.clear_after_submit ? true : false;
    }
    /**
     * Returns the loading screen timeout if set.
     * Null will be returned otherwise
     *
     * @readonly
     * @type {(number | null)}
     * @memberof WebOnionSDK
     */
    get loadTimeout() {
        return this.configuration.general.loading_screen_time ?
            this.configuration.general.loading_screen_time :
            null;
    }
    /**
     * Returns true if the input focuses automatically when
     * double clicking on the console. False otherwise
     *
     * @readonly
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    get dblClickFocusesInput() {
        return $('body').hasClass('wo-dbl-click-autofocus');
    }
    /**
     * Enables or disables the input focus
     * when double clicking on the console
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    set dbl_click_focuses_input(value) {
        if (!value) {
            $('body').removeClass('wo-dbl-click-autofocus');
            return;
        }
        $('body').addClass('wo-dbl-click-autofocus');
    }
    /**
     * Enables or disables the input field
     * auto clear on each ENTER press
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    set clear_after_submit(value) {
        this.configuration.input_field.clear_after_submit = value;
    }
    /**
     * Sets the amount of time to wait before
     * the legacy loading screen hides
     *
     * @param {number} value
     * @memberof WebOnionSDK
     */
    set load_timeout(value) {
        this.configuration.general.loading_screen_time = value;
    }
    /**
     * Initializes the SDK with the given configurations
     *
     * @memberof WebOnionSDK
     */
    initialize() {
        this.out_lib.showInitializationScreen();
        setTimeout(() => {
            this.clearDocument();
            this.createConsole();
            this.parser_lib.startParser(this.configuration.dispatcher, this);
        }, this.configuration.general.loading_screen_time);
    }
    /**
     * Adds the array of dispatcher configurations
     * to the current configurations.
     *
     * @param {WODispatcherConfiguration[]} configurations
     * @memberof WebOnionSDK
     */
    addConfigurationsToDispatcher(configurations) {
        configurations.forEach(s => {
            this.configuration.dispatcher.push(s);
        });
    }
    /**
     * Clears the content of the body
     *
     * @private
     * @memberof WebOnionSDK
     */
    clearDocument() {
        $('body').empty();
    }
    /**
     * Creates the HTML elements needed to render
     * the console and focuses the input
     *
     * @private
     * @memberof WebOnionSDK
     */
    createConsole() {
        $('body').append('<div class="wc-wrp"></div>');
        $('.wc-wrp').append('<div class="wc-console"></div>');
        $('.wc-wrp').append('<div class="wc-input"></div>');
        $('.wc-input').append('<div class="wc-input-pointer">></div>');
        $('.wc-input').append('<input type="text" class="wc-input-field"/>');
        this.input_lib.focusInput();
    }
}
exports.WebOnionSDK = WebOnionSDK;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./matrix.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./matrix.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ":root {\r\n    font-size: 14px;\r\n    --lime: #32cd32;\r\n    --message: var(--lime);\r\n    --warn: #ff9900;\r\n    --error: #ff0000;\r\n    --info: #6699ff;\r\n    --title: #9900cc;\r\n    --key: #ffcc00;\r\n    --value: #cccccc;\r\n    --kv-sep: #262626;\r\n}\r\n\r\n* {\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\nhtml,\r\nbody {\r\n    height: 100%;\r\n}\r\n\r\nh1.wc-intialization {\r\n    color: var(--lime);\r\n    font-size: 1.5rem;\r\n    width: 100%;\r\n    position: absolute;\r\n    height: 4rem;\r\n    line-height: 4rem;\r\n    top: 50%;\r\n    margin-top: -2rem;\r\n    text-align: center;\r\n    font-family: monospace;\r\n}\r\n\r\nh1.wc-title,\r\nh1.wc-title-boxed-compact,\r\nh1.wc-title-boxed-full-width {\r\n    padding: .5rem;\r\n    font-size: 2rem;\r\n    font-weight: bold;\r\n    color: var(--title) !important;\r\n}\r\n\r\nh1.wc-title-boxed-compact,\r\nh1.wc-title-boxed-full-width {\r\n    border: 1px solid var(--title);\r\n}\r\n\r\nh1.wc-title-boxed-full-width {\r\n    width: 100%;\r\n}\r\n\r\ndiv.wc-title-width-wrapper {\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n\r\n.wc-wrp {\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    color: var(--lime);\r\n    font-family: monospace;\r\n    font-size: 1.35rem;\r\n    background-image: url('https://imgur.com/YuMYVq1.png');\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-color: #000;\r\n}\r\n\r\n.wc-console {\r\n    flex-grow: 1;\r\n    max-height: 97%;\r\n    padding: .5rem;\r\n    overflow-y: scroll;\r\n}\r\n\r\n.wc-input {\r\n    display: flex;\r\n    flex-direction: row;\r\n    height: 2rem;\r\n    line-height: 2rem;\r\n    margin-bottom: .5rem;\r\n}\r\n\r\n.wc-input-pointer {\r\n    padding-left: 1rem;\r\n}\r\n\r\n.wc-input-field {\r\n    flex-grow: 2;\r\n    border: none;\r\n    background-color: #000;\r\n    color: var(--lime);\r\n    outline: none;\r\n    margin-left: .5rem;\r\n    font-family: monospace;\r\n    font-size: 1.1rem;\r\n}\r\n\r\n.wc-message-message {\r\n    color: var(--message);\r\n}\r\n\r\n.wc-message-error {\r\n    color: var(--error);\r\n}\r\n\r\n.wc-message-warn {\r\n    color: var(--warn);\r\n}\r\n\r\n.wc-message-info {\r\n    color: var(--info);\r\n}\r\n\r\nspan.wc-key {\r\n    color: var(--key);\r\n}\r\n\r\nspan.wc-value {\r\n    color: var(--value);\r\n}\r\n\r\nhr.wc-kv-sep {\r\n    margin-top: .2rem;\r\n    border-color: var(--kv-sep);\r\n}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = __webpack_require__(0);
class WOOutput {
    /**
     * Shows the legacy loading screen (dummy).
     *
     * @memberof WOOutput
     */
    showInitializationScreen() {
        $('body').css('background-color', '#000');
        $('body').append(`<h1 class="wc-intialization">WebCLI is loading...<br><small>v1.0.0</small></h1>`);
    }
    /**
     * Prints a message to the console
     *
     * @param {string} message
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message]
     * @memberof WOOutput
     */
    printMessage(message, severity = wo_severity_enum_1.WOSeverityEnum.message) {
        let message_wrapper = '';
        switch (severity) {
            case 0:
                message_wrapper = `<span class="wc-message wc-message-message"></span>`;
                break;
            case 1:
                message_wrapper = `<span class="wc-message wc-message-error"></span>`;
                break;
            case 2:
                message_wrapper = `<span class="wc-message wc-message-warn"></span>`;
                break;
            case 3:
                message_wrapper = `<span class="wc-message wc-message-info"></span>`;
                break;
            default:
                message_wrapper = `<span class="wc-message wc-message-message"></span>`;
                break;
        }
        $('.wc-console').append(message_wrapper);
        $('.wc-message').last().append(message);
        $('.wc-console').append(`<br>`);
        $('.wc-console').scrollTop($('.wc-console')[0].scrollHeight); //scroll to bottom
    }
    /**
     * Clears the console
     *
     * @memberof WOOutput
     */
    clearConsole() {
        $('.wc-console').empty();
    }
    /**
     * Prints a message styled as title according
     * to the current style in use
     *
     * @param {string} text
     * @memberof WOOutput
     */
    printTitle(text) {
        this.printMessage(`<h1 class="wc-title">${text}</h1>`);
    }
    /**
     * Prints a message styled as title, surrounded
     * with borders according to the current style in use
     *
     * @param {string} text
     * @param {boolean} [full_width=true]
     * @memberof WOOutput
     */
    printBoxedTitle(text, full_width = true) {
        this.printMessage(`<div class="wc-title-width-wrapper"><h1 class="wc-title-boxed-${full_width ? 'full-width' : 'compact'}">${text}</h1></div>`);
    }
    /**
     *
     *
     * @param {string} text
     * @memberof WOOutput
     */
    printSubtitle(text) {
        throw Error('Not implemented');
    }
    /**
     * Prints a list of key value pairs.
     *
     * @param {{ key: string, value: string }[]} set
     * @param {string} [space_char='&nbsp;']
     * @memberof WOOutput
     */
    printKeyValuePairs(set, space_char = '&nbsp;') {
        const longestKeyLen = set.reduce((p, c) => p < c.key.length ? c.key.length : false, 0);
        set.forEach(pair => {
            let spaces = space_char;
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }
            $('.wc-console').append(`<span class="wc-key">${pair.key}:</span><span class="wc-value">${spaces + pair.value}</span><hr class="wc-kv-sep">`);
        });
    }
}
exports.WOOutput = WOOutput;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = __webpack_require__(0);
class WOInput {
    /**
     * Clears the input field
     *
     * @memberof WOInput
     */
    clearInput() {
        $('input.wc-input-field').val('');
    }
    /**
     * Focuses the cursor in the input field
     *
     * @memberof WOInput
     */
    focusInput() {
        $('input.wc-input-field').focus();
    }
    /**
     * Prompts the user with a question and takes a callback
     * that will be executed when the user continues by pressing
     * ENTER and providing a value through the input-field.
     *
     * @param {string} message
     * @param {WebOnionSDK} sdk
     * @param {string} dataKey
     * @param {() => void} callback
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message]
     * @memberof WOInput
     */
    prompt(message, sdk, dataKey, callback, severity = wo_severity_enum_1.WOSeverityEnum.message) {
        this.clearInput();
        sdk.out_lib.printMessage(message, severity);
        this.handleCallbackExecution(sdk, callback, dataKey);
    }
    /**
     * Gets the input data from the storage saved earlier.
     * If the given key matches one in the storage, the value
     * will be returned. Otherwise null will be returned
     *
     * @param {string} dataKey
     * @returns {(string | null)}
     * @memberof WOInput
     */
    getInputData(dataKey) {
        return sessionStorage.getItem(`@wo-user-data-${dataKey}`) ? sessionStorage.getItem(`@wo-user-data-${dataKey}`) : null;
    }
    /**
     * Handles the execution of the callback.
     * It resets the input field, and executes the callback
     *
     * @private
     * @param {WebOnionSDK} sdk
     * @param {() => void} callback
     * @param {string} dataKey
     * @memberof WOInput
     */
    handleCallbackExecution(sdk, callback, dataKey) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data
        $('input.wc-input-field.wc-input-wait').on('keypress', k => {
            if (k.keyCode !== 13) {
                return;
            }
            const value = $('input.wc-input-field').val();
            this.clearInput();
            sessionStorage.setItem(`@wo-user-data-${dataKey}`, value);
            $('input.wc-input-field.wc-input-wait')
                .remove(); // remove the previous input field
            $('.wc-input > .wc-input-pointer')
                .after('<input type="text" class="wc-input-field"/>'); // and replace it with a new one
            this.focusInput();
            sdk.parser_lib.startParser(sdk.dispatcherConfiguration, sdk);
            callback();
        });
    }
}
exports.WOInput = WOInput;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class WODispatcher {
    /**
     * Takes the configuration containing all the available commands, the current command set,
     * and the sdk itself to read the user command, search it through all the available
     * commands in the configuration.
     * If a match is found the action binded to that command will be executed.
     * Otherwise an error on the console will be printed.
     *
     * @param {WODispatcherConfiguration[]} configuration
     * @param {WOCommandSet} command_set
     * @param {WebOnionSDK} sdk
     * @returns
     * @memberof WODispatcher
     */
    dispatch(configuration, command_set, sdk) {
        let action = null;
        configuration.forEach(cs => {
            //  Try direct command match
            if (command_set.command && cs.command.toLowerCase() === command_set.command.trim().toLowerCase()) {
                action = cs.action;
            }
            //  If the action is still null, try aliases match
            if (action === null && cs.aliases && cs.aliases.find((a) => a === command_set.command)) {
                action = cs.action;
            }
        });
        //  Last check, if action is still null, fire an invalid command error
        if (!action) {
            sdk.out_lib.printMessage('Invalid command', 1);
            return;
        }
        action(command_set.flags); // Exec the action providing the flags
    }
}
exports.WODispatcher = WODispatcher;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class WOParser {
    constructor() {
        this.command_set = {
            command: null,
            flags: null
        };
    }
    /**
     * Starts the parser.
     *
     * @param {WODispatcherConfiguration[]} dispatcher_conf
     * @param {WebOnionSDK} sdk
     * @memberof WOParser
     */
    startParser(dispatcher_conf, sdk) {
        $('input.wc-input-field').on('keypress', (k) => {
            if (k.keyCode !== 13 ||
                k.currentTarget.classList.value.indexOf('wc-input-wait') !== -1) {
                return;
            } // if not ENTER or in input wait mode
            const raw_command = $('input.wc-input-field').val();
            this.command_set.command = raw_command.split('--')[0]; //  This will take only what's before any flag
            const flags = raw_command.split('--');
            flags.shift(); // remove the command from the flags array;
            this.command_set.flags = flags.map(f => f.toLowerCase());
            sdk.dispatcher_lib.dispatch(dispatcher_conf, this.command_set, sdk);
            this.resetCommandSet();
            sdk.clearAfterSubmit ? sdk.input_lib.clearInput() : null;
        });
    }
    /**
     * Resets the command set
     *
     * @private
     * @memberof WOParser
     */
    resetCommandSet() {
        this.command_set.command = null;
        this.command_set.flags = null;
    }
}
exports.WOParser = WOParser;


/***/ })
/******/ ]);