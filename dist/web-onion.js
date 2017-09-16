"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./matrix.css");
const wo_generic_output_core_1 = require("./core/wo-generic-output.core");
const wo_input_core_1 = require("./core/wo-input.core");
const wo_parser_core_1 = require("./core/wo-parser.core");
class WebOnionSDK {
    constructor() {
        //  Start a listener for the double click on console
        $('body').dblclick((c) => {
            if (c.currentTarget.classList.contains('wo-dbl-click-autofocus')) {
                wo_input_core_1.WOInput.focusInput();
            }
        });
    }
    /**
     *
     *
     * @readonly
     * @static
     * @memberof WebOnionSDK
     */
    static get dispatcherConfiguration() {
        return WebOnionSDK.configuration.dispatcher;
    }
    /**
     *
     *
     * @readonly
     * @static
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    static get clearAfterSubmit() {
        return WebOnionSDK.configuration.input_field.clear_after_submit;
    }
    /**
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    set dbl_click_focus_to_input(value) {
        if (!value) {
            $('body').removeClass('wo-dbl-click-autofocus');
            return;
        }
        $('body').addClass('wo-dbl-click-autofocus');
    }
    /**
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    set clear_after_submit(value) {
        WebOnionSDK.configuration.input_field.clear_after_submit = value;
    }
    /**
     *
     *
     * @memberof WebOnionSDK
     */
    initialize() {
        wo_generic_output_core_1.WOGenericOutput.showInitializationScreen();
        setTimeout(() => {
            this.clearDocument();
            this.createConsole();
            wo_parser_core_1.WOParser.startParser(WebOnionSDK.configuration.dispatcher);
        }, WebOnionSDK.configuration.general.loading_screen_time);
    }
    /**
     *
     *
     * @param {WODispatcherConfiguration[]} sets
     * @memberof WebOnionSDK
     */
    addSetsToDispatcher(sets) {
        sets.forEach(s => {
            WebOnionSDK.configuration.dispatcher.push(s);
        });
    }
    /**
     *
     *
     * @private
     * @memberof WebOnionSDK
     */
    clearDocument() {
        $('body').empty();
    }
    /**
     *
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
        wo_input_core_1.WOInput.focusInput();
    }
}
WebOnionSDK.configuration = {
    dispatcher: [
        {
            command: 'echo',
            flags: ['m'],
            action: (flags) => {
                const message = flags[0].split(':')[1];
                wo_generic_output_core_1.WOGenericOutput.printMessage(message);
            }
        },
        {
            command: 'wo',
            flags: ['info', 'inspire'],
            action: (flags) => {
                if (flags[0] === 'info') {
                    wo_generic_output_core_1.WOGenericOutput.printMessage('Web Onion. A easy to use, open source and extensible SDK for building browser CLI web applications.', 3);
                    wo_generic_output_core_1.WOGenericOutput.printMessage('Current version: 1.1.0', 3);
                }
                if (flags[0] === 'inspire') {
                    $.get({
                        url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                        cache: false
                    }).then((data) => {
                        data = data[0];
                        wo_generic_output_core_1.WOGenericOutput.printMessage('');
                        wo_generic_output_core_1.WOGenericOutput.printMessage(data.content);
                        wo_generic_output_core_1.WOGenericOutput.printMessage(`-${data.title}`, 3);
                        wo_generic_output_core_1.WOGenericOutput.printMessage('');
                    });
                }
            }
        },
        {
            command: 'clear',
            aliases: ['clr', 'ccl', 'cls', 'kk'],
            action: (flags) => wo_generic_output_core_1.WOGenericOutput.clearConsole()
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
exports.WebOnionSDK = WebOnionSDK;
//# sourceMappingURL=web-onion.js.map