"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = require("../enums/wo-severity.enum");
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
//# sourceMappingURL=wo-input.core.js.map