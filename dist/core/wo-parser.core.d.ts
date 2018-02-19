import { WebOnionSDK } from '../web-onion';
import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
export declare class WOParser {
    private sdk;
    private history_index;
    private session_commands_history;
    private command_set;
    /**
     * Starts the parser.
     *
     * @param {WODispatcherConfiguration[]} dispatcher_conf
     * @param {WebOnionSDK} sdk
     * @memberof WOParser
     */
    startParser(dispatcher_conf: WODispatcherConfiguration[], sdk: WebOnionSDK): void;
    /**
     * Assigns the command set internally
     *
     * @private
     * @memberof WOParser
     */
    private assignCommandSet();
    /**
     * Extracts the command from the input field
     *
     * @private
     * @returns {string}
     * @memberof WOParser
     */
    private extractRAWCommand();
    /**
     * Assigns the command set internally
     *
     * @private
     * @param {string} raw_command
     * @returns {WOCommandSet}
     * @memberof WOParser
     */
    private parseRAWCommand(raw_command);
    /**
     * Pushes the current command string in the session's commands histroy
     *
     * @private
     * @memberof WOParser
     */
    private addCommandToHistory(raw_command);
    /**
     * Dispatches the command using the SDK's dispatcher
     *
     * @private
     * @param {WODispatcherConfiguration[]} dispatcher_conf
     * @memberof WOParser
     */
    private dispatchCommand(dispatcher_conf);
    /**
     * Resets the command set
     *
     * @private
     * @memberof WOParser
     */
    private resetCommandSet();
    /**
     * If the configs is set to clear the input, it will clear it
     *
     * @private
     * @memberof WOParser
     */
    private clearCommandInputIfNeeded();
    /**
     * If the input is in "wait mode", meaning that the command should be treated as a info from the user.
     * If so, it will have a wc-input-wait class on it and returns TRUE
     *
     * @private
     * @returns {boolean}
     * @memberof WOParser
     */
    private inputIsInWaitMode();
}
