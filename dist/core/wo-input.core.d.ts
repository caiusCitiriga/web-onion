import { WOSeverityEnum } from '../enums/wo-severity.enum';
import { WebOnionSDK } from '../web-onion';
export declare class WOInput {
    /**
     * Clears the input field
     *
     * @memberof WOInput
     */
    clearInput(): void;
    /**
     * Focuses the cursor in the input field
     *
     * @memberof WOInput
     */
    focusInput(): void;
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
    prompt(message: string, sdk: WebOnionSDK, dataKey: string, callback: () => void, severity?: WOSeverityEnum): void;
    /**
     * Gets the input data from the storage saved earlier.
     * If the given key matches one in the storage, the value
     * will be returned. Otherwise null will be returned
     *
     * @param {string} dataKey
     * @returns {(string | null)}
     * @memberof WOInput
     */
    getInputData(dataKey: string): string | null;
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
    private handleCallbackExecution(sdk, callback, dataKey);
}
