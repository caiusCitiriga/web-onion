import { WOSeverityEnum } from '../enums/wo-severity.enum';
export declare class WOInput {
    /**
     *
     *
     * @static
     * @memberof WOInput
     */
    static clearInput(): void;
    /**
     *
     *
     * @static
     * @memberof WOInput
     */
    static focusInput(): void;
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
    static prompt(message: string, dataKey: string, callback: () => void, severity?: WOSeverityEnum): void;
    /**
     *
     *
     * @static
     * @param {string} dataKey
     * @returns {(string | null)}
     * @memberof WOInput
     */
    static getInputData(dataKey: string): string | null;
    /**
     *
     *
     * @private
     * @static
     * @param {() => void} callback
     * @param {string} dataKey
     * @memberof WOInput
     */
    private static handleCallbackExecution(callback, dataKey);
}
