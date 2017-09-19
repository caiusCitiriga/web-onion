import { WODispatcherConfiguration } from './entities/wo-dispatcher-configuration.entity';
import { WOOutput } from './core/wo-output.core';
import { WOInput } from './core/wo-input.core';
import { WODispatcher } from './core/wo-dispatcher.core';
import { WOParser } from './core/wo-parser.core';
import { WOHelpManager } from './core/wo-help-manager.core';
export declare class WebOnionSDK {
    readonly out_lib: WOOutput;
    readonly input_lib: WOInput;
    readonly parser_lib: WOParser;
    readonly dispatcher_lib: WODispatcher;
    readonly help_manager: WOHelpManager;
    private configuration;
    constructor();
    /**
     * Returns the array containing the dispatcher configurations
     *
     * @readonly
     * @type {WODispatcherConfiguration[]}
     * @memberof WebOnionSDK
     */
    readonly dispatcherConfiguration: WODispatcherConfiguration[];
    /**
     * Returns true if the input gets cleared after each ENTER press.
     * False otherwise
     *
     * @readonly
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    readonly clearAfterSubmit: boolean;
    /**
     * Returns the flag delimiter in use
     *
     * @readonly
     * @type {string}
     * @memberof WebOnionSDK
     */
    readonly flagDelimiter: string;
    /**
     * Returns the loading screen timeout if set.
     * Null will be returned otherwise
     *
     * @readonly
     * @type {(number | null)}
     * @memberof WebOnionSDK
     */
    readonly loadTimeout: number | null;
    /**
     * Returns true if the input focuses automatically when
     * double clicking on the console. False otherwise
     *
     * @readonly
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    readonly dblClickFocusesInput: boolean;
    /**
     * Enables or disables the input focus
     * when double clicking on the console
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    dbl_click_focuses_input: boolean;
    /**
     * Enables or disables the input field
     * auto clear on each ENTER press
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    clear_after_submit: boolean;
    /**
     * Sets the value of the flag delimiter. If a empty string is passed
     * '--' will be used
     *
     * @param {string} value the value of the flag delimiter.
     * @memberof WebOnionSDK
     */
    flag_delimiter: string;
    /**
     * Sets the amount of time to wait before
     * the legacy loading screen hides
     *
     * @param {number} value
     * @memberof WebOnionSDK
     */
    load_timeout: number;
    /**
     * Initializes the SDK with the given configurations
     *
     * @memberof WebOnionSDK
     */
    initialize(): void;
    /**
     * Adds the array of dispatcher configurations
     * to the current configurations.
     *
     * @param {WODispatcherConfiguration[]} configurations
     * @memberof WebOnionSDK
     */
    addConfigurationsToDispatcher(configurations: WODispatcherConfiguration[]): void;
    /**
     * Clears the content of the body
     *
     * @private
     * @memberof WebOnionSDK
     */
    private clearDocument();
    /**
     * Creates the HTML elements needed to render
     * the console and focuses the input
     *
     * @private
     * @memberof WebOnionSDK
     */
    private createConsole();
    private handleEchoCommand(flags);
    private handleWOCommand(flags);
}
