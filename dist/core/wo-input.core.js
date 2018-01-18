"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wo_severity_enum_1 = require("../enums/wo-severity.enum");
const wo_renderer_core_1 = require("./wo-renderer.core");
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
//# sourceMappingURL=wo-input.core.js.map