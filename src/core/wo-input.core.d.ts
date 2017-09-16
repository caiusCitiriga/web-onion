import { WOSeverityEnum } from '../enums/wo-severity.enum';
export declare class WOInput {
    /**
     * Clears the input field
     */
    static clearInput(): void;
    /**
     * Focuses the cursor to the input field
     */
    static focusInput(): void;
    /**
    * Prompts the user with the given question and executes the callback when
    * the ENTER key is pressed.
    *
    * The input field will go in a input-wait mode, and whatever it's passed in
    * that mode will be stored in the session as valid data.
    *
    * @param {string} message the message to show to the user on the console
    * @param {string} dataKey the name of the key that will store the data in session.
    * @param {function} callback the callback to be executed when the user presses ENTER
    * @param {number} severity the severity of the message
    */
    static prompt(message: string, dataKey: string, callback: () => void, severity?: WOSeverityEnum): void;
    /**
     * It takes the name of the key and searches for that name in the session.
     * If nothing is found null is returned
     * @param {string} dataKey the name of the key
     * @returns {string | null} the value or null if not found
     */
    static getInputData(dataKey: string): string;
    /**
     * Handles the execution of the callback.
     * @param {function} callback the callback function to be executed when the data is successfully saved
     * @param {any} dataKey the name of the key where the data will be stored
     */
    private static handleCallbackExecution(callback, dataKey);
}
