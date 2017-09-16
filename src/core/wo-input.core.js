"use strict";
exports.__esModule = true;
var $ = require("jquery");
var wo_severity_enum_1 = require("../enums/wo-severity.enum");
var wo_generic_output_core_1 = require("./wo-generic-output.core");
var wo_parser_core_1 = require("./wo-parser.core");
var web_onion_1 = require("../web-onion");
var WOInput = /** @class */ (function () {
    function WOInput() {
    }
    /**
     *
     *
     * @static
     * @memberof WOInput
     */
    WOInput.clearInput = function () {
        $('input.wc-input-field').val('');
    };
    /**
     *
     *
     * @static
     * @memberof WOInput
     */
    WOInput.focusInput = function () {
        $('input.wc-input-field').focus();
    };
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
    WOInput.prompt = function (message, dataKey, callback, severity) {
        if (severity === void 0) { severity = wo_severity_enum_1.WOSeverityEnum.message; }
        WOInput.clearInput();
        wo_generic_output_core_1.WOGenericOutput.printMessage(message, severity);
        WOInput.handleCallbackExecution(callback, dataKey);
    };
    /**
     *
     *
     * @static
     * @param {string} dataKey
     * @returns {(string | null)}
     * @memberof WOInput
     */
    WOInput.getInputData = function (dataKey) {
        return sessionStorage.getItem("@wc-user-data-" + dataKey) ? sessionStorage.getItem("@wc-user-data-" + dataKey) : null;
    };
    /**
     *
     *
     * @private
     * @static
     * @param {() => void} callback
     * @param {string} dataKey
     * @memberof WOInput
     */
    WOInput.handleCallbackExecution = function (callback, dataKey) {
        $('input.wc-input-field').addClass('wc-input-wait'); // this will cause the parser to skip the data
        $('input.wc-input-field.wc-input-wait').on('keypress', function (k) {
            if (k.keyCode !== 13) {
                return;
            }
            var value = $('input.wc-input-field').val();
            WOInput.clearInput();
            sessionStorage.setItem("@wc-user-data-" + dataKey, value);
            $('input.wc-input-field.wc-input-wait')
                .remove(); // remove the previous input field
            $('.wc-input > .wc-input-pointer')
                .after('<input type="text" class="wc-input-field"/>'); // and replace it with a new one
            WOInput.focusInput();
            wo_parser_core_1.WOParser.startParser(web_onion_1.WebOnionSDK.dispatcherConfiguration);
            callback();
        });
    };
    return WOInput;
}());
exports.WOInput = WOInput;
