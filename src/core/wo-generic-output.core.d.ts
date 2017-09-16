import { WOSeverityEnum } from '../enums/wo-severity.enum';
export declare class WOGenericOutput {
    /**
     * Shows the loading screen
     */
    static showInitializationScreen(): void;
    /**
     * Prints a message to the console.
     * The second optional parameter states the severity. (0: msg, 1: err, 2: warn, 3: info)
     *
     * @param {string} message
     * @param {number} [severity=0] 1: error, 2: warning, 3: info
     */
    static printMessage(message: string, severity?: WOSeverityEnum): void;
    /**
     * Clears the console
     */
    static clearConsole(): void;
    /**
     * Prints a title on the console
     *
     * @param {string} text the text for the title
     */
    static printTitle(text: string): void;
    /**
     * Prints a title with the borders around.
     *
     * @param {string} text the text for the title
     * @param {boolean} full_width if the box should be 100% width or not
     */
    static printBoxedTitle(text: string, full_width?: boolean): void;
    /**
     * Prints a sub-tile
     *
     * @param {string} text the text for the title
     */
    static printSubtitle(text: string): void;
    /**
     * Takes an array of key-value objects and prints a list
     * on the console, illuminating the keys.
     *
     * @param {object} set an array of key-values Array<{key: string, value: string}>
     * @param {string} space_char the string used for the space
     */
    static printKeyValuePairs(set: {
        key: string;
        value: string;
    }[], space_char?: string): void;
}
