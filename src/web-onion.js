"use strict";
exports.__esModule = true;
require("./matrix.css");
var $ = require("jquery");
var wo_generic_output_core_1 = require("./core/wo-generic-output.core");
var wo_input_core_1 = require("./core/wo-input.core");
var wo_parser_core_1 = require("./core/wo-parser.core");
var WebOnionSDK = /** @class */ (function () {
    function WebOnionSDK() {
        //  Start a listener for the double click on console
        $('body').dblclick(function (c) {
            if (c.currentTarget.classList.contains('wo-dbl-click-autofocus')) {
                wo_input_core_1.WOInput.focusInput();
            }
        });
    }
    Object.defineProperty(WebOnionSDK, "dispatcherConfiguration", {
        /**
         *
         *
         * @readonly
         * @static
         * @memberof WebOnionSDK
         */
        get: function () {
            return WebOnionSDK.configuration.dispatcher;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebOnionSDK, "clearAfterSubmit", {
        /**
         *
         *
         * @readonly
         * @static
         * @type {boolean}
         * @memberof WebOnionSDK
         */
        get: function () {
            return WebOnionSDK.configuration.input_field.clear_after_submit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebOnionSDK.prototype, "dbl_click_focus_to_input", {
        /**
         *
         * @param {boolean} value
         * @memberof WebOnionSDK
         */
        set: function (value) {
            if (!value) {
                $('body').removeClass('wo-dbl-click-autofocus');
                return;
            }
            $('body').addClass('wo-dbl-click-autofocus');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebOnionSDK.prototype, "clear_after_submit", {
        /**
         *
         * @param {boolean} value
         * @memberof WebOnionSDK
         */
        set: function (value) {
            WebOnionSDK.configuration.input_field.clear_after_submit = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     * @memberof WebOnionSDK
     */
    WebOnionSDK.prototype.initialize = function () {
        var _this = this;
        wo_generic_output_core_1.WOGenericOutput.showInitializationScreen();
        setTimeout(function () {
            _this.clearDocument();
            _this.createConsole();
            wo_parser_core_1.WOParser.startParser(WebOnionSDK.configuration.dispatcher);
        }, WebOnionSDK.configuration.general.loading_screen_time);
    };
    /**
     *
     *
     * @param {WODispatcherConfiguration[]} sets
     * @memberof WebOnionSDK
     */
    WebOnionSDK.prototype.addSetsToDispatcher = function (sets) {
        sets.forEach(function (s) {
            WebOnionSDK.configuration.dispatcher.push(s);
        });
    };
    /**
     *
     *
     * @private
     * @memberof WebOnionSDK
     */
    WebOnionSDK.prototype.clearDocument = function () {
        $('body').empty();
    };
    /**
     *
     *
     * @private
     * @memberof WebOnionSDK
     */
    WebOnionSDK.prototype.createConsole = function () {
        $('body').append('<div class="wc-wrp"></div>');
        $('.wc-wrp').append('<div class="wc-console"></div>');
        $('.wc-wrp').append('<div class="wc-input"></div>');
        $('.wc-input').append('<div class="wc-input-pointer">></div>');
        $('.wc-input').append('<input type="text" class="wc-input-field"/>');
        wo_input_core_1.WOInput.focusInput();
    };
    WebOnionSDK.configuration = {
        dispatcher: [
            {
                command: 'echo',
                flags: ['m'],
                action: function (flags) {
                    var message = flags[0].split(':')[1];
                    wo_generic_output_core_1.WOGenericOutput.printMessage(message);
                }
            },
            {
                command: 'wo',
                flags: ['info', 'inspire'],
                action: function (flags) {
                    if (flags[0] === 'info') {
                        wo_generic_output_core_1.WOGenericOutput.printMessage('Web Onion. A easy to use, open source and extensible SDK for building browser CLI web applications.', 3);
                        wo_generic_output_core_1.WOGenericOutput.printMessage('Current version: 1.1.0', 3);
                    }
                    if (flags[0] === 'inspire') {
                        $.get({
                            url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                            cache: false
                        }).then(function (data) {
                            data = data[0];
                            wo_generic_output_core_1.WOGenericOutput.printMessage('');
                            wo_generic_output_core_1.WOGenericOutput.printMessage(data.content);
                            wo_generic_output_core_1.WOGenericOutput.printMessage("-" + data.title, 3);
                            wo_generic_output_core_1.WOGenericOutput.printMessage('');
                        });
                    }
                }
            },
            {
                command: 'clear',
                aliases: ['clr', 'ccl', 'cls', 'kk'],
                action: function (flags) { return wo_generic_output_core_1.WOGenericOutput.clearConsole(); }
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
    return WebOnionSDK;
}());
exports.WebOnionSDK = WebOnionSDK;
