import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WOOutput } from './wo-output.core';
import { WOParser } from './wo-parser.core';
import { WebOnionSDK } from '../web-onion';
import { WORenderer } from './wo-renderer.core';

export class WOInput {

    /**
     * Clears the input field
     * 
     * @memberof WOInput
     */
    public clearInput() {
        WORenderer.setVal('input.wc-input-field', '');
    }

    /**
     * Focuses the cursor in the input field
     * 
     * @memberof WOInput
     */
    public focusInput() {
        WORenderer.setFocus('input.wc-input-field');
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
    public prompt(
        message: string,
        sdk: WebOnionSDK,
        dataKey: string,
        callback: () => void,
        severity: WOSeverityEnum = WOSeverityEnum.message
    ) {
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
    public getInputData(dataKey: string): string | null {
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
    private handleCallbackExecution(sdk: WebOnionSDK, callback: () => void, dataKey: string) {
        WORenderer.addClass('input.wc-input-field', 'wc-input-wait'); // this will cause the parser to skip the data

        WORenderer.listenForKeyPressOnElement('input.wc-input-field.wc-input-wait', 13, () => {
            const value = WORenderer.getVal('input.wc-input-field') as string;
            this.clearInput();
            sessionStorage.setItem(`@wo-user-data-${dataKey}`, value);

            WORenderer.remove('input.wc-input-field.wc-input-wait');   // remove the previous input field

            WORenderer.after('.wc-input > .wc-input-pointer', '<input type="text" class="wc-input-field"/>');   // and replace it with a new one

            this.focusInput();
            sdk.parser_lib.startParser(sdk.dispatcherConfiguration, sdk);

            callback();
        });
    }
}