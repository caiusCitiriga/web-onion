"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("jquery");
const wo_severity_enum_1 = require("../enums/wo-severity.enum");
const wo_generic_output_core_1 = require("./wo-generic-output.core");
const wo_parser_core_1 = require("./wo-parser.core");
const web_onion_1 = require("../web-onion");
class WOInput {
    /**
     *
     *
     * @static
     * @memberof WOInput
     */
    static clearInput() {
        $('input.wc-input-field').val('');
    }
    /**
     *
     *
     * @static
     * @memberof WOInput
     */
    static focusInput() {
        $('input.wc-input-field').focus();
    }
    /**
     *
     *
     * @static
     * @param {string} message
     * @param {string} dataKey
     * @param {() => void} callback
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message]
     * @memberof WOInput
     */
    static prompt(message, dataKey, callback, severity = wo_severity_enum_1.WOSeverityEnum.message) {
        WOInput.clearInput();
        wo_generic_output_core_1.WOGenericOutput.printMessage(message, severity);
        WOInput.handleCallbackExecution(callback, dataKey);
    }
    /**
     *
     *
     * @static
     * @param {string} dataKey
     * @returns {(string | null)}
     * @memberof WOInput
     */
    static getInputData(dataKey) {
        return sessionStorage.getItem(`@wc-user-data-${dataKey}`) ? sessionStorage.getItem(`@wc-user-data-${dataKey}`) : null;
    }
    /**
     *
     *
     * @private
     * @static
     * @param {() => void} callback
     * @param {string} dataKey
     * @memberof WOInput
     */
    static handleCallbackExecution(callback, dataKey) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data
        $('input.wc-input-field.wc-input-wait').on('keypress', k => {
            if (k.keyCode !== 13) {
                return;
            }
            const value = $('input.wc-input-field').val();
            WOInput.clearInput();
            sessionStorage.setItem(`@wc-user-data-${dataKey}`, value);
            $('input.wc-input-field.wc-input-wait')
                .remove(); // remove the previous input field
            $('.wc-input > .wc-input-pointer')
                .after('<input type="text" class="wc-input-field"/>'); // and replace it with a new one
            WOInput.focusInput();
            wo_parser_core_1.WOParser.startParser(web_onion_1.WebOnionSDK.dispatcherConfiguration);
            callback();
        });
    }
}
exports.WOInput = WOInput;
//# sourceMappingURL=wo-input.core.js.map