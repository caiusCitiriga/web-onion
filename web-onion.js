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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
class WORenderer {
    static append(to, element, appendToLastMatch = false) {
        appendToLastMatch ? $(to).last().append(element) : $(to).append(element);
    }
    static setVal(to, newVal) {
        $(to).val(newVal);
    }
    static getVal(of) {
        return $(of).val();
    }
    static getElement(whichElement, whichOneIfMultiple = 0) {
        return $(whichElement)[whichOneIfMultiple];
    }
    static setFocus(to) {
        $(to).focus();
    }
    static setCSS(to, cssRulesSet) {
        cssRulesSet.forEach(rs => {
            $(to).css(rs.rule, rs.value);
        });
    }
    static listenForKeyPressOnElement(elememt, keyCodeToCatch, callback, disposeListenerAfterCallbackExec = false) {
        const el = $(elememt).on('keypress', k => {
            //  If the keycode is different that the one to catch or if the element is in wait mode
            if (k.keyCode === keyCodeToCatch) {
                callback();
                disposeListenerAfterCallbackExec ? el.off() : null;
            }
        });
    }
    static listenForDblClickOnElement(element, callback) {
        $(element).dblclick(() => callback());
    }
    static hasClass(element, className) {
        return $(element).hasClass(className);
    }
    static addClass(to, className) {
        $(to).addClass(className);
    }
    static removeClass(element, className) {
        $(element).removeClass(className);
    }
    static remove(element) {
        $(element).remove();
    }
    static after(what, elementToSet) {
        $(what).after(elementToSet);
    }
    static scrollTop(onWhichElement, scrollAmount) {
        $(onWhichElement).scrollTop(scrollAmount);
    }
    static empty(whichElement) {
        $(whichElement).empty();
    }
}
exports.WORenderer = WORenderer;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_CONF = {
    version: '3.0.7-beta.1'
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(4);
const wo_output_core_1 = __webpack_require__(9);
const wo_input_core_1 = __webpack_require__(10);
const wo_dispatcher_core_1 = __webpack_require__(11);
const wo_parser_core_1 = __webpack_require__(12);
const wo_help_manager_core_1 = __webpack_require__(13);
const general_conf_1 = __webpack_require__(2);
const wo_severity_enum_1 = __webpack_require__(0);
const wo_renderer_core_1 = __webpack_require__(1);
class WebOnionSDK {
    constructor() {
        this.configuration = {
            dispatcher: [
                {
                    command: 'echo',
                    desc: 'Echoes a message in console',
                    flags: [
                        {
                            flag: 'm',
                            desc: 'Message'
                        }
                    ],
                    action: (flags) => this.handleEchoCommand(flags)
                },
                {
                    command: 'wo',
                    desc: 'WebOnion\'s main command. See flags for actions',
                    flags: [
                        {
                            flag: 'info',
                            desc: 'Returns the informations about WebOnion'
                        },
                        {
                            flag: 'inspire',
                            desc: 'Returns a random design quote from the "Quotes for design API"'
                        },
                        {
                            flag: 'help',
                            desc: 'Show all the available commands with aliases and flags'
                        }
                    ],
                    action: (flags) => this.handleWOCommand(flags)
                },
                {
                    command: 'clear',
                    desc: 'Clears the console',
                    aliases: ['clr', 'ccl', 'cls', 'kk'],
                    action: (flags) => this.out_lib.clearConsole()
                }
            ],
            input_field: {
                clear_after_submit: true,
                flag_delimiter: '--'
            },
            general: {
                theme: 'matrix',
                loading_screen_time: 1000
            }
        };
        this.out_lib = new wo_output_core_1.WOOutput();
        this.input_lib = new wo_input_core_1.WOInput();
        this.parser_lib = new wo_parser_core_1.WOParser();
        this.renderer_lib = new wo_renderer_core_1.WORenderer();
        this.help_manager_lib = new wo_help_manager_core_1.WOHelpManager();
        this.dispatcher_lib = new wo_dispatcher_core_1.WODispatcher();
        //  Start a listener for the double click on console
        wo_renderer_core_1.WORenderer.listenForDblClickOnElement('html', () => {
            if (wo_renderer_core_1.WORenderer.hasClass('body', 'wo-dbl-click-autofocus')) {
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
     * Returns the flag delimiter in use
     *
     * @readonly
     * @type {string}
     * @memberof WebOnionSDK
     */
    get flagDelimiter() {
        return this.configuration.input_field.flag_delimiter;
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
        return wo_renderer_core_1.WORenderer.hasClass('body', 'wo-dbl-click-autofocus');
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
            wo_renderer_core_1.WORenderer.removeClass('body', 'wo-dbl-click-autofocus');
            return;
        }
        wo_renderer_core_1.WORenderer.addClass('body', 'wo-dbl-click-autofocus');
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
     * Sets the value of the flag delimiter. If a empty string is passed
     * '--' will be used
     *
     * @param {string} value the value of the flag delimiter.
     * @memberof WebOnionSDK
     */
    set flag_delimiter(value) {
        this.configuration.input_field.flag_delimiter = value.length ? value : '--';
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
        wo_renderer_core_1.WORenderer.empty('body');
    }
    /**
     * Creates the HTML elements needed to render
     * the console and focuses the input
     *
     * @private
     * @memberof WebOnionSDK
     */
    createConsole() {
        wo_renderer_core_1.WORenderer.append('body', '<div class="wc-wrp"></div>');
        wo_renderer_core_1.WORenderer.append('.wc-wrp', '<div class="wc-console"></div>');
        wo_renderer_core_1.WORenderer.append('.wc-wrp', '<div class="wc-input"></div>');
        wo_renderer_core_1.WORenderer.append('.wc-input', '<div class="wc-input-pointer">></div>');
        wo_renderer_core_1.WORenderer.append('.wc-input', '<input type="text" class="wc-input-field"/>');
        this.input_lib.focusInput();
    }
    handleEchoCommand(flags) {
        const message = flags[0].flag.split(':')[1];
        this.out_lib.printMessage(message);
    }
    handleWOCommand(flags) {
        if (flags[0] && flags[0].flag === 'help' || !flags.length) {
            this.help_manager_lib.generateHelpFromDispatcherConfig(this);
            return;
        }
        if (flags[0].flag === 'info') {
            this.out_lib.printMessage(`Current version: ${general_conf_1.GENERAL_CONF.version}`, wo_severity_enum_1.WOSeverityEnum.info);
            return;
        }
        if (flags[0].flag === 'inspire') {
            $.get({
                url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                cache: false
            }).then((data) => {
                data = data[0];
                this.out_lib.printMessage('');
                this.out_lib.printMessage(data.content);
                this.out_lib.printMessage(`-${data.title}`, wo_severity_enum_1.WOSeverityEnum.info);
                this.out_lib.printMessage('');
            });
            return;
        }
        this.out_lib.printMessage(`Unknown flag "${flags[0]}" used`, wo_severity_enum_1.WOSeverityEnum.error);
    }
}
exports.WebOnionSDK = WebOnionSDK;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ":root {\n    font-size: 14px;\n    --lime: #32cd32;\n    --message: var(--lime);\n    --warn: #ff9900;\n    --error: #ff0000;\n    --info: #6699ff;\n    --title: #9900cc;\n    --key: #ffcc00;\n    --value: #cccccc;\n    --kv-sep: #262626;\n    --tbl-border: #262626;\n    --tbl-text: #777777;\n    --tbl-title: #cccccc;\n    --tbl-command: #ffcc00;\n    --tbl-flags: #6699ff;\n    --tbl-aliases: #6699ff;\n}\n\n* {\n    padding: 0;\n    margin: 0;\n}\n\nhtml,\nbody {\n    height: 100%;\n}\n\nh1.wc-intialization {\n    color: var(--lime);\n    font-size: 1.5rem;\n    width: 100%;\n    position: absolute;\n    height: 4rem;\n    line-height: 4rem;\n    top: 50%;\n    margin-top: -2rem;\n    text-align: center;\n    font-family: monospace;\n}\n\nh1.wc-title,\nh1.wc-title-boxed-compact,\nh1.wc-title-boxed-full-width {\n    padding: .5rem;\n    font-size: 2rem;\n    font-weight: bold;\n    color: var(--title) !important;\n}\n\nh1.wc-title-boxed-compact,\nh1.wc-title-boxed-full-width {\n    border: 1px solid var(--title);\n}\n\nh1.wc-title-boxed-full-width {\n    width: 100%;\n}\n\ndiv.wc-title-width-wrapper {\n    display: flex;\n    flex-direction: row;\n}\n\n.wc-wrp {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    color: var(--lime);\n    font-family: monospace;\n    font-size: 1.35rem;\n    background-image: url('https://imgur.com/YuMYVq1.png');\n    background-position: center;\n    background-repeat: no-repeat;\n    background-color: #000;\n}\n\n.wc-console {\n    flex-grow: 1;\n    max-height: 97%;\n    padding: .5rem;\n    overflow-y: scroll;\n}\n\n.wc-input {\n    display: flex;\n    flex-direction: row;\n    height: 2rem;\n    line-height: 2rem;\n    margin-bottom: .5rem;\n}\n\n.wc-input-pointer {\n    padding-left: 1rem;\n}\n\n.wc-input-field {\n    flex-grow: 2;\n    border: none;\n    background-color: #000;\n    color: var(--lime);\n    outline: none;\n    margin-left: .5rem;\n    font-family: monospace;\n    font-size: 1.1rem;\n}\n\n.wo-help-table {\n    border-collapse: collapse;\n    width: 100%;\n    border: 1px solid var(--tbl-border);\n}\n\n.wo-help-table td {\n    color: var(--tbl-text);    \n}\n\n.wo-help-table ul {\n    list-style: none;\n}\n\n.wo-help-table tbody tr:first-child td {\n    font-size: 1.5rem;\n    text-transform: uppercase;\n    text-align: center;\n    color: var(--tbl-title);\n    border-bottom: 1px solid var(--tbl-border);\n    border-left: 1px solid var(--tbl-border);\n}\n\n.wo-help-table td:first-child {\n    color: var(--tbl-command);\n}\n\n.wo-help-table td:nth-child(3) {\n    color: var(--tbl-aliases);\n}\n\n.wo-help-table td .flag-name {\n    color: var(--tbl-flags);\n}\n\n.wo-help-table td {\n    padding: .5rem;\n    border-bottom: 1px solid var(--tbl-border);\n    border-left: 1px solid var(--tbl-border);\n}\n\n.wc-message-message {\n    color: var(--message);\n}\n\n.wc-message-error {\n    color: var(--error);\n}\n\n.wc-message-warn {\n    color: var(--warn);\n}\n\n.wc-message-info {\n    color: var(--info);\n}\n\nspan.wc-key {\n    color: var(--key);\n}\n\nspan.wc-value {\n    color: var(--value);\n}\n\nhr.wc-kv-sep {\n    margin-top: .2rem;\n    border-color: var(--kv-sep);\n}", ""]);

// exports


/***/ }),
/* 6 */
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
/* 7 */
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

var	fixUrls = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = __webpack_require__(0);
const wo_renderer_core_1 = __webpack_require__(1);
const general_conf_1 = __webpack_require__(2);
class WOOutput {
    /**
     * Shows the legacy loading screen (dummy).
     *
     * @memberof WOOutput
     */
    showInitializationScreen() {
        wo_renderer_core_1.WORenderer.setCSS('body', [{ rule: 'background-color', value: '#000' }]);
        wo_renderer_core_1.WORenderer.append('body', `<h1 class="wc-intialization">WebCLI is loading...<br><small>v${general_conf_1.GENERAL_CONF.version}</small></h1>`);
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
        wo_renderer_core_1.WORenderer.append('.wc-console', message_wrapper);
        wo_renderer_core_1.WORenderer.append('.wc-message', message, true);
        wo_renderer_core_1.WORenderer.append('.wc-console', '<br>');
        wo_renderer_core_1.WORenderer.scrollTop('.wc-console', wo_renderer_core_1.WORenderer.getElement('.wc-console').scrollHeight); //scroll to bottom
    }
    /**
     * Clears the console
     *
     * @memberof WOOutput
     */
    clearConsole() {
        wo_renderer_core_1.WORenderer.empty('.wc-console');
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
        let longestKeyLen = set[0].key.length;
        set.forEach(s => longestKeyLen = s.key.length > longestKeyLen ? s.key.length : longestKeyLen);
        set.forEach(pair => {
            let spaces = space_char;
            for (let i = 0; i < (longestKeyLen - pair.key.length); i++) {
                spaces += space_char;
            }
            wo_renderer_core_1.WORenderer.append('.wc-console', `<span class="wc-key">${pair.key}:</span><span class="wc-value">${spaces + pair.value}</span><hr class="wc-kv-sep">`);
        });
    }
}
exports.WOOutput = WOOutput;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = __webpack_require__(0);
const wo_renderer_core_1 = __webpack_require__(1);
class WOInput {
    /**
     * Clears the input field
     *
     * @memberof WOInput
     */
    clearInput() {
        wo_renderer_core_1.WORenderer.setVal('input.wc-input-field', '');
    }
    /**
     * Focuses the cursor in the input field
     *
     * @memberof WOInput
     */
    focusInput() {
        wo_renderer_core_1.WORenderer.setFocus('input.wc-input-field');
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
        debugger;
        wo_renderer_core_1.WORenderer.addClass('input.wc-input-field', 'wc-input-wait'); // this will cause the parser to skip the data
        wo_renderer_core_1.WORenderer.listenForKeyPressOnElement('input.wc-input-field.wc-input-wait', 13, () => {
            const value = wo_renderer_core_1.WORenderer.getVal('input.wc-input-field');
            this.clearInput();
            sessionStorage.setItem(`@wo-user-data-${dataKey}`, value);
            wo_renderer_core_1.WORenderer.remove('input.wc-input-field.wc-input-wait'); // remove the previous input field
            wo_renderer_core_1.WORenderer.after('.wc-input > .wc-input-pointer', '<input type="text" class="wc-input-field"/>'); // and replace it with a new one
            this.focusInput();
            sdk.parser_lib.startParser(sdk.dispatcherConfiguration, sdk);
            callback();
        }, true);
    }
}
exports.WOInput = WOInput;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = __webpack_require__(0);
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
            sdk.out_lib.printMessage('Invalid command', wo_severity_enum_1.WOSeverityEnum.error);
            return;
        }
        action(command_set.flags); // Exec the action providing the flags
    }
}
exports.WODispatcher = WODispatcher;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = __webpack_require__(0);
const wo_renderer_core_1 = __webpack_require__(1);
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
        wo_renderer_core_1.WORenderer.listenForKeyPressOnElement('input.wc-input-field', 13, () => {
            if (this.inputIsInWaitMode()) {
                debugger;
                return;
            }
            const raw_command = wo_renderer_core_1.WORenderer.getVal('input.wc-input-field');
            this.command_set.command = raw_command.split(sdk.flagDelimiter)[0].trim(); //  This will take only what's before any flag
            const flags = raw_command.split(sdk.flagDelimiter);
            flags.shift(); // remove the command from the flags array;
            this.command_set.flags = flags.map(f => ({ flag: f.toLowerCase() }));
            const checkResult = this.checkSuccessfulParse(this.command_set);
            if (!checkResult.isOk && checkResult.message) {
                sdk.out_lib.printMessage(checkResult.message, wo_severity_enum_1.WOSeverityEnum.warning);
                return;
            }
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
    checkSuccessfulParse(cs) {
        if (cs.flags && cs.flags[0] && cs.flags[0].flag === '') {
            //  This may be caused when the flag delimiter is '-' and the user uses '--'.
            return { isOk: false, message: 'The flag/s provided cannot be used. This may happen when the flag delimiter is "-" but you\'ve used "--"' };
        }
        return { isOk: true };
    }
    inputIsInWaitMode() {
        return $('input.wc-input-field').hasClass('wc-input-wait');
    }
}
exports.WOParser = WOParser;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const wo_renderer_core_1 = __webpack_require__(1);
class WOHelpManager {
    generateHelpFromDispatcherConfig(sdk) {
        const config = sdk.dispatcherConfiguration;
        wo_renderer_core_1.WORenderer.append('.wc-console', '<table>');
        wo_renderer_core_1.WORenderer.addClass('.wc-console > table', 'wo-help-table');
        wo_renderer_core_1.WORenderer.append('.wo-help-table', '<tbody>');
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody', '<tr>');
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Command</strong>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Description</strong>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Aliases</strong>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
        wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<strong>Flags</strong>', true);
        config.forEach(conf => {
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody', '<tr>');
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', conf.command, true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', conf.desc, true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<ul>', true);
            if (conf.aliases) {
                conf.aliases.forEach(als => {
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul', '<li>', true);
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', als, true);
                });
            }
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr', '<td>', true);
            wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td', '<ul>', true);
            if (conf.flags) {
                conf.flags.forEach(flag => {
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul', '<li>', true);
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', `<strong class="flag-name">${sdk.flagDelimiter + flag.flag}: \t</strong>`, true);
                    wo_renderer_core_1.WORenderer.append('.wo-help-table > tbody > tr > td > ul > li', `<i>${flag.desc}</i>`, true);
                });
            }
        });
    }
}
exports.WOHelpManager = WOHelpManager;


/***/ })
/******/ ]);