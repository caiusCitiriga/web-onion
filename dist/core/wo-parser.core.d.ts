import { WebOnionSDK } from '../web-onion';
import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';
export declare class WOParser {
    private history_index;
    private session_history;
    private command_set;
    /**
     * Starts the parser.
     *
     * @param {WODispatcherConfiguration[]} dispatcher_conf
     * @param {WebOnionSDK} sdk
     * @memberof WOParser
     */
    startParser(dispatcher_conf: WODispatcherConfiguration[], sdk: WebOnionSDK): void;
    private assignCommandSet(sdk);
    private parseRAWCommand(raw_command, sdk);
    /**
     * Resets the command set
     *
     * @private
     * @memberof WOParser
     */
    private resetCommandSet();
    private checkSuccessfulParse(cs);
    private inputIsInWaitMode();
}
