import { WOSeverityEnum } from '../enums/wo-severity.enum';
export declare class WOOutput {
    /**
     * Shows the legacy loading screen (dummy).
     *
     * @memberof WOOutput
     */
    showInitializationScreen(): void;
    /**
     * Prints a message to the console
     *
     * @param {string} message
     * @param {WOSeverityEnum} [severity=WOSeverityEnum.message]
     * @memberof WOOutput
     */
    printMessage(message: string, severity?: WOSeverityEnum): void;
    /**
     * Clears the console
     *
     * @memberof WOOutput
     */
    clearConsole(): void;
    /**
     * Prints a message styled as title according
     * to the current style in use
     *
     * @param {string} text
     * @memberof WOOutput
     */
    printTitle(text: string): void;
    /**
     * Prints a message styled as title, surrounded
     * with borders according to the current style in use
     *
     * @param {string} text
     * @param {boolean} [full_width=true]
     * @memberof WOOutput
     */
    printBoxedTitle(text: string, full_width?: boolean): void;
    /**
     *
     *
     * @param {string} text
     * @memberof WOOutput
     */
    printSubtitle(text: string): void;
    /**
     * Prints a list of key value pairs.
     *
     * @param {{ key: string, value: string }[]} set
     * @param {string} [space_char='&nbsp;']
     * @memberof WOOutput
     */
    printKeyValuePairs(set: {
        key: string;
        value: string;
    }[], space_char?: string): void;
}
